import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config.js";

const BorrowedBook = () => {
  const [borrowedBook, setBorrowedBooks] = useState([]);
  const returnBook = async (e) => {
    const bookId = e.target.value;
    const res = await axios({
      url: `${URL}/user/return/${bookId}`,
      method: "PUT",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    alert(res.data.message);
  };
  useEffect(() => {
    axios({
      url: `${URL}/user/borrowedBooks`,
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setBorrowedBooks(res.data.borrowedBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="card">
      <h2>Borrowed Books</h2>
      <ul className="list-group list-group-flush">
        {borrowedBook.map((book, i) => (
          <li key={i} className="list-group-item">
            <h4>
              {" "}
              <strong>Title:</strong> {book.title}
            </h4>
            <h4>
              <strong>Author:</strong> {book.author}
            </h4>
            <button value={book._id} onClick={returnBook}>
              Return
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBook;
