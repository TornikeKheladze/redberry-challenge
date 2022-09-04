import { Link } from "react-router-dom";

import landingImage from "../../../assets/landing.png";
import landingLogo from "../../../assets/landing-logo.png";
import landingMobile from "../../../assets/landing-mobile.png";

import "./Landing.scss";

const Landing = () => {
  return (
    <div className="landing">
      <div className="logo">
        <img src={landingLogo} alt="redberry_logo" />
      </div>
      <div className="landing-image desktop">
        <img src={landingImage} alt="landing_img" />
      </div>
      <div className="mobile">
        <img src={landingMobile} />
      </div>
      <div className="buttons">
        <button>
          <Link to="/info/employee">ჩანაწერის დამატება</Link>
        </button>
        <button>
          <Link to="laptop/list">ჩანაწერების სია</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
