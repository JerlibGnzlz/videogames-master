import React from "react";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { resetSearch } from "../actions/index";
import { FaFilter } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({
  handleInputSearch,
  handleSearchClick,
  nameParam,
  handleVisibility,
  genresName,
  setGenresName,
  setGenresParams,
}) {
  const dispatch = useDispatch();
  const handleClickReset = () => {
    for (const key in genresName) {
      setGenresName({
        [key]: false,
      });
    }
    setGenresParams([]);
    dispatch(resetSearch());
  };
  return (
    <div className="search_container">
      <form action="" onSubmit={handleSearchClick}>
        <span className="filter_btn" onClick={handleVisibility}>
          <FaFilter />
        </span>
        <input
          type="text"
          onChange={handleInputSearch}
          value={nameParam}
          required
        />
        <button type="submit">Buscar</button>
        <span className="reset_button" onClick={handleClickReset}>
          <GrUpdate style={{ color: "red" }} className="btnUpdate" />
        </span>
      </form>
    </div>
  );
}

export default SearchBar;
