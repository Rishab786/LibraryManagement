const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.post("/addBook", adminController.addBook);
router.post("/editBook/:id", adminController.editBook);
router.get("/userDetails/:bookId", adminController.getUserDetails);

module.exports = router;
