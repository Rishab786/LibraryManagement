const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const userAuthController = require("../middleware/authentication");

router.post(
    "/borrow/:bookId",
    userAuthController.authentication,
    userController.borrowBook
);

router.get(
    "/borrowedBooks",
    userAuthController.authentication,
    userController.getBorrowedBooks
);
router.put(
    "/return/:bookId",
    userAuthController.authentication,
    userController.returnBook
);

module.exports = router;
