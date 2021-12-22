const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sqliteConfig");

class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "books",
    timestamps: false,
  }
);

module.exports = Book;
