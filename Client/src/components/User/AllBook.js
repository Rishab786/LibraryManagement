import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config.js";

const AllBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios({
      url: `${URL}/book/getAllBooks`,
    }).then((res) => {
      const fetchedBooks = res.data.books;
      setBooks(fetchedBooks);
    });
  }, []);

  const borrowBook = async (e) => {
    const bookId = e.target.value;

    const res = await axios({
      url: `${URL}/user/borrow/${bookId}`,
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    alert(res.data.message);
    navigate("/userDashboard");
  };
  return (
    <>
      {books.map((book) => {
        return (
          <div key={book._id}>
            <h3>
              Title: {book.title} Author: {book.author}
              <button onClick={borrowBook} value={book._id}>
                BorrowBook
              </button>
            </h3>
          </div>
        );
      })}
    </>
  );
};

export default AllBook;
