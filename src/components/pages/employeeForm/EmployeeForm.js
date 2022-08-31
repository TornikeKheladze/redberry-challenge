import "./EmployeeForm.scss";
import { Formik, Form } from "formik";
import Header from "../../Header";
import logo from "../../../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions, fetchTeams } from "../../../features/laptopsSlice";
import Email from "./Email";
import Tel from "./Tel";
import TeamDropdown from "./TeamDropdown";
import PositionsDropdown from "./PositionsDropdown";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { submit } from "../../../features/formSlice";

const EmployeeForm = () => {
  const [filteredPositions, setFilteredPositions] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchPositions());
  }, []);

  const teams = useSelector((store) => store.generals.teams);
  const positions = useSelector((store) => store.generals.positions);
  const initialValues = {
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    phone_number: "",
    email: "",
  };

  const onSubmit = (values) => {
    dispatch(submit(values));
    navigate("/info/laptop");
  };

  const validate = ({
    name,
    surname,
    team_id,
    position_id,
    phone_number,
    email,
  }) => {
    let error = {};

    if (!name) {
      error.name = "სავალდებულო";
    } else if (name.length < 2) {
      error.name = "მინიმუმ 2 სიმბოლო";
    }

    if (!surname) {
      error.surname = "სავალდებულო";
    } else if (surname.length < 2) {
      error.surname = "მინიმუმ 2 სიმბოლო";
    }
    if (!team_id) {
      error.team_id = "სავალდებულო";
    } else {
      setFilteredPositions(
        positions.filter((position) => Number(team_id) === position.team_id)
      );
    }
    if (!position_id) {
      error.position_id = "სავალდებულო";
    }
    if (!email) {
      error.email = "სავალდებულო";
    } else if (email.slice(-12) !== "@redberry.ge") {
      error.email = "მეილი უნდა მთავრდებოდეს @redberry.ge";
    }
    if (!phone_number) {
      error.phone_number = "სავალდებულო";
    } else if (
      phone_number.slice(0, 4) !== "+995" ||
      phone_number.length !== 13
    ) {
      error.phone_number = "გთხოვთ შეიყვანოთ ვალიდური ნომერი (+995*******) ";
    }

    return error;
  };

  return (
    <>
      <div className="employeeFormPage">
        <Header active="employee" to="/" />
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form className="employeeForm">
            <div className="fields names">
              <InputField
                name="name"
                type="text"
                label="სახელი"
                placeholder="გრიშა"
              />
              <InputField
                name="surname"
                type="text"
                label="გვარი"
                placeholder="ბაგრატიონი"
              />
            </div>

            {teams && <TeamDropdown teams={teams} />}

            {positions && (
              <PositionsDropdown filteredPositions={filteredPositions} />
            )}
            <Email />
            <Tel />

            <button className="submitButton" type="submit">
              შემდეგი
            </button>
          </Form>
        </Formik>
      </div>
      <div className="employee-logo">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

export default EmployeeForm;
