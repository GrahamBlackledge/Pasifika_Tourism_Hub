 require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const countryRoutes = require("./routes/countryRoutes");

// express app
const app = express();

// middleware

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/countries", countryRoutes);
app.use('/api/users', require('./routes/userRoutes'));

// routes
app.get("/", (req, res) => {
  res.send("Pasifika GET request");
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("db connected & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB error:", error);
  });
