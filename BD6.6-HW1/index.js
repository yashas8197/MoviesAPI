const cors = require("cors");
const express = require("express");
const { getMovies, getMovieById } = require("./controllers/index");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/movies", async (req, res) => {
  const movies = await getMovies();
  res.json({ movies });
});

app.get("/api/movies/:id", async (req, res) => {
  const movie = await getMovieById(parseInt(req.params.id));
  res.json({ movie });
});

module.exports = { app };
