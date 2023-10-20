import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IAuth } from "../interfaces/auth";

type AuthType = {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
};

type Props = {
  children: ReactNode;
};

const defaultState = {
  auth: {
    username: "",
    accessToken: "",
    refreshToken: "",
  },
  setAuth: (auth: IAuth) => {},
} as AuthType;

export const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<IAuth>({
    username: "",
    accessToken: "",
    refreshToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
