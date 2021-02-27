const path = require("path");
const express = require("express"); // common js syntax
//es 2015 syntax = imports in react
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//get environment variables
dotenv.config({ path: "./config/config.env" });

// connecting to DB
connectDB();

const transactions = require("./routes/transactions");

//initialize app
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

//routes

// whenever a request is made to this url it routes to transactions.js
app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "PRODUCTION") {
  // If Production serve build folder - our static folder (SPA)
  app.use(express.static("client/build"));
  // when we make a request to anything except api routes -  load the index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
