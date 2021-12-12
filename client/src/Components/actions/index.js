export const SET_VIDEOGAMES = "SET_VIDEOGAMES";
export const SET_GENRES = "SET_GENRES";
export const SET_PLATFORMS = "SET_PLATFORMS";
export const SET_SEARCH = "SET_SEARCH";
export const RESET_SEARCH = "RESET_SEARCH";
export const SET_FILTERED_GAMES = "SET_FILTERED_GAMES";
export const RESET_FILTERING = "RESET_FILTERING";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_DETAIL_GAME = "GET_DETAIL_GAME";
export const RESET_GAME_DETAIL = "RESET_GAME_DETAIL";
export const SET_PAGE_CURRENT = "SET_PAGE_CURRENT";
export const SET_DESTICKEADO = "SET_DESTICKEADO";

export const getGamesFromBack = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/videogames`);
    const data = await response.json();
    if (data) {
      return dispatch({
        type: SET_VIDEOGAMES,
        payload: data.results,
      });
    }
  };
};

export const getGameDetail = (idGame) => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/videogame/${idGame}`);
    const data = await response.json();
    console.log("detail", data);
    if (data) {
      return dispatch({
        type: GET_DETAIL_GAME,
        payload: data.status ? null : data,
      });
    }
  };
};

//* funcion para traer generos

export const getGenres = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/genres`);
    const data = await response.json();
    return dispatch({
      type: SET_GENRES,
      payload: data.status === 200 ? data.results : [],
    });
  };
};
//*funcion para tener plataformas

export const getPlatforms = () => {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/platforms`);
    const data = await response.json();
    return dispatch({
      type: SET_PLATFORMS,
      payload: data.status === 200 ? data.results : [],
    });
  };
};

export const getSearchGame = (name) => {
  return async function (dispatch) {
    const response = await fetch(
      `http://localhost:3001/videogames?name=${name}`
    );
    const data = await response.json();

    return dispatch({
      type: SET_SEARCH,
      payload: [...data.fromApi, ...data.fromDb],
    });
  };
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
    payload: [],
  };
};

const buildArray = (genres) => {
  const genresResults = genres.map((genre) => genre.name);
  return genresResults;
};

const GamesFilter = (genresParams, videogames) => {
  // ["action","strategy","indie"]
  //
  // console.log("llega", genresParams, videogames);
  const results = videogames.filter((game) => {
    // [{id:lslslssl, name:"action"}]
    // ["action","indie"]
    const generos = buildArray(game.genres);

    const res = genresParams.every((genre) => generos.includes(genre));
    return res;
  });
  return results;
};

export const filterByGenres = (genresParams, videogames) => {
  const filteredResults = GamesFilter(genresParams, videogames);
  return {
    type: SET_FILTERED_GAMES,
    payload: filteredResults,
    payloadBack: videogames,
  };
};

export const resetFiltering = () => {
  return {
    type: "RESET_FILTERING",
  };
};

const orderFunction = (orderParam, games) => {
  let results;
  if (orderParam > 0) {
    results = games.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
  } else {
    results = games.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
  }
  return results;
};

export const orderByName = (orderParam, games) => {
  const results = orderFunction(orderParam, games);
  return {
    type: ORDER_BY_NAME,
    payload: results,
  };
};

const orderRatFunction = (orderRatParam, games) => {
  let results;
  if (orderRatParam > 0) {
    results = games.sort((a, b) => {
      if (a.rating > b.rating) return 1;
      if (a.rating < b.rating) return -1;
      return 0;
    });
  } else {
    results = games.sort((a, b) => {
      if (a.rating < b.rating) return 1;
      if (a.rating > b.rating) return -1;
      return 0;
    });
  }
  return results;
};
export const orderByRating = (orderRatParam, games) => {
  const results = orderRatFunction(orderRatParam, games);
  return {
    type: ORDER_BY_RATING,
    payload: results,
  };
};

export const resetGameDetail = () => {
  return {
    type: RESET_GAME_DETAIL,
  };
};

export const setPage_Current = (page) => {
  return {
    type: SET_PAGE_CURRENT,
    payload: page,
  };
};

export const setDestickeado = () => {
  return {
    type: SET_DESTICKEADO,
    payload: true,
  };
};
