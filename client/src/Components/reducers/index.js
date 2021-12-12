import {
  SET_VIDEOGAMES,
  SET_GENRES,
  SET_PLATFORMS,
  SET_SEARCH,
  RESET_SEARCH,
  SET_FILTERED_GAMES,
  RESET_FILTERING,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_DETAIL_GAME,
  RESET_GAME_DETAIL,
  SET_PAGE_CURRENT,
  SET_DESTICKEADO,
} from "../actions/index";

const initialState = {
  videogames: [],
  genres: [],
  platforms: [],
  filtered_games: [],
  game_detail: null,
  filtering: false,
  page_current: 0,
  destickeado: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_DETAIL_GAME:
      return {
        ...state,
        game_detail: action.payload,
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        filtered_games: action.payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        filtered_games: action.payload,
        filtering: false,
      };
    case SET_FILTERED_GAMES:
      return {
        ...state,
        filtered_games: action.payload,
        filtering: true,
      };
    case RESET_FILTERING:
      return {
        ...state,
        filtered_games: [],
        filtering: false,
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        filtered_games: action.payload,
      };
    case ORDER_BY_RATING:
      return {
        ...state,
        filtered_games: action.payload,
      };
    case RESET_GAME_DETAIL:
      return {
        ...state,
        game_detail: null,
      };
    case SET_PAGE_CURRENT:
      return {
        ...state,
        page_current: action.payload,
      };
    case SET_DESTICKEADO:
      return {
        ...state,
        destickeado: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
