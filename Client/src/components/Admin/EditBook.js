import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../config.js";
const EditBook = ({ book }) => {
  const navigate = useNavigate();
  const bookId = book._id;

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,

    quantity: book.quantity,
  });

  const { title, author, quantity } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      url: `${URL}/admin/editBook/${bookId}`,
      method: "POST",
      data: formData,
    });
    alert("updated successfully");
    navigate("/adminDashboard");
  };

  return (
    <div>
      <h2>Edit Book</h2>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
