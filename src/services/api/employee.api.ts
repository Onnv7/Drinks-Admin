import {
  IChangePasswordReq,
  ICreateEmployeeReq,
  IUpdateEmployeeReq,
} from "../../interfaces/request/employee.request";
import { axiosPrivate } from "./axios";

const EmployeeApi = {
  getAllEmployees: async () => {
    const { data } = await axiosPrivate.get("/api/employee");
    return data;
  },
  getEmployeeById: async (id: string) => {
    const { data } = await axiosPrivate.get(`/api/employee/${id}`);
    return data;
  },
  createEmployee: async (body: ICreateEmployeeReq) => {
    const { data } = await axiosPrivate.post("/api/employee/register", body);
    return data;
  },
  updateEmployee: async (body: IUpdateEmployeeReq, id: string) => {
    const { data } = await axiosPrivate.put(`/api/employee/${id}`, body);
    return data;
  },
  deleteEmployee: async (id: string) => {
    const { data } = await axiosPrivate.delete(`/api/employee/${id}`);
    return data;
  },
  changePassword: async (id: string, body: IChangePasswordReq) => {
    const { data } = await axiosPrivate.patch(
      `/api/employee/password/${id}`,
      body
    );
    return data;
  },
};

export default EmployeeApi;
