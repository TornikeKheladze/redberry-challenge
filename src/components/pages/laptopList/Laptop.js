import { Link } from "react-router-dom";

const Laptop = ({ data }) => {
  console.log(data.laptop);
  return (
    <div className="laptop">
      <img
        src={`https://pcfy.redberryinternship.ge${data.laptop.image}`}
        alt="laptop image"
      />
      <div className="listInfo">
        <p>
          {data.user.name} {data.user.surname}
        </p>
        <p className="second">{data.laptop.name}</p>
        <Link to={`/laptop/${data.laptop.id}`}>მეტის ნახვა</Link>
      </div>
    </div>
  );
};

export default Laptop;
