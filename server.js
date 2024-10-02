var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.options("*", cors());

// Require the course routes and inject the app
require("./app/routes/course.routes.js")(app);

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;