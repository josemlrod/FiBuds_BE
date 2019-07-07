// NPM MODULES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// ROUTE MODULES
const { UserRouter } = require("./routes/user");
const { ExpenseRouter } = require("./routes/expense");
const { StatementRouter } = require("./routes/statement");
const { GoalRouter } = require("./routes/goal");

const getApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/user", UserRouter());
  app.use("/expense", ExpenseRouter());
  app.use("/statement", StatementRouter());
  app.use("/goal", GoalRouter());

  return app;
};

module.exports = {
  getApp
};
