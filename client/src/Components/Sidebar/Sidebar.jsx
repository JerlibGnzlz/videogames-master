import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  genres,
  platforms,
  visibility,
  handleCheckChange,
  genresName,
  asc,
  handleOrderAscDesc,
  ascRat,
  handleOrderAscDescRating,
}) => {
  return (
    <div
      className={
        visibility ? "sidebar_container showSide" : "sidebar_container"
      }
    >
      <div className="order_container">
        <div className="order_name">
          <h2>Ordenamiento</h2>

          <button className="order_btn" onClick={handleOrderAscDesc}>
            {asc ? "Z-A" : "A-Z"}
          </button>
        </div>

        <div className="order_rat">
          <h2>Por Rating</h2>
          <button className="order_btn" onClick={handleOrderAscDescRating}>
            {ascRat ? "5-0" : "0-5"}
          </button>
        </div>
      </div>
      <div className="genres_containerS">
        <h2>Genres</h2>
        {genres.length > 0 ? (
          genres.map((genre) => (
            <div key={genre.id} className="genre_chekbox">
              <input
                type="checkbox"
                value={genre.name}
                checked={
                  genresName[genre.name] ? genresName[genre.name] : false
                }
                className="checkgenre"
                onChange={handleCheckChange}
              />
              <span>{genre.name}</span>
            </div>
          ))
        ) : (
          <h3>sin generos</h3>
        )}
      </div>
      <div className="platforms_containerS">
        <h2>Platforms</h2>

        {platforms.length > 0 ? (
          platforms.map((platform) => (
            <div key={platform.id} className="platform_checkbox">
              <input
                type="checkbox"
                value={platform.name}
                className="checkplatform"
              />
              <span>{platform.name}</span>
            </div>
          ))
        ) : (
          <h3>sin plataformas</h3>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
