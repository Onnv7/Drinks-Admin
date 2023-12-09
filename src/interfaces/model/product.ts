import { IImage } from "./image";
import { ISize } from "./size";
import { ITopping } from "./topping";

export interface IProduct {
  id: string;
  name: string;
  image: IImage;
  sizeList: ISize[];
  toppingList: ITopping[];
  description: string;
  enabled: boolean;
}
