import "./LaptopInfo.scss";
import {
  fetchBrands,
  fetchPositions,
  fetchSingleLaptop,
  fetchTeams,
} from "../../../features/laptopsSlice";
import leftArrow from "../../../assets/left-button.png";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LaptopInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { laptop, user } = useSelector(({ generals }) => generals.singleLaptop);
  const { teams, positions, brands } = useSelector((store) => store.generals);

  useEffect(() => {
    dispatch(fetchSingleLaptop(id));
    dispatch(fetchPositions());
    dispatch(fetchTeams());
    dispatch(fetchBrands());
  }, []);

  const filteredPosition = () => {
    if (user && positions) {
      const [position] = positions.filter((x) => x.id === user.position_id);
      return position;
    }
  };
  const filteredTeam = () => {
    if (user && teams) {
      const [team] = teams.filter((x) => x.id === user.team_id);
      return team;
    }
  };
  const filterBrand = () => {
    if (brands && laptop) {
      const [brand] = brands.filter((x) => x.id === laptop.brand_id);
      return brand;
    }
  };

  const mainInfo = laptop && (
    <div className="mainInfo">
      <img src={`https://pcfy.redberryinternship.ge${laptop.image}`} />
      <div className="ownerInfo">
        <div className="labels">
          <p>სახელი:</p>
          <p>თიმი:</p>
          <p>პოზიცია:</p>
          <p>მეილი:</p>
          <p>ტელ. ნომერი:</p>
        </div>
        <div className="values">
          <p>
            {user.name} {user.surname}
          </p>
          <p>{filteredTeam() && filteredTeam().name}</p>
          <p>{filteredPosition() && filteredPosition().name}</p>
          <p>{user.email}</p>
          <p>{user.phone_number}</p>
        </div>
      </div>
    </div>
  );
  const secondary = laptop && (
    <div className="secondary">
      <div className="labels">
        <p>ლეპტოპის სახელი:</p>
        <p>ლეპტოპის ბრენდი:</p>
        <p>RAM:</p>
        <p>მეხსიერების ტიპი:</p>
      </div>
      <div className="values">
        <p>{laptop.name}</p>
        <p>{filterBrand() && filterBrand().name}</p>
        <p>{laptop.ram}</p>
        <p>{laptop.hard_drive_type}</p>
      </div>
      <div className="cpuLab labels">
        <p>CPU:</p>
        <p>CPU-ს ბირთვი:</p>
        <p>CPU-ს ნაკადი:</p>
      </div>
      <div className="cpuVal values">
        <p>{laptop.cpu.name}</p>
        <p>{laptop.cpu.cores}</p>
        <p>{laptop.cpu.threads}</p>
      </div>
    </div>
  );
  const laptopStateInfo = laptop && (
    <div className="stateInfo">
      <div className="left">
        <div className="labels">
          <p>ლეპტოპის მდგომარეობა:</p>
          <p>ლეპტოპის ფასი:</p>
        </div>
        <div className="values">
          <p>{laptop.state === "used" ? "მეორადი" : "ახალი"}</p>
          <p>{laptop.price}</p>
        </div>
      </div>
      {laptop.purchase_date && (
        <div className="date">
          <p>შეძენის რიცხვი:</p>
          <span>{laptop.purchase_date}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="listHeader">
        <button>
          <Link to="/laptop/list">
            <img src={leftArrow} />
          </Link>
        </button>
        <h1>ლეპტოპის ინფო</h1>
      </div>
      <div className="laptopInfo">
        <>
          {mainInfo}
          {secondary}
          {laptopStateInfo}
        </>
      </div>
    </>
  );
};

export default LaptopInfo;
