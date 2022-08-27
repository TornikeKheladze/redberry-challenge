import "./App.css";
import { useDispatch } from "react-redux";
import {
  fetchBrands,
  fetchCpus,
  fetchPositions,
  fetchTeams,
} from "./features/laptopsSlice";
import { useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchBrands());
    dispatch(fetchCpus());
    dispatch(fetchPositions());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <h1>redberry</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
