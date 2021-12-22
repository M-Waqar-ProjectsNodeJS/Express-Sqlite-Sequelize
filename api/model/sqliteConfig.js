const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "./BookDb.sqlite",
});

module.exports = sequelize;
