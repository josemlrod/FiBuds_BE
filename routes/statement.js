// NPM MODULES
const express = require("express");

// LOCAL MODULES
const { StatementService } = require("../services/statement");

// ROUTE FUNCTIONS
const createStatement = (request, response) => {
  const { name, budget, user_id, saved } = request.body;
  StatementService.createStatement(name, budget, user_id, saved)
    .then(data => {
      response.status(200).json({
        msg: `Successfully created statement.`,
        data
      });
    })
    .catch(e => {
      console.log(e);
      response.status(400).json({
        msg: `Something went wrong.`,
        e
      });
    });
};

const getStatement = (request, response) => {
  const { id } = request.params;
  StatementService.getStatement(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully retrieved statement info.`,
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

const getUserStatements = (request, response) => {
  const { email } = request.params;
  StatementService.getUserStatements(email)
    .then(data => {
      response.status(200).json({
        msg: `Successfully retrieved all statements for user ${email}}.`,
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

const getStatementsAndExpenses = (request, response) => {
  const { email } = request.params;
  StatementService.getStatementsAndExpenses(email)
    .then(data => {
      response.status(200).json({
        msg: `Successfully retrieved statement and expense info.`,
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

const updateStatement = (request, response) => {
  const { name, budget, id, saved } = request.body;
  StatementService.updateStatement(name, budget, id, saved)
    .then(data => {
      response.status(200).json({
        msg: `Successfully updated statement.`,
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

const deleteStatement = (request, response) => {
  const { id } = request.body;
  StatementService.deleteStatement(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully deleted statement.`,
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
const StatementRouter = () => {
  const router = express.Router();

  router.post("/", createStatement);
  router.get("/:id", getStatement);
  router.get("/all/:email", getUserStatements);
  router.get("/detailed/:email", getStatementsAndExpenses);
  router.put("/", updateStatement);
  router.delete("/", deleteStatement);

  return router;
};

module.exports = {
  StatementRouter
};
