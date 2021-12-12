const { Videogame, Genre, Platform } = require("../db");
const { Op } = require("sequelize");

const GameByIdDB = async (idVideoGame) => {
  try {
    const gamesIdDb = await Videogame.findOne({
      include: [Genre, Platform],
      where: {
        id: idVideoGame,
      },
    });

    if (gamesIdDb) {
      return { status: 200, game: gamesIdDb };
    } else {
      return { status: 404, message: "Game Not Found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

const getGamesDb = async () => {
  try {
    const gamesDB = await Videogame.findAll({
      include: Genre,
    });
    if (gamesDB.length > 0) {
      return { status: 200, results: gamesDB };
    } else {
      return { status: 404, message: "Request not Found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

//*ES INSENTIVE

const getGamesByNameFromDb = async (name) => {
  try {
    const gameByName = await Videogame.findAll({
      include: Genre,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (gameByName.length > 0) {
      return { status: 200, results: gameByName };
    } else {
      return { status: 404, message: "Request Not found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

const insertVideoGame = async (videoGobject, genres, platforms) => {
  try {
    const gameRegister = await Videogame.create(videoGobject);

    if (gameRegister) {
      await gameRegister.setGenres(JSON.parse(genres));
      await gameRegister.setPlatforms(JSON.parse(platforms));

      return {
        status: 201,
        message: "Register successfully",
        data: gameRegister,
      };
    } else {
      return { status: 204, message: "Oops, Register failed" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

module.exports = {
  insertVideoGame,
  getGamesByNameFromDb,
  getGamesDb,
  GameByIdDB,
};
