import { ISize } from "../model/size";
import { ITopping } from "../model/topping";

export interface ICreateProductReq {
  name: string;
  image: File | null;
  sizeList: ISize[];
  description: string;
  toppingList: ITopping[];
  categoryId: string;
}

export interface IGetAllProductsReq {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrl: string;
  enabled: boolean;
}
export interface IUpdateProductReq {
  name: string;
  image: File | null;
  sizeList: ISize[];
  description: string;
  toppingList: ITopping[];
  categoryId: string;
  enabled: boolean;
}
