import { IImage } from "../model/image";

export interface IGetCategoryRes {
  id: string;
  name: string;
  image: IImage;
}
