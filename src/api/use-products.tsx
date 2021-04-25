import { useQuery } from "react-query";
import { UseQueryOptions as Options } from "react-query";
import { api } from "../config";
import { fetcher } from "./fetcher";

interface Item {
  pieDetailId: number;
  productId: number;
  price: number;
  multipleAmount: number;
  sizeDescription: string;
  flavour: string;
  priceInStore: number;
  category: string;
  temperature: string;
  minOrderAmount: number;
  portions: number;
  preparationTime: number;
  displayName: string;
  displayDescription: string;
}

interface IResult {
  pieDetailId: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  isActive: boolean;
  isPieOfTheWeek: boolean;
  ingredients: string;
  flickrAlbumId: string;
  items: Item[];
}

export const useProducts = (params: Options<IResult[]> = {}) => {
  return useQuery<IResult[]>(["products"], () => fetcher(`${api}/_products/all`), params);
};
