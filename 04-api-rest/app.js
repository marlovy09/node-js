 import { randomUUID } from "node:crypto"; //-> otra opcion de generar ids
import express from "express";
import { require } from "./utils.js";
import { UsersRouter } from "./routes/users.js";

const users = require("./users.json");
const movies = require("./movies.json");

const app = express();

//let idCount = users.length;

// Middleware para parsear el body a json
app.use(express.json());

// Home de la API

app.use("/users", UsersRouter)
app.use("/movies", UsersRouter)

// Obtener un usuario por su id
app.get("/users/:id", (req, res) => {
  // Obtener el id
  const id = parseInt(req.params.id);
  // Buscar el usuario con el mismo id que llaga por parametro con el metodo find
  const user = users.find((user) => user.id === id);
  // Si no hay usuario
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  // Si hay usuario
  return res.json(user);
});

//
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Encontrar el indice del usuario en la db por su id
  const index = users.findIndex((user) => user.id === id);
  // Si no existe ningun usuario con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  } else {
    const userUpdated = { ...users[index], ...req.body };
    users[index] = userUpdated;
    res.json(userUpdated);
  }
});
// Crear un usuario
app.post("/users", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Error en la peticion" });
  }
  const user = req.body;
  user.id = ++idCount;
  users.push(user);
  return res.status(201).json(user);
});

// Borrar un usuario
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Encontrar el indice del usuario en la db por su id
  const index = users.findIndex((user) => user.id === id);
  // Si no existe ningun usuario con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  } else {
    // Eliminar el usuario de la base de datos segun su id
    users.splice(index, 1);
    // Responder con un mensaje
    res.json({ message: "Usuario eliminado correctamente" });
  }
});

// movies
// Obtener todas la peliculas
app.get("/movies", (req, res) => {
  if (req.query.year) {
    const peliculasFiltradas = movies.filter(
      (movie) => movie.year == req.query.year
    );
    if (peliculasFiltradas.length === 0) {
      return res.status(404).json({ error: "No hay peliculas" });
    }
    return res.json(peliculasFiltradas);
  }
  if (movies.length === 0) {
    return res.status(404).json({ error: "No hay peliculas" });
  }
  res.json(movies);
});

// Obtener pelicula por su id
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({ error: "Pelicula no encontrada" });
  }
  return res.json(movie);
});

// Crear una pelicula
app.post("/movies", (req, res) => {
  if (!req.body.title || !req.body.year) {
    return res.status(400).json({ error: "Error en la peticion" });
  }
  const movie = req.body;
  movie.id = randomUUID();
  movies.push(movie);
  return res.status(201).json(movie);
});

// Modificar una pelicula
app.patch("/movies/:id", (req, res) => {
  const id = req.params.id;
  // Encontrar el indice de la pelicula en la db por su id
  const index = movies.findIndex((movie) => movie.id === id);
  // Si no existe ninguna pelicula con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Pelicula no encontrada" });
  } else {
    const movieUpdated = { ...movies[index], ...req.body };
    movies[index] = movieUpdated;
    res.json(movieUpdated);
  }
});

// Borrar una pelicula
app.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  // Encontrar el indice de la pelicula en la db por su id
  const index = movies.findIndex((movie) => movie.id === id);
  // Si no existe ninguna pelicula con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Pelicula no encontrada" });
  }
  // Eliminar la pelicula de la base de datos segun su id
  movies.splice(index, 1);
  // Responder con estado
  res.sendStatus(204);
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});