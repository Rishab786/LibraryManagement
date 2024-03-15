const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authorization");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const config= require("../config.js")
const url = config.MONGO_URL;
const PORT = config.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/book",bookRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
