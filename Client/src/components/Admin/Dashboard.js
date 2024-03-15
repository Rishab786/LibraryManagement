import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditBook from "./EditBook";
import UserDetails from "./UserDetails";
import { URL } from "../../config.js";

const Dashboard = () => {
  let newData;
  let bookData = "";

  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState("false");
  const [user, setUser] = useState("false");
  const [bookId, setBookId] = useState();
  const [oldBook, setBook] = useState("");
  useEffect(() => {
    axios({
      url: `${URL}/book/getAllBooks`,
    }).then((res) => {
      const fetchedBooks = res.data.books;
      setBooks(fetchedBooks);
    });
  }, []);

  const editBook = async (e) => {
    const id = e.target.value;

    bookData = await axios({
      url: `${URL}/book/getBook/${id}`,
    });
    setEdit("true");
    newData = bookData.data.book;
    setBook(newData);
  };

  const userDetails = async (e) => {
    const book_Id = e.target.value;
    setUser("true");
    setEdit("false");
    setBookId(book_Id);
  };
  if (edit == "true") {
    return <EditBook book={oldBook} />;
  } else if (user == "true") {
    return <UserDetails bookId={bookId} />;
  } else {
    return (
      <div>
        <Link to="/addBook">Add New Book</Link>
        {books.map((book) => {
          return (
            <div className="card" key={book._id}>
              <div className="card-body">
                <h3 className="card-title">Title:{book.title}</h3>
                <h4 className="card-author">Author:{book.author}</h4>
                <h4 className="card-author">Quantity:{book.quantity}</h4>
                <button
                  onClick={editBook}
                  value={book._id}
                  className="card-link"
                >
                  EditBook
                </button>
                <button
                  onClick={userDetails}
                  value={book._id}
                  className="card-link"
                >
                  Get Users Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Dashboard;
