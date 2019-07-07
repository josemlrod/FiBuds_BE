// NPM MODULES
const pgp = require("pg-promise");

// IIFE FUNCTION RETURING DB CONNECTION
const getDbConn = (() => {
  let dbConn = null;
  return dbAddr => {
    if (!dbConn) {
      dbConn = pgp({})(dbAddr);
    }
    return dbConn;
  };
})();

module.exports = {
  getDbConn
};
