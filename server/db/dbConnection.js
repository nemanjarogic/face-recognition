const knex = require("knex");

// Modules are cached after the first time they are loaded.
// More at: https://nodejs.org/docs/latest/api/modules.html#modules_caching

const dbConnection = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

module.exports = {
  db: dbConnection
};
