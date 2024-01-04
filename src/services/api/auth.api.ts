import {
  ILoginReq,
  IRefreshTokenReq,
} from "../../interfaces/request/auth.request";
import { axiosPrivate, axiosPublic } from "./axios";

const AuthApi = {
  login: async (body: ILoginReq) => {
    const { data } = await axiosPublic.post("/api/auth/employee/login", body);
    return data;
  },
  refreshToken: async () => {
    const { data } = await axiosPublic.post("/api/auth/employee/refresh-token");
    return data;
  },
};

export default AuthApi;
