const { getPlatformsFromDb } = require("../helpers/platform.helper");

const getPlatforms = async (req, res) => {
  const platforms = await getPlatformsFromDb();
  return res.json(platforms);
};

module.exports = {
  getPlatforms,
};
