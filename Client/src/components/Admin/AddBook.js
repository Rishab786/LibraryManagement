import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../config.js";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  const { title, author, quantity } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `${URL}/admin/addBook`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        alert("book added successfully");
        navigate("/adminDashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={author}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={quantity}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
