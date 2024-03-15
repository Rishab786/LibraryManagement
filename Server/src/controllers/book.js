const Book = require("../models/Book");
exports.getAllBook = async (req, res) => {
  const books = await Book.find({});
  res.send({ books: books });
};

exports.getBook = async (req, res) => {
  let { id } = req.params;

  const book = await Book.findById(id);
  res.send({ book: book });
};
