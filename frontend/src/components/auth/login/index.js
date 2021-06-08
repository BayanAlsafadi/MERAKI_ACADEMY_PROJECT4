import React, { useState } from "react";
import axios from "axios";

import "./login.css";

import { useHistory } from "react-router-dom";


export default function Login({ setToken, path }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const loginFun = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          // setToken(res.data.token);
          setLoginMessage("login successful");
          history.push(path);
        } else {
          setLoginMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginMessage("please try again");
      
      });
  };

  return (
    <div>
      <p>Login</p>
      <input
        type="text"
        placeholder="email here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="loginButton" onClick={loginFun}>
        login
      </button>
      <p>{loginMessage}</p>
    </div>
  );
}
