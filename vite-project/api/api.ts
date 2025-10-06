import axios from "axios";

interface GetFoodParams {
  search?: string;
  filter?: Record<string, any>; // your filters
}

export const getFood = async ({ search = "", filter = {} }: GetFoodParams) => {
  const params = { search, ...filter };
  try {
    const response = await axios.get("/getFood", {
      params, // pass search as query parameter
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching  foods:", error.message || error);
    throw new Error("Failed to fetch  foods");
  }
};

export const getFoodbyId = async (id: number) => {
  const response = await axios.get(`/getFood/${id}`);
  return response.data;
};

export const addToCart = async (id: number, quantity: number) => {
  const response = await axios.post(`/addToCart/${id}`, { quantity }); // wrap in {}
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get("/getCartItems");
  return response.data;
};

export const updateCartQty = async (id: number, quantity: number) => {
  const response = await axios.put(`/updateCartQty/${id}`, { quantity });
  return response.data;
};

export const addToFavoriteList = async (id: number) => {
  const response = await axios.post(`/addToFavoriteList/${id}`);
  return response.data;
};

export const getFavoriteList = async () => {
  const response = await axios.get("/getFavoriteList");
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await axios.delete(`deleteCart/${id}`);
  return response.data;
};

export const deleteFavoriteItem = async (id: number) => {
  const response = await axios.delete(`deleteFavoriteItem/${id}`);
  return response.data;
};
