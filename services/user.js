const { getDbConn } = require("./db");
const { dbAddr } = require("./config");
const UserService = {};

UserService.getUser = id => {
  const sql = `SELECT * FROM users WHERE id=$[id]`;
  return getDbConn(dbAddr).one(sql, { id });
};

UserService.createUser = (
  first_name,
  last_name,
  email,
  firebase_token,
  avatar_url,
  income
) => {
  const sql = `INSERT INTO users(first_name,last_name,email,firebase_token,avatar_url,income) VALUES($[first_name],$[last_name],$[email],$[firebase_token],$[avatar_url],$[income]) RETURNING id `;
  return getDbConn(dbAddr).one(sql, {
    first_name,
    last_name,
    email,
    firebase_token,
    avatar_url,
    income
  });
};

UserService.deleteUser = id => {
  const sql = `DELETE FROM users WHERE id=$[id]`;
  return getDbConn(dbAddr).none(sql, { id });
};
UserService.updateUser = (
  first_name,
  last_name,
  email,
  firebase_token,
  avatar_url,
  income,
  id
) => {
  const sql = `UPDATE users SET first_name=$[first_name], last_name=$[last_name], email=$[email],firebase_token=$[firebase_token], avatar_url=$[avatar_url], income=$[income] WHERE id=$[id] RETURNING id `;
  return getDbConn(dbAddr).one(sql, {
    first_name,
    last_name,
    email,
    firebase_token,
    avatar_url,
    income,
    id
  });
};

UserService.getUserByEmail = email => {
  const sql = `SELECT * from users WHERE email=$[email]`;
  return getDbConn(dbAddr).one(sql, { email });
};

module.exports = {
  UserService
};
