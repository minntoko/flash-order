import Game from "./pages/Game";
import Home from "./pages/Home";
import Result from "./pages/Result";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/game`} element={<Game />} />
        <Route path={`/result`} element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
