import { useQuery } from "@tanstack/react-query";
import { getFood, getFoodbyId } from "../api/api";

export interface Food {
  id: number;
  name: string;
  subName: string;
  price: string;
  image: string;
  description: string;
  category: string;
  status: string;
}

export const useGetFood = (search: string) => {
  return useQuery<Food[]>({
    queryKey: ["Food", search],
    queryFn: async () => {
      return await getFood(search); // directly call your async function
    },
  });
};
export const useGetFoodbyId = (id: number) => {
  return useQuery<Food[]>({
    queryKey: ["Foodbyid", id],
    queryFn: async () => {
      return await getFoodbyId(id); // ✅ call the async function
    },
  });
};
