import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./EmployeeForm.scss";
import Header from "../../Header";
import logo from "../../../assets/logo.png";
import { fetchPositions, fetchTeams } from "../../../features/laptopsSlice";
import Email from "./Email";
import Tel from "./Tel";
import InputField from "./InputField";
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

  const data = JSON.parse(localStorage.getItem("employeeForm"));

  if (data) initialValues = data;

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("სავალდებულო"),
    surname: Yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("სავალდებულო"),
    position_id: Yup.string().required("სავალდებულო"),
    phone_number: Yup.string().required("სავალდებულო"),
  });

  const getFormValues = (values) => {
    localStorage.setItem("employeeForm", JSON.stringify(values));
  };

  const positionsFilter = (values) => {
    setFilteredPositions(
      positions.filter((position) => Number(values) === position.team_id)
    );
    let error;
    if (!values) error = "სავალდებულო";
    return error;
  };

  const nameValidate = (value) => {
    let error;
    if (!/^[ა-ჰ]+$/.test(value)) error = "შეიყვანეთ მხოლოდ ქართული ასოები";
    return error;
  };

  const onSubmit = (values) => {
    navigate("/info/laptop");
  };

  return (
    <>
      <div className="employeeFormPage">
        <Header active="employee" to="/" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched }) => {
            getFormValues(values);
            return (
              <Form className="employeeForm">
                <div className="fields names">
                  <InputField
                    name="name"
                    type="text"
                    label="სახელი"
                    placeholder="გრიშა"
                    validate={nameValidate}
                    error={touched.name && errors.name}
                  />
                  <InputField
                    name="surname"
                    type="text"
                    label="გვარი"
                    placeholder="ბაგრატიონი"
                    validate={nameValidate}
                    error={touched.surname && errors.surname}
                  />
                </div>

                {teams && (
                  <Dropdown
                    positionsFilter={positionsFilter}
                    data={teams}
                    className="team dropdown"
                    label="თიმი"
                    fieldName="team_id"
                    error={touched.team_id && errors.name}
                  />
                )}

                {positions && (
                  <Dropdown
                    data={filteredPositions}
                    className="position dropdown"
                    label="პოზიცია"
                    fieldName="position_id"
                    error={touched.position_id && errors.name}
                  />
                )}
                <Email error={touched.email && errors.email} />
                <Tel error={touched.phone_number && errors.phone_number} />
                <button className="submitButton" type="submit">
                  შემდეგი
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="employee-logo">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

export default EmployeeForm;
