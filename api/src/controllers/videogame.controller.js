const {
  getGamesApi,
  getGamesByNameFromApi,
  GameByIdFromApi,
} = require("../services/api.services");
const {
  insertVideoGame,
  getGamesByNameFromDb,
  getGamesDb,
  GameByIdDB,
} = require("../helpers/videogame.helper");
const { v4 } = require("uuid");

// GET REQUESTS
const getGameById = async (req, res) => {
  const { idVideogame } = req.params;
  if (!idVideogame) {
    return res.json({ status: 400, message: "Id is required" });
  }
  if (idVideogame.length > 9) {
    const dataByIdFromDB = await GameByIdDB(idVideogame);
    if (dataByIdFromDB.status === 200) {
      return res.json(dataByIdFromDB.game);
    } else {
      return res.json(dataByIdFromDB);
    }
  }
  const dataById = await GameByIdFromApi(idVideogame);
  return res.json(dataById);
};

const getVideoGames = async (req, res) => {
  const { name } = req.query;
  if (name) {
    //*bucar en api y en base de datos por un parametro "name"
    const gamesByName = await getGamesByNameFromApi(name);
    const gameByNFromDb = await getGamesByNameFromDb(name);

    return res.json({
      fromApi: gamesByName.status === 404 ? [] : gamesByName,
      fromDb: gameByNFromDb.status === 404 ? [] : gameByNFromDb.results,
    });
  } else {
    const dataFromApi = await getGamesApi();
    //* desde BD
    const dataFromDb = await getGamesDb();

    return res.json({
      results:
        dataFromDb.status === 200
          ? [...dataFromApi, ...dataFromDb.results]
          : dataFromApi,
    });
  }
};

// POST REQUESTS

const postVideoGame = async (req, res) => {
  const { name, description, released, rating, genres, platforms } = req.body;

  console.log(req.body);
  if (!name || !description || !released || !rating) {
    return res.json({
      status: 400,
      message: "Bad Request, some fields not found ",
    });
  }

  if (JSON.parse(genres).length > 0 && JSON.parse(platforms).length > 0) {
    const videoGObject = {
      id: v4(),
      name,
      description,
      released,
      rating,
      image: req.file
        ? `http://localhost:3001/uploads/${req.file.filename}`
        : null,
    };

    const dataResult = await insertVideoGame(videoGObject, genres, platforms);
    return res.json(dataResult);
  } else {
    return res.json({ status: 400, message: "Bad Request, arrays required" });
  }
};

module.exports = {
  getVideoGames,
  getGameById,
  postVideoGame,
};
