const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router.get("/getAllBooks", bookController.getAllBook);
router.get("/getBook/:id", bookController.getBook);

module.exports = router;
