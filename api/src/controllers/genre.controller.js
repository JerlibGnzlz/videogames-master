const { getGenresFromDb } = require("../helpers/genre.helper");

const getGenres = async (req, res) => {
  // pedir a la base de datos

  const genres = await getGenresFromDb();

  return res.json(genres);
};

module.exports = {
  getGenres,
};
