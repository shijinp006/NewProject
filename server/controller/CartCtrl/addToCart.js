import Food from "../../Schema/Food.js";
import { Cart } from "../../Schema/Cart.js";
import { FavoriteList } from "../../Schema/FavoriteList.js";

// Add item to Cart
export const addToCart = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    // Find the product
    const product = await Food.findOne({ id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if already in cart
    const existingCartItem = await Cart.findOne({ id });
    if (existingCartItem) {
      return res.status(409).json({
        message: "Item already exists in cart",
        cartItem: existingCartItem,
      });
    }

    // Add to cart
    const newCartItem = await Cart.create({
      id: product.id,
      cart: true,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      totalAmount: product.price * quantity,
    });

    // Update product cart flag
    product.cart = true;
    await product.save();

    // Update FavoriteList cart flag if exists
    const favoriteItem = await FavoriteList.findOneAndUpdate(
      { id },
      { cart: true },
      { new: true }
    );

    return res.status(201).json({
      message: "Item added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all Cart Items
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({}).lean();
    if (!cartItems.length) {
      return res
        .status(200)
        .json({ message: "No items in cart", cartItems: [] });
    }
    console.log(cartItems, "cartItems");

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Cart Quantity
export const updateCartQty = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    if (!id || isNaN(id))
      return res.status(400).json({ message: "Invalid cart item ID" });
    if (!quantity || isNaN(quantity) || quantity < 1)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    const cartItem = await Cart.findOne({ id });
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    cartItem.totalAmount = cartItem.price * quantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Cart quantity updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Cart Item
export const deleteCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const cartItem = await Cart.findOneAndDelete({ id });
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    // Reset cart flag in Food
    await Food.findOneAndUpdate({ id }, { cart: false });

    // Reset cart flag in FavoriteList if exists
    await FavoriteList.findOneAndUpdate({ id }, { cart: false });

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
