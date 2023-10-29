import { ICategory } from "../../interfaces/model/category";
import {
  ICreateCategoryReq,
  IUpdateCategoryReq,
} from "../../interfaces/request/category.request";
import { axiosPrivate, axiosPrivateForm } from "./axios";

const CategoryApi = {
  getAllCategory: async () => {
    const { data } = await axiosPrivate.get("/api/category/all");
    return data;
  },

  createCategory: async (body: ICreateCategoryReq) => {
    const { data } = await axiosPrivateForm.post("/api/category", body);
    return data;
  },

  deleteCategory: async (id: string) => {
    await axiosPrivate.delete(`/api/category/${id}`);
  },
  updateCategory: async (body: IUpdateCategoryReq, id: string) => {
    const { data } = await axiosPrivateForm.put(`/api/category/${id}`, body);
    return data;
  },
};
export default CategoryApi;
