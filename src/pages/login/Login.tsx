import React, { FormEvent, FormEventHandler, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./login.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="loginContainer">
      <form onSubmit={onLogin}>
        <input
          type="text"
          className="loginUsername"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          className="loginPassword"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>
    </div>
  );
};

export default Login;
