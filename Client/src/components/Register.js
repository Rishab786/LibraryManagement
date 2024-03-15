import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../config.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Select",
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `${URL}/auth/register`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (role === "user") navigate("/userDashboard");
        else navigate("/adminDashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <br/>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <select name="role" value={role} onChange={handleChange}>
          <option>select</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
