import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getPlatforms } from "../actions/index";
import Platforms from "../platforms/Platforms";
import Noimage from "../../assets/noimg.jpg";
import { GiGameConsole } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Videogame.css";

const Videogame = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  const [display, SetDisplay] = useState(false);

  const initialGame = {
    name: "error",
    description: "",
    released: "",
    rating: "",
  };
  // hooks
  const [previewImg, setPreviewImg] = useState(null);
  const [image, setImage] = useState();
  const [gameObj, setGameObj] = useState(initialGame);
  const [checkboxObj, setCheckboxObj] = useState();
  const [platformObj, setPlatformObj] = useState();

  const handleDisplay = () => {
    SetDisplay(false);
  };

  const handleFileChange = (e) => {
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
    setPreviewImg(imgPreview);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setGameObj({
      ...gameObj,
      name: value,
    });
  };

  const handleCkeckboxChange = (e) => {
    const { checked, id } = e.target;
    setCheckboxObj({
      ...checkboxObj,
      [id]: checked,
    });
  };

  const handlePlatformChange = (e) => {
    const { checked, id } = e.target;
    setPlatformObj({
      ...platformObj,
      [id]: checked,
    });
  };

  const getArrayGenres = () => {
    let arrayCheksGenres = [];
    for (const property in checkboxObj) {
      if (checkboxObj[property]) {
        arrayCheksGenres.push(parseInt(property));
      }
    }
    return arrayCheksGenres;
  };

  const getArrayPlatforms = () => {
    let arrayCheksPlatforms = [];
    for (const property in platformObj) {
      if (platformObj[property]) {
        arrayCheksPlatforms.push(parseInt(property));
      }
    }
    return arrayCheksPlatforms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrayChecksGenres = getArrayGenres();
    const arrayChecksPlatforms = getArrayPlatforms();

    const formData = new FormData();

    formData.append("name", gameObj.error);
    formData.append("description", gameObj.description);
    formData.append("released", gameObj.released);
    formData.append("rating", gameObj.rating);

    formData.append("image", image);
    formData.append("genres", JSON.stringify(arrayChecksGenres));
    formData.append("platforms", JSON.stringify(arrayChecksPlatforms));

    //*
    const response = await fetch(`http://localhost:3001/videogame`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.status === 201) {
      SetDisplay(true);
    } else {
      alert("Oops algo paso!!");
    }
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);
  return (
    <div className="register_container">
      <nav className="brand_container">
        <Link to="/home" className="home_link">
          <GiGameConsole />
          <span>HenryGames</span>
        </Link>
      </nav>

      <h1>Registra tu Videogame</h1>
      <main className="register_main">
        <form action="" onSubmit={handleSubmit} className="register_form">
          {/* <div className="global_container" >
          
        </div> */}
          <div className="form_all_controls">
            <div className="form_control">
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Nombre"
              />
            </div>

            <div className="form_control">
              <textarea
                name="description"
                id=""
                cols="30"
                rows="5"
                onChange={handleInputChange}
                placeholder="Descripcion"
                required
              />
            </div>

            <div className="form_control">
              <input
                type="date"
                name="released"
                id=""
                onChange={handleInputChange}
                placeholder="dd/MM/YYYY"
                required
              />
            </div>

            <div className="form_control">
              <input
                type="number"
                name="rating"
                onChange={handleInputChange}
                placeholder="rating"
                required
              />
            </div>

            <div className="form_control">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
              <img
                src={!previewImg ? Noimage : previewImg}
                alt=""
                width="150"
                height="150"
              />
            </div>
          </div>
          <div className="bloque_derecha">
            <div className="bloqueD_header">
              <div className="container_check">
                <h2>Generos</h2>
                {genres.length > 0 ? (
                  genres.map((genre) => {
                    return (
                      <div className="celdas">
                        <label key={genre.id} className="switchBtn">
                          <input
                            type="checkbox"
                            id={genre.id}
                            name={genre.name}
                            onChange={handleCkeckboxChange}
                          />
                          <span className="slide round"></span>
                        </label>
                        <span className="">{genre.name}</span>
                      </div>
                    );
                  })
                ) : (
                  <h2>Sin generos</h2>
                )}
              </div>

              <div className="platforms_container">
                {platforms.length > 0 ? (
                  <Platforms
                    platforms={platforms}
                    handlePlatformChange={handlePlatformChange}
                  />
                ) : (
                  <h2>Sin platforms</h2>
                )}
              </div>
            </div>

            <button type="submit" className="game_btn_reg">
              Guardar{" "}
            </button>
          </div>
        </form>
        <div className={display ? "message_register show" : "message_register"}>
          <span>Registro Exitoso...</span>
          <Link className="btn_home" to="/home">
            Ir al home
          </Link>

          <button className="btn_Here" onClick={handleDisplay}>
            Permanecer Aca...
          </button>
        </div>
      </main>
    </div>
  );
};

export default Videogame;
