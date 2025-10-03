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

export const useGetFood = (search: string = "", filter: any = {}) => {
  return useQuery({
    queryKey: ["food", search, JSON.stringify(filter)], // include filter in queryKey
    queryFn: () => getFood({ search, filter }), // pass both to API
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
