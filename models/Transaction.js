const mongoose = require("mongoose");

// create a schema
const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// creating a model with a collection Transaction (transactions)
// following TransactionSchema and exporting it
module.exports = mongoose.model("Transaction", TransactionSchema);
