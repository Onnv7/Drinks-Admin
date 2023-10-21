import React, { FormEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./login.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="loginContainer">
      <div className="cardForm">
        <div className="title">Sign in to Admin</div>
        <form onSubmit={onLogin}>
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
          <div className="submitButton">
            <input type="submit" className="loginButton" hidden />
            <div>Login</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
