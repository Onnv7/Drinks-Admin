import { ILoginReq } from "../../interfaces/request/auth.request";
import { axiosPublic } from "./axios";

const AuthApi = {
  login: (body: ILoginReq) => {
    return axiosPublic.post("/api/auth/employee/login", body);
  },
};

export default AuthApi;
