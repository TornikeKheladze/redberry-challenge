import { useEffect } from "react";
import { fetchLaptops } from "../../../features/laptopsSlice";
import { useDispatch, useSelector } from "react-redux";
import Laptop from "./Laptop";
const LaptopList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaptops());
  }, []);
  const laptops = useSelector(({ generals }) => generals.laptops);
  console.log(laptops);
  const renderList =
    laptops && laptops.map((lap) => <Laptop key={lap.laptop.id} data={lap} />);
  return <div>{renderList}</div>;
};
export default LaptopList;
