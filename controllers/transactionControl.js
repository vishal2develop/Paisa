// contains the method to use the model to interact with the Database

const Transaction = require("../models/Transaction");

// @desc Get all transactions
// @routes GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

// @desc Add a transaction
// @routes POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(`Error: ${error}`.red);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server error",
      });
    }
  }
};

// @desc Delete a transaction
// @routes DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    } else {
      await transaction.remove();

      return res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};
