import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import Videogame from "./Components/Videogame/Videogame";
import GameDetail from "./Components/GameDetail/GameDetail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create/videogame" element={<Videogame />} />
        <Route path="/game/detail/:idGame" element={<GameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
