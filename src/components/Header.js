import leftButton from "../assets/left-button.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ active, to }) => {
  return (
    <header className="header">
      <Link to={to}>
        <button className="btn back">
          <img src={leftButton} />
        </button>
      </Link>
      <div className="headers">
        <h3 className={active === "employee" ? "active" : ""}>
          თანამშრომლის ინფო
        </h3>
        <h3 className={active === "laptop" ? "active" : ""}>
          ლეპტოპის მახასიათებლები
        </h3>
      </div>
    </header>
  );
};

export default Header;
