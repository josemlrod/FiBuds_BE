// NPM MODULES
const express = require("express");

// LOCAL MODULES
const { ExpenseService } = require("../services/expense");

// ROUTE FUNCTIONS
const createExpense = (request, response) => {
  const { fixed, amount, user_id, statement_id, name } = request.body;
  ExpenseService.createExpense(fixed, amount, user_id, statement_id, name)
    .then(data => {
      response.status(200).json({
        msg: `Successfully created expense.`,
        data
      });
    })
    .catch(e => {
      response.status(400).json({
        msg: `Something went wrong.`,
        e
      });
    });
};

const getExpense = (request, response) => {
  const { id } = request.params;
  ExpenseService.getExpense(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully retrieved expense's info.`,
        data
      });
    })
    .catch(e => {
      response.status(400).json({
        msg: `Something went wrong.`,
        e
      });
    });
};

const getAllExpenses = async (request, response) => {
  const { user_id, statement_id } = request.params;
  try {
    const expenses = {
      fixed: await ExpenseService.getSpecificExpenses(
        user_id,
        statement_id,
        "TRUE"
      ),
      other: await ExpenseService.getSpecificExpenses(
        user_id,
        statement_id,
        "FALSE"
      )
    };
    response.status(200).json({
      msg: `Successfully retrieved expenses.`,
      expenses
    });
  } catch (e) {
    response.status(400).json({
      msg: `Something went wrong.`,
      e
    });
  }
};

const updateExpense = (request, response) => {
  const { fixed, amount, user_id, statement_id, name, id } = request.body;
  ExpenseService.updateExpense(fixed, amount, user_id, statement_id, name, id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully updated expense.`,
        data
      });
    })
    .catch(e => {
      response.status(400).json({
        msg: `Something went wrong.`,
        e
      });
    });
};

const deleteExpense = (request, response) => {
  const { id } = request.body;
  ExpenseService.deleteExpense(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully deleted expense.`,
        data
      });
    })
    .catch(e => {
      response.status(400).json({
        msg: `Something went wrong.`,
        e
      });
    });
};

// FUNCTION THAT RETURNS ROUTER
const ExpenseRouter = () => {
  const router = express.Router();

  router.post("/", createExpense);
  router.get("/:id", getExpense);
  router.get("/all/:user_id/:statement_id", getAllExpenses);
  router.put("/", updateExpense);
  router.delete("/", deleteExpense);

  return router;
};

module.exports = {
  ExpenseRouter
};
