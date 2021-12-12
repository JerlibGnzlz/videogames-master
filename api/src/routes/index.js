const { Router } = require("express");
const {
  getVideoGames,
  getGameById,
  postVideoGame,
} = require("../controllers/videogame.controller");

const { getGenres } = require("../controllers/genre.controller");
const { getPlatforms } = require("../controllers/platform.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//--------------------------------------------------------------
router.route("/videogames").get(getVideoGames);
router.route("/videogame/:idVideogame").get(getGameById);
router.route("/genres").get(getGenres);
router.route("/platforms").get(getPlatforms);
//--------------------------------------------------------------

router.route("/videogame").post(postVideoGame);

module.exports = router;
