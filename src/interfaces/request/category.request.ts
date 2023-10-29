export interface ICreateCategoryReq {
  image: File;
  name: string;
}

export interface IUpdateCategoryReq {
  image?: File;
  name: string;
  enabled: boolean;
}
