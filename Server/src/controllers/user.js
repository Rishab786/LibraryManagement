const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

exports.borrowBook = async (req, res) => {
  const { bookId } = req.params;
  const user = req.user;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    if (book.quantity === 0) {
      return res.status(400).json({ message: "No more books available" });
    }

    book.quantity--;
    await book.save();

    user.borrowedBooks.push(bookId);
    await user.save();

    const transaction = new Transaction({
      user: user._id,
      book: bookId,
      action: "borrowed",
    });
    await transaction.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.returnBook = async (req, res) => {
  const { bookId } = req.params;
  const user = req.user;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: " book not found" });
    }

    user.borrowedBooks = user.borrowedBooks.filter(
      (book) => book.toString() !== bookId
    );
    await user.save();

    book.quantity++;
    await book.save();

    const transaction = new Transaction({
      user: user._id,
      book: bookId,
      action: "returned",
    });
    await transaction.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getBorrowedBooks = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const bookIds = user.borrowedBooks;
    const books = bookIds.map(async (bookId) => {
      const book = await Book.findById(bookId);
      return book;
    });
    const borrowedBooks = await Promise.all(books);

    res.json({ borrowedBooks: borrowedBooks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
