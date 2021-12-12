import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing_container">
      <h1 className="title">Wellcome_to_HenryGames </h1>
      <br />
      <Link className="enter" to="/home">
        ENTER
      </Link>
    </div>
  );
};

export default Landing;
