// GLOBAL VARIABLES
const dbName = "financialdb";
const dbAddr = process.env.DATABASE_URL || `postgres://localhost/${dbName}`;

module.exports = {
  dbAddr
};
