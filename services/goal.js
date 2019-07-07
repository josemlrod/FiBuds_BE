const { getDbConn } = require("./db");
const { dbAddr } = require("./config");
const GoalService = {};

GoalService.createGoal = (target, user_id, name, balance, expires_at) => {
  const sql = `INSERT INTO goals(target, user_id, name, balance, expires_at) VALUES ($[target],$[user_id],$[name],$[balance],$[expires_at]) RETURNING id`;
  return getDbConn(dbAddr).one(sql, {
    target,
    user_id,
    name,
    balance,
    expires_at
  });
};
GoalService.getGoal = id => {
  const sql = `SELECT goals.*, users.first_name, users.last_name, users.avatar_url, users.created_at AS user_createdAt, users.income FROM goals JOIN users ON users.id = goals.user_id WHERE users.id=$[id]`;
  return getDbConn(dbAddr).any(sql, { id });
};
GoalService.updateGoal = (target, user_id, name, balance, id) => {
  const sql = `UPDATE goals SET target=$[target], user_id=$[user_id], name=$[name], balance=$[balance] WHERE id=$[id] RETURNING id`;
  return getDbConn(dbAddr).one(sql, { target, user_id, name, balance, id });
};
GoalService.deleteGoal = id => {
  const sql = `DELETE FROM goals WHERE id=$[id]`;
  return getDbConn(dbAddr).none(sql, { id });
};

module.exports = {
  GoalService
};
