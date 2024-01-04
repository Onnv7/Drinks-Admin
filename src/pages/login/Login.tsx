import React, { MouseEventHandler, useEffect, useState } from "react";

import "./login.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { login } from "../../services/redux/slices/auth.slice";
import { useSelector } from "react-redux";

import { ILoginReq } from "../../interfaces/request/auth.request";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { authSelector } from "../../services/redux/selecters/selector";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";

import { storageManager } from "../../helper/storager";
import useValidator from "../../hooks/useValidator";
import { loginSchema } from "../../validators/Auth";
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginState = useSelector(authSelector);
  const { errors, validate } = useValidator(loginSchema);

  useEffect(() => {
    const { token: loginRes } = loginState;
    // TH chặn login rồi => home
    if (storageManager.getToken()) {
      navigate("/");
    }
    // TH login thành công
    else if (loginState.error === null && loginState.token !== null) {
      const data = loginState.token;
      setAuth({
        userId: data.employeeId,
        accessToken: data.accessToken,
      });
      if (loginRes?.accessToken !== null) {
        storageManager.setUserId(data.employeeId!);
        storageManager.setToken(data.accessToken!);
      }
      navigate("/");
    }
  }, [auth, loginState, navigate, setAuth]);

  // event handlers =================================================================
  const handleLogin: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    try {
      const result = validate({
        username,
        password,
      });
      console.log(
        "🚀 ~ file: Login.tsx:60 ~ consthandleLogin:MouseEventHandler<HTMLDivElement>= ~ result:",
        result
      );
      if (result) {
        const data: ILoginReq = {
          username: username,
          password: password,
        };
        await dispatch(login(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="loginContainer">
      <div className="cardForm">
        <div className="title">Sign in to Admin</div>
        <form>
          <div className="loginUsername">
            <span className="iconLogin">
              <AccountCircleOutlinedIcon />
            </span>
            <input
              type="text"
              className="usernameInput"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="loginPassword">
            <span className="iconLogin">
              <LockOutlinedIcon />
            </span>
            <input
              type="password"
              className="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
          <div className="submitButton" onClick={handleLogin}>
            <input type="submit" className="loginButton" hidden />
            <div>Login</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
