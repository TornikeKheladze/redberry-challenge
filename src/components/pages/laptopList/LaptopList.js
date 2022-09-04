import "./LaptopList.scss";
import { useEffect } from "react";
import { fetchLaptops } from "../../../features/laptopsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import leftArrow from "../../../assets/left-button.png";
import Laptop from "./Laptop";
const LaptopList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaptops());
  }, []);
  const laptops = useSelector(({ generals }) => generals.laptops);
  const renderList =
    laptops && laptops.map((lap) => <Laptop key={lap.laptop.id} data={lap} />);
  return (
    <div className="laptopList">
      <div className="listHeader">
        <button>
          <Link to="/">
            <img src={leftArrow} />
          </Link>
        </button>
        <h1>ჩანაწერების სია</h1>
      </div>
      <div className="renderList">{renderList}</div>
    </div>
  );
};

export default LaptopList;
