import React from "react";
import "./Platforms.css";
const Platforms = ({ platforms, handlePlatformChange }) => {
  return (
    <div className="container_check">
      <h2>Plataformas</h2>
      {platforms.map((platform) => {
        return (
          <div className="celdas">
            <label key={platform.id} className="switchBtn">
              <input
                type="checkbox"
                id={platform.id}
                onChange={handlePlatformChange}
              />
              <span className="slide round"></span>
            </label>
            <span className="">{platform.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Platforms;
