import React, { useEffect, useState } from "react";
import {
  getGamesFromBack,
  getSearchGame,
  getGenres,
  getPlatforms,
  filterByGenres,
  resetSearch,
  orderByName,
  orderByRating,
  setPage_Current,
  setDestickeado,
} from "../actions/index";
import { connect } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { GiGameConsole } from "react-icons/gi";
import { IoLogoGameControllerB } from "react-icons/io";
import Sidebar from "../Sidebar/Sidebar";

const Home = ({
  videogames,
  getVideoGames,
  filtered_games,
  getSearchGame,
  getGenres,
  getPlatforms,
  genres,
  platforms,
  filterByGenres,
  filtering,
  resetSearch,
  orderByName,
  orderByRating,
  page_current,
  setPage_Current,
  setDestickeado,
  destickeado,
}) => {
  const gamesForMap =
    filtered_games.length > 0 ? filtered_games : filtering ? false : videogames;
  const currentpage = page_current === 0 ? 1 : page_current;
  const [nameParam, setNameParam] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [asc, setAsc] = useState(true);
  const [ascRat, setAscDescRat] = useState(true);
  const [genresName, setGenresName] = useState({
    Action: false,
    Indie: false,
    Adventure: false,
    RPG: false,
    Strategy: false,
    Shooter: false,
    Casual: false,
    Simulation: false,
    Puzzle: false,
    Arcade: false,
    Platformer: false,
    Racing: false,
    Massively_Multiplayer: true,
    Sports: false,
    Fighting: false,
    Family: false,
    Board_Games: false,
    Educational: false,
    Card: false,
  });
  let [genresParams, setGenresParams] = useState([]);
  const gamesXpage = 15;
  const pagesButtons = [];
  let currentItems;

  const handleReset = () => {
    setGenresParams([]);
    resetSearch();
  };

  const handleOrderAscDescRating = () => {
    setAscDescRat(!ascRat);
    let ordRatParam = ascRat ? 0 : 1;
    orderByRating(ordRatParam, gamesForMap);
  };

  const handleOrderAscDesc = () => {
    setAsc(!asc);
    let ordParam = asc ? 0 : 1;
    orderByName(ordParam, gamesForMap);
  };

  const handleCheckChange = (e) => {
    const { value, checked } = e.target;
    // despachar una accion

    setGenresName({
      ...genresName,
      [value]: checked,
    });
    if (checked) {
      setGenresParams([...genresParams, value]);
    } else {
      setDestickeado();
      genresParams = genresParams.filter((genre) => genre !== value);
      setGenresParams([...genresParams]);
    }
    setPage_Current(0);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClickPage = (e) => {
    const { id } = e.target;
    setPage_Current(parseInt(id));
  };

  const handleInputSearch = (e) => {
    const { value } = e.target;
    setNameParam(value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    getSearchGame(nameParam);
    setNameParam("");
  };

  for (let i = 1; i <= Math.ceil(gamesForMap.length / gamesXpage); i++) {
    pagesButtons.push(i);
  }

  const indexLast = currentpage * gamesXpage;
  const indexFirst = indexLast - gamesXpage;

  currentItems =
    gamesForMap.length > 0 ? gamesForMap.slice(indexFirst, indexLast) : false;

  const renderpageNumber = pagesButtons.map((page, index) => {
    return (
      <li key={page} id={page} onClick={handleClickPage}>
        {page}
      </li>
    );
  });

  useEffect(() => {
    let gameCurrents = destickeado
      ? videogames
      : filtered_games.length > 0
      ? filtered_games
      : videogames;
    if (gameCurrents.length > 0) {
      filterByGenres(genresParams, gameCurrents);
    }
  }, [genresParams]);

  useEffect(() => {
    getVideoGames();
    getGenres();
    getPlatforms();
  }, []);

  return (
    <div className="games_container">
      <nav className="brand_container">
        <Link to="/" className="home_link">
          <GiGameConsole />
          <span>HenryGames</span>
        </Link>
      </nav>
      <Sidebar
        genres={genres}
        platforms={platforms}
        visibility={visibility}
        handleCheckChange={handleCheckChange}
        genresName={genresName}
        asc={asc}
        setAsc={setAsc}
        handleOrderAscDesc={handleOrderAscDesc}
        ascRat={ascRat}
        handleOrderAscDescRating={handleOrderAscDescRating}
        // handleReset={handleReset}
      />
      <Link to="/create/videogame">
        <IoLogoGameControllerB className="add_button" />
      </Link>
      <SearchBar
        handleInputSearch={handleInputSearch}
        handleSearchClick={handleSearchClick}
        nameParam={nameParam}
        handleVisibility={handleVisibility}
        genresName={genresName}
        setGenresName={setGenresName}
        setGenresParams={setGenresParams}
      />
      <div className="pagination_container">
        <ul>{renderpageNumber}</ul>
      </div>
      <div className="games">
        {currentItems ? (
          currentItems.map((game, index) => {
            return (
              <Link
                to={`/game/detail/${game.id}`}
                key={index}
                className="game_card"
              >
                <div className="img_container">
                  <img src={game.image} alt="" />
                </div>
                <h3>{game.rating}</h3>
                <h3>{game.name}</h3>
                <div className="genres">
                  {game.genres.map((genre) => {
                    return <h4 key={genre.id}>{genre.name}</h4>;
                  })}
                </div>
              </Link>
            );
          })
        ) : (
          <h1>404, Not Found</h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    videogames: state.videogames,
    filtered_games: state.filtered_games,
    genres: state.genres,
    platforms: state.platforms,
    filtering: state.filtering,
    page_current: state.page_current,
    destickeado: state.destickeado,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoGames: function () {
      dispatch(getGamesFromBack());
    },
    getSearchGame: function (name) {
      dispatch(getSearchGame(name));
    },
    getGenres: function () {
      dispatch(getGenres());
    },
    getPlatforms: function () {
      dispatch(getPlatforms());
    },
    filterByGenres: function (genresParmas, videogames) {
      dispatch(filterByGenres(genresParmas, videogames));
    },
    resetSearch: function () {
      dispatch(resetSearch());
    },
    orderByName: function (orderParam, games) {
      dispatch(orderByName(orderParam, games));
    },
    orderByRating: function (orderRatParam, games) {
      dispatch(orderByRating(orderRatParam, games));
    },
    setPage_Current: function (page) {
      dispatch(setPage_Current(page));
    },
    setDestickeado: function () {
      dispatch(setDestickeado());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
