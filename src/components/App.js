import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchBrands,
  fetchCpus,
  fetchPositions,
  fetchTeams,
} from "../features/laptopsSlice";
import { useEffect } from "react";
import Landing from "./pages/landing/Landing";
import EmployeeForm from "./pages/employeeForm/EmployeeForm";
import LaptopForm from "./pages/laptopForm/LaptopForm";
import LaptopInfo from "./pages/laptopInfo/LaptopInfo";
import LaptopList from "./pages/laptopList/LaptopList";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchTeams());
    // dispatch(fetchBrands());
    // dispatch(fetchCpus());
    // dispatch(fetchPositions());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/info/employee" exact element={<EmployeeForm />} />
        <Route path="/info/laptop" exact element={<LaptopForm />} />
        <Route path="/laptop/list" exact element={<LaptopList />} />
        <Route path="/laptop/:id" exact element={<LaptopInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
