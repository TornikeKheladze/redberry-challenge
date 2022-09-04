import succes from "../../../assets/succes.png";
import { Link } from "react-router-dom";
const Popup = () => {
  return (
    <div className="popup">
      <div className="inside">
        <img src={succes} alt="succes" />
        <h1>ჩანაწერი დამატებულია!</h1>
        <button className="list">
          <Link to="/laptop/list">სიაში გადაყვანა</Link>
        </button>
        <Link to="/" className="main">
          მთავარი
        </Link>
      </div>
    </div>
  );
};

export default Popup;
