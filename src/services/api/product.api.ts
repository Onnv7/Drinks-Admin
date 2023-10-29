import { ICreateCategoryReq } from "../../interfaces/request/category.request";
import {
  ICreateProductReq,
  IUpdateProductReq,
} from "../../interfaces/request/product.request";
import { axiosPrivate, axiosPrivateForm } from "./axios";

const ProductApi = {
  getAllProduct: async () => {
    const { data } = await axiosPrivate.get("/api/product/all");
    return data;
  },
  getProductDetailsById: async (id: string) => {
    const { data } = await axiosPrivate.get(`/api/product/details/${id}`);
    return data;
  },
  createProduct: async (body: ICreateProductReq) => {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("image", body.image!);

    body.sizeList.forEach((it, index) => {
      formData.append(`sizeList[${index}].size`, it.size.toString());
      formData.append(`sizeList[${index}].price`, it.price.toString());
    });

    body.toppingList.forEach((it, index) => {
      formData.append(`toppingList[${index}].name`, it.name.toString());
      formData.append(`toppingList[${index}].price`, it.price.toString());
    });

    formData.append("description", body.description);
    formData.append("categoryId", body.categoryId);
    const { data } = await axiosPrivateForm.post("/api/product", formData);
    return data;
  },
  updateProduct: async (body: IUpdateProductReq, id: string) => {
    const formData = new FormData();
    formData.append("name", body.name);
    if (body.image) {
      formData.append("image", body.image);
    }

    body.sizeList.forEach((it, index) => {
      formData.append(`sizeList[${index}].size`, it.size.toString());
      formData.append(`sizeList[${index}].price`, it.price.toString());
    });

    body.toppingList.forEach((it, index) => {
      formData.append(`toppingList[${index}].name`, it.name.toString());
      formData.append(`toppingList[${index}].price`, it.price.toString());
    });

    formData.append("description", body.description);
    formData.append("categoryId", body.categoryId);
    formData.append("enabled", body.enabled + "");

    const { data } = await axiosPrivateForm.put(`/api/product/${id}`, formData);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await axiosPrivate.delete(`/api/product/${id}`);
    return data;
  },
};

export default ProductApi;
