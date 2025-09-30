import { Foods } from "../../Schema/Food.js";
import { Cart } from "../../Schema/Cart.js";
import { FavoriteList } from "../../Schema/FavoriteList.js";

export const AddToCart = (req, res) => {
  try {
    const { quantity } = req.body;
    const id = Number(req.params.id); // Product Id

    // ✅ Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    // ✅ Find the product in Foods
    const product = Foods.find((item) => item.id === id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Check if product is already in Cart
    const exist = Cart.find((item) => item.id === id);
    if (exist) {
      return res.status(200).json({
        message: "Item already exists in cart",
        cart: Cart,
      });
    }

    // ✅ Update product in Foods → mark it as in cart
    product.cart = true;

    // ✅ Update same product in FavoriteList if exists
    const favoriteItem = FavoriteList.find((item) => item.id === id);
    if (favoriteItem) {
      favoriteItem.cart = true;
    }

    // ✅ Add product to Cart
    const newItem = {
      id: product.id,
      cart: true,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      totalAmount: product.price * quantity,
    };

    Cart.push(newItem);

    return res.status(201).json({
      message: "Item added to cart successfully",
      cart: Cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Cart Items

// Example Express controller
export const getCartItems = async (req, res) => {
  try {
    if (Cart && Cart.length > 0) {
      return res.status(200).json(Cart);
    } else {
      return res.status(204).json({ message: "No items found in cart" });
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

//Update Cart Qty

export const updateCartQty = (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  // Validate quantity
  if (quantity === undefined || isNaN(quantity)) {
    return res.status(400).json({ message: "Quantity must be a number" });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  // Find the cart item
  const itemIndex = Cart.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  // Update the quantity and totalAmount
  Cart[itemIndex].quantity = quantity;
  Cart[itemIndex].totalAmount = Cart[itemIndex].price * quantity;

  return res.status(200).json({
    message: "Cart quantity updated successfully",
    cartItem: Cart[itemIndex],
  });
};
export const Delete = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // ✅ Remove item from Cart
    const index = Cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      Cart.splice(index, 1);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // ✅ Update Foods array
    const foodItem = Foods.find((item) => item.id === id);
    if (foodItem) foodItem.cart = false;

    // ✅ Update FavoriteList array
    const favoriteItem = FavoriteList.find((item) => item.id === id);
    if (favoriteItem) favoriteItem.cart = false;

    return res.status(200).json({
      message: "Item deleted from cart successfully",
      cart: Cart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
