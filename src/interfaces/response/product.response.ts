import { IImage } from "../model/image";
import { ISize } from "../model/size";
import { ITopping } from "../model/topping";

export interface IGetProductDetailsByIdRes {
  id: string;
  code: string;
  name: string;
  description: string;
  image: IImage;
  sizeList: ISize[];
  toppingList: ITopping[];
  categoryId: string;
  enabled: boolean;
}

export interface IUpdateProductRes {
  id: string;
  name: string;
  image: IImage;
  sizeList: ISize[];
  description: string;
  toppingList: ITopping[];
  categoryId: string;
  enabled: boolean;
}
