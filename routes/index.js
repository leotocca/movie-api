const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const moviesClass = require("../movies.js");

const movies = new moviesClass();

router
  .route("/movies")
  .get((req, res) => {
    if (req.query.year || req.query.genre || req.query.sortBy) {
      if (req.query.year) {
        res.json(movies.selectByYear(req.query.year));
      } else if (req.query.genre) {
        res.json(movies.selectByGenre(req.query.genre));
      } else if (req.query.sortBy) {
        res.json(movies.sortBy(req.query.sortBy));
      }
    } else {
      res.json(movies);
    }
  })
  .post(
    [
      check("title")
        .isLength({ min: 2 })
        .trim()
        .escape(),
      check("year")
        .isNumeric()
        .isInt({ min: 1800, max: 2020 })
        .trim()
        .escape()
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("404 - Bad Request");
        res.status = 422;
        next(err);
      }

      if (movies.add(req.body)) {
        res.json(req.body);
        console.log(movies);
      } else {
        res.json({ message: "Movie already existed." });
      }
    }
  );

router.route("/movies/genres").get((req, res) => {
  res.json(movies.listByGenre());
});

router.route("/movies/years").get((req, res) => {
  res.json(movies.listByYear());
});

router
  .route("/movies/:id")
  .get((req, res, next) => {
    const ID = Number(req.params.id);
    if (movies.checkIfExists(movies.findByID(ID))) {
      res.json(movies.findByID(ID));
    } else {
      const err = new Error(`404 - The movie with the id ${ID} was not found`);
      res.status = 422;
      next(err);
    }
  })
  .put((req, res) => {
    const ID = Number(req.params.id);
    if (movies.checkIfExists(movies.findByID(ID))) {
      res.json(movies.update(req.body, ID));
    } else {
      movies.add(req.body);
      res.json(req.body);
    }
  })
  .delete((req, res, next) => {
    const ID = Number(req.params.id);
    if (movies.checkIfExists(movies.findByID(ID))) {
      movies.delete(ID);
      res.json(movies);
    } else {
      const err = new Error(`404 - The movie with the id ${ID} was not found`);
      res.status = 422;
      next(err);
    }
  });

module.exports = router;
