import { Link } from "react-router-dom";

import leftButton from "../assets/left-button.png";
import "./Header.scss";

const Header = ({ active, to }) => {
  return (
    <header className="header">
      <Link to={to}>
        <button className="btn back mobile-none">
          <img src={leftButton} />
        </button>
      </Link>

      <div className="headers">
        <h3 className={active === "employee" ? "active" : "none"}>
          თანამშრომლის ინფო
        </h3>
        <h3 className={active === "laptop" ? "active" : "none"}>
          ლეპტოპის მახასიათებლები
        </h3>
      </div>
      <p className="only-mobile">{active === "employee" ? "1/2" : "2/2"}</p>
    </header>
  );
};

export default Header;
