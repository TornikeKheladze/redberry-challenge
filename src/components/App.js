import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import EmployeeForm from "./pages/employeeForm/EmployeeForm";
import LaptopForm from "./pages/laptopForm/LaptopForm";
import LaptopInfo from "./pages/laptopInfo/LaptopInfo";
import LaptopList from "./pages/laptopList/LaptopList";

function App() {
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
