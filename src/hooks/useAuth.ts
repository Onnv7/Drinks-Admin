import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { IAuth } from "../interfaces/auth";

const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
