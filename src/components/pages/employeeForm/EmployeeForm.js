import "./EmployeeForm.scss";
import { Formik, Form } from "formik";
import Header from "../../Header";
import logo from "../../../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions, fetchTeams } from "../../../features/laptopsSlice";
import Email from "./Email";
import Tel from "./Tel";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { submit } from "../../../features/formSlice";
import Dropdown from "../laptopForm/Dropdown";

const EmployeeForm = () => {
  const teams = useSelector((store) => store.generals.teams);
  const positions = useSelector((store) => store.generals.positions);
  const [filteredPositions, setFilteredPositions] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let initialValues = {
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    phone_number: "",
    email: "",
  };
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchPositions());
  }, []);

  useEffect(() => {
    if (data)
      setFilteredPositions(
        positions.filter(
          (position) => Number(data.team_id) === position.team_id
        )
      );
  }, [positions]);

  const onSubmit = (values) => {
    dispatch(submit(values));
    navigate("/info/laptop");
  };
  const data = JSON.parse(localStorage.getItem("employeeForm"));
  if (data) initialValues = data;

  const validate = ({
    name,
    surname,
    team_id,
    position_id,
    phone_number,
    email,
  }) => {
    let error = {};
    let formData = { name, surname, team_id, position_id, phone_number, email };
    localStorage.setItem("employeeForm", JSON.stringify(formData));

    if (!name) {
      error.name = "სავალდებულო";
    } else if (name.length < 2) {
      error.name = "მინიმუმ 2 სიმბოლო";
    }
    // } else if (/^[ა-ჰ]+$/) {
    //   error.name = "შეიყვანეთ მხოლოდ ქართული ასოები";

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

            {teams && (
              <Dropdown
                data={teams}
                className="team dropdown"
                label="თიმი"
                fieldName="team_id"
              />
            )}

            {positions && (
              <Dropdown
                data={filteredPositions}
                className="position dropdown"
                label="პოზიცია"
                fieldName="position_id"
              />
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
