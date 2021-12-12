import React, { useEffect } from "react";
import { getGameDetail, resetGameDetail } from "../actions/index";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import backgroundEs from "../../assets/back-estandar.jpg";
import "./GameDetail.css";

const GameDetail = () => {
  const { idGame } = useParams();
  const game_detail = useSelector((state) => state.game_detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetail(idGame));
    return () => {
      dispatch(resetGameDetail());
    };
  }, []);

  return (
    <div
      className="detail_container"
      style={{
        backgroundImage: `url(${
          game_detail?.background ? game_detail?.background : backgroundEs
        })`,
      }}
    >
      <div>
        <Link to="/home">
          <h1 className="link_detalle">Detail Game</h1>
        </Link>
      </div>
      <div className="detail_info">
        {!game_detail ? (
          <h1>no game yet!!</h1>
        ) : (
          <div className="detail_data">
            <div className="detail_header">
              <div className="image_detail">
                <img
                  src={
                    game_detail.background_two
                      ? game_detail.background_two
                      : game_detail.image
                  }
                  alt=""
                />
              </div>
              <div className="image_title">
                <h1>{game_detail.name}</h1>

                <h1>Genres</h1>
                {game_detail.genres.map((genre) => {
                  return <h3> {genre.name} </h3>;
                })}

                <h1>Platforms</h1>
                {game_detail.platforms.map((platform) => {
                  return <h3> {platform.name} </h3>;
                })}
              </div>
            </div>
            <div className="detail_description">
              <h2>Description:</h2>
              <p className="description_field">
                {game_detail.description?.replace(/<[^>]*>?/gm, "")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
