DROP TABLE if exists users;
DROP TABLE if exists statements;
DROP TABLE if exists goals;
DROP TABLE if exists expenses;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  avatar_url VARCHAR,
  income INT NULL,
  firebase_token VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE statements
(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  budget INT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  saved VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goals
(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  target INT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  balance INT,
  expires_at VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses
(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  fixed boolean,
  amount INT,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  statement_id INT REFERENCES statements(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)