const express = require("express");
const sequelizedb = require("../model/sqliteConfig");
const Book = require("../model/bookModel");

const router = express.Router();

sequelizedb.sync().then(() => console.log("Db connected"));

router.get("/api/books", async (req, res, next) => {
  try {
    const bookList = await Book.findAll();
    res.status(200).json(bookList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/books/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/api/books", async (req, res, next) => {
  try {
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    };
    // Method 1
    //const book = Book.build(newbook);
    //await book.save();
    // Method 2
    const book = await Book.create(newbook);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/api/books", async (req, res, next) => {
  try {
    // Method 1
    // const result = await Book.update(
    //   { title: req.body.title, author: req.body.author, price: req.body.price },
    //   { where: { id: req.body.id } }
    // );
    // Method 2
    const book = await Book.findByPk(req.body.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;
    const result = await book.save();
    res.status(200).json({
      message: "updated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/api/books", async (req, res, next) => {
  try {
    const id = req.body.id;
    // Method 1
    // const result = await Book.destroy({
    //   where: {
    //     id: id,
    //   },
    // });
    // Method 2
    const book = await Book.findByPk(id);
    const result = await book.destroy();
    res.status(200).json({
      message: "deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
