const { Platform } = require("../db");

const getPlatformsFromDb = async () => {
  try {
    const platformsDb = await Platform.findAll();

    if (platformsDb) {
      return { status: 200, results: platformsDb };
    } else {
      return { status: 404, message: "Not found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

module.exports = {
  getPlatformsFromDb,
};
