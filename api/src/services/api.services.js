require("dotenv").config();
const { ALL_GAMES, API_KEY, BY_NAME, BY_ID, ALL_GENRES } = process.env;
const axios = require("axios");

const GameByIdFromApi = async (idVideogame) => {
  const response = await axios(`${BY_ID}${idVideogame}?key=${API_KEY}`);
  if (response) {
    const objetoVideoGame = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      metacritic: response.data.metacritic,
      released: response.data.released,
      background: response.data.background_image,
      background_two: response.data.background_image_additional,
      rating: response.data.rating,
      platforms: response.data.platforms,
      genres: response.data.genres,
      description_raw: response.data.description_raw,
    };
    return objetoVideoGame;
  } else {
    return { status: 404, message: "Id not foubd" };
  }
};
const getGamesByNameFromApi = async (name) => {
  const response = await axios(
    `${BY_NAME}search=${name}&key=${API_KEY}&page_size=15`
  );
  if (response) {
    // resuelto a "mano"
    // if (response.data.results.length > 15) {
    //   const resultado = [...response.data.results].slice(0, 15);
    //   console.log(resultado.length);
    // }
    const gamesCollection = response.data.results.map((game) => {
      const objeto = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres,
      };
      return objeto;
    });

    return gamesCollection;
  } else {
    return { status: 404, message: "Game Not Found" };
  }
};

const getGamesApi = async () => {
  // &page_size=34
  let results = [];
  let response = await axios(`${ALL_GAMES}?key=${API_KEY}`);
  if (response) {
    results = [...results, ...response.data.results];

    for (let i = 0; i < 4; i++) {
      response = await axios(response.data.next);
      results = [...results, ...response.data.results];
    }

    const allGamesResults = await Promise.all(results);
    const gamesCollection = allGamesResults.map((game) => {
      const objeto = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating_top,
        genres: game.genres,
      };
      return objeto;
    });
    return gamesCollection;
  }

  return { message: "OOps algo fallo!" };

  // if (response) {
  //   let allGamesResults;
  //   const nextRequest = await axios(response.data.next);
  //   if (nextRequest) {
  //     const nextTwenty = await axios(nextRequest.data.next);
  //     if (nextTwenty) {
  //       allGamesResults = [
  //         ...response.data.results,
  //         ...nextRequest.data.results,
  //         ...nextTwenty.data.results,
  //       ];
  //       const gamesCollection = allGamesResults.map((game) => {
  //         const objeto = {
  //           id: game.id,
  //           name: game.name,
  //           image: game.background_image, //background_
  //           rating: game.rating_top,
  //           genres: game.genres,
  //         };
  //         return objeto;
  //       });
  //       return gamesCollection;
  //     }
  //   }
  // }
  // return { message: "OOps algo fallo!" };
};

const buildGenres = (genres) => {
  const genresResults = genres.map((genre) => {
    return {
      id: genre.id,
      name: genre.name,
    };
  });
  return genresResults;
};

const getGenresFromApi = async () => {
  try {
    const response = await axios(`${ALL_GENRES}key=${API_KEY}`);
    if (response) {
      const genres = buildGenres(response.data.results);
      return genres;
    } else {
      return { status: 404, message: "Genres not found" };
    }
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getGamesApi,
  getGamesByNameFromApi,
  GameByIdFromApi,
  getGenresFromApi,
};
