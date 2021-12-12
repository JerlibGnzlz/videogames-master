const { Genre } = require("../db");
const { getGenresFromApi } = require("../services/api.services");

const getGenresFromDb = async () => {
  try {
    const genreDb_size = await Genre.count();
    if (genreDb_size === 0) {
      const genresApi = await getGenresFromApi();
      await Genre.bulkCreate(genresApi);
    }

    const genres = await Genre.findAll();
    return { status: 200, results: genres };
  } catch (error) {
    return { status: 500, error };
  }
};

module.exports = {
  getGenresFromDb,
};
