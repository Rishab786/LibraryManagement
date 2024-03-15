import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../config.js";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `${URL}/auth/login`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const role = res.data.role;
        if (role === "user") navigate("/userDashboard");
        else navigate("/adminDashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
