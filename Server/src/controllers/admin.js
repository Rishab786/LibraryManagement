const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  const { title, author, quantity } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      quantity,
    });

    await newBook.save();
    res.json({ message: "Book added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, quantity } = req.body;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.quantity = quantity;

    await book.save();
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserDetails = async (req, res) => {
  const { bookId } = req.params;

  try {
    const users = await Transaction.find({ book: bookId });
    const userDetails = [];
    for (let user of users) {
      const userId = await User.findById(user.user);

      const obj = {
        userEmail: userId.email,
        status: user.action,
      };
      userDetails.push(obj);
    }
    res.json({ users: userDetails });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
