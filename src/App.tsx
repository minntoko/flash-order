import Game from "./pages/Game";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Select from "./pages/Select";
import "./styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path={`/`} element={<Home />} />
        <Route path={`/select`} element={<Select />} />
        <Route path={`/game`} element={<Game />} />
        <Route path={`/result`} element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
