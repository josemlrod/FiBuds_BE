// NPM MODULES
const express = require("express");

// LOCAL MODULES
const { GoalService } = require("../services/goal");

// ROUTE FUNCTIONS
const createGoal = (request, response) => {
  const { target, user_id, name, balance, expires_at } = request.body;
  GoalService.createGoal(target, user_id, name, balance, expires_at)
    .then(data => {
      response.status(200).json({
        msg: `Successfully created goal.`,
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

const getGoal = (request, response) => {
  const { id } = request.params;
  GoalService.getGoal(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully retrieved goal info, goal #${id}.`,
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

const updateGoal = (request, response) => {
  const { target, user_id, name, balance, id } = request.body;
  GoalService.updateGoal(target, user_id, name, balance, id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully updated goal.`,
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

const deleteGoal = (request, response) => {
  const { id } = request.body;
  GoalService.deleteGoal(id)
    .then(data => {
      response.status(200).json({
        msg: `Successfully deleted goal, goal #${id}.`,
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
const GoalRouter = () => {
  const router = express.Router();

  router.post("/", createGoal);
  router.get("/:id", getGoal);
  router.put("/", updateGoal);
  router.delete("/", deleteGoal);

  return router;
};

module.exports = {
  GoalRouter
};
