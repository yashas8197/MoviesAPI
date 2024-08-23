const request = require("supertest");
const http = require("http");
const { getMovies, getMovieById } = require("../controllers/index");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all movies", () => {
    const mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];
    getMovies.mockReturnValue(mockMovies);

    const result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });

  it("Should return of a specific Movie", () => {
    const mockMovie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };

    getMovieById.mockReturnValue(mockMovie);

    const result = getMovieById(1);
    expect(result).toEqual(mockMovie);
  });
});

describe("API Endpoints tests", () => {
  it("GET /movies should get all movies", async () => {
    const mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];
    const res = await request(server).get("/api/movies");
    expect(res.body).toEqual({ movies: mockMovies });
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /api/movies/:id should an by id", async () => {
    const mockMovie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };
    const res = await request(server).get("/api/movies/1");
    expect(res.body.movie).toEqual(mockMovie);
    expect(res.status).toEqual(200);
  });
});
