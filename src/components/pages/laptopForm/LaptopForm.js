import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import "./LaptopForm.scss";
import {
  createLaptop,
  fetchBrands,
  fetchCpus,
} from "../../../features/laptopsSlice";

import checked from "../../../assets/done.png";
import logo from "../../../assets/logo.png";
import camera from "../../../assets/camera.png";
import errorImg from "../../../assets/error.png";

import InputField from "../employeeForm/InputField";
import Header from "../../Header";
import Dropdown from "./Dropdown";
import RadioInput from "./RadioInput";
import Popup from "./Popup";
import { Link } from "react-router-dom";

const LaptopForm = () => {
  const dispatch = useDispatch();
  const [laptopImage, setLaptopImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  let initialValues = {
    laptop_brand_id: "",
    laptop_name: "",
    laptop_image: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: "",
  };

  useEffect(() => {
    dispatch(fetchCpus());
    dispatch(fetchBrands());
  }, []);

  const cpus = useSelector(({ generals }) => generals.cpus);
  const brands = useSelector(({ generals }) => generals.brands);

  const validationSchema = Yup.object({
    laptop_cpu: Yup.string().required("სავალდებულო"),
    laptop_brand_id: Yup.string().required("სავალდებულო"),
    laptop_name: Yup.string().required("სავალდებულო"),
    laptop_image: Yup.string().required("სავალდებულო"),
    laptop_cpu_cores: Yup.string().required("სავალდებულო"),
    laptop_cpu_threads: Yup.string().required("სავალდებულო"),
    laptop_ram: Yup.string().required("სავალდებულო"),
    laptop_hard_drive_type: Yup.string().required("სავალდებულო"),
    laptop_state: Yup.string().required("სავალდებულო"),
    laptop_price: Yup.string().required("სავალდებულო"),
    laptop_image: Yup.string().required("სავალდებულო"),
  });

  const data = JSON.parse(localStorage.getItem("laptopForm"));
  if (data) initialValues = data;
  console.log();
  const onSubmit = (values) => {
    const allValues = {
      ...JSON.parse(localStorage.getItem("employeeForm")),
      ...values,
    };
    let data = new FormData();
    Object.keys(allValues).forEach((key) => {
      data.append(key, allValues[key]);
    });
    dispatch(createLaptop(allValues));
    localStorage.clear("laptopForm");
    localStorage.clear("employeeForm");
    setShowPopup(true);
  };
  const getFormValues = (values) => {
    localStorage.setItem("laptopForm", JSON.stringify(values));
  };
  const laptopNameValidate = (value) => {
    let error;
    if (!/^[a-zA-Z]+$/.test(value))
      error = "შეიყვანეთ მხოლოდ ლათინური სიმბოლოები";
    return error;
  };

  return showPopup ? (
    <Popup />
  ) : (
    <>
      <div className="laptopFormPage">
        <Header active="laptop" to="/info/employee" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => {
            getFormValues(values);
            return (
              <Form>
                {laptopImage && (
                  <img src={laptopImage.url} className="uploadedImage" />
                )}
                <div
                  className={`imageInput ${laptopImage && "hide"}`}
                  id={
                    touched.laptop_image && errors.laptop_image && "imageError"
                  }
                >
                  <Field name="laptop_image">
                    {() => {
                      return (
                        <>
                          <div className="mobileView">
                            <img src={camera} alt="camera" />
                          </div>
                          <label htmlFor="file" className="mobileView">
                            ლეპტოპის ფოტოს ატვირთვა
                            {touched.laptop_image && errors.laptop_image && (
                              <img src={errorImg} />
                            )}
                          </label>

                          <p className="p">
                            {touched.laptop_image && errors.laptop_image && (
                              <img src={errorImg} />
                            )}
                            ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                          </p>
                          <label htmlFor="file" className="desktopView">
                            ატვირთე
                            <input
                              id="file"
                              name="file"
                              type="file"
                              onChange={(event) => {
                                const lpImg = {
                                  url: URL.createObjectURL(
                                    event.currentTarget.files[0]
                                  ),
                                  file: event.currentTarget.files[0],
                                };
                                setLaptopImage(lpImg);
                                setFieldValue(
                                  "laptop_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </label>
                        </>
                      );
                    }}
                  </Field>
                </div>

                {laptopImage && laptopImage.file && (
                  <div className="uploaded">
                    <div>
                      <img src={checked} />
                      {laptopImage.file.name}
                    </div>
                    <label htmlFor="file"> თავიდან ატვირთე</label>
                  </div>
                )}

                <div className="fields">
                  <InputField
                    name="laptop_name"
                    type="text"
                    label="ლეპტოპის სახელი"
                    placeholder="HP"
                    error={touched.laptop_name && errors.laptop_name}
                    validate={laptopNameValidate}
                  />
                  {brands && (
                    <Dropdown
                      data={brands}
                      label="ლეპტოპის ბრენდი"
                      fieldName="laptop_brand_id"
                      error={touched.laptop_brand_id && errors.laptop_brand_id}
                    />
                  )}
                </div>
                <div className="cpus">
                  {cpus && (
                    <Dropdown
                      data={cpus}
                      label="CPU"
                      fieldName="laptop_cpu"
                      error={touched.laptop_cpu && errors.laptop_cpu}
                      className="firstDropDown"
                    />
                  )}
                  <InputField
                    type="number"
                    name="laptop_cpu_cores"
                    label="CPU-ს ბირთვი"
                    placeholder="14"
                    error={touched.laptop_cpu_cores && errors.laptop_cpu_cores}
                  />
                  <InputField
                    type="number"
                    name="laptop_cpu_threads"
                    label="CPU-ს ნაკადი"
                    placeholder="365"
                    error={
                      touched.laptop_cpu_threads && errors.laptop_cpu_threads
                    }
                  />
                </div>
                <div className="rams">
                  <InputField
                    type="number"
                    label="ლეპტოპის RAM (GB)"
                    placeholder="16"
                    name="laptop_ram"
                    className="ram"
                    error={touched.laptop_ram && errors.laptop_ram}
                  />
                  <div className="memory">
                    <RadioInput
                      name="laptop_hard_drive_type"
                      label="მეხსიერების ტიპი"
                      value1="SSD"
                      value2="HDD"
                      label1="SSD"
                      label2="HDD"
                      error={
                        touched.laptop_hard_drive_type &&
                        errors.laptop_hard_drive_type
                      }
                    />
                  </div>
                </div>
                <div className="price rams">
                  <InputField
                    type="date"
                    placeholder="დდ/თთ/წწწწ"
                    label="შეძენის რიცხვი (არჩევითი)"
                    name="laptop_purchase_date"
                    className="ram"
                  />
                  <InputField
                    type="number"
                    placeholder="0000"
                    label="ლეპტოპის ფასი"
                    name="laptop_price"
                    className="ram"
                    error={touched.laptop_price && errors.laptop_price}
                  />
                </div>
                <div className="laptopState">
                  <RadioInput
                    name="laptop_state"
                    label="ლეპტოპის მდგომარეობა"
                    value1="new"
                    value2="used"
                    label1="ახალი"
                    label2="მეორადი"
                    error={touched.laptop_state && errors.laptop_state}
                  />
                </div>
                <div className="buttons">
                  <button className="goBack" type="button">
                    <Link to="/info/employee">უკან</Link>
                  </button>
                  <button className="submitBtn" type="submit">
                    დამახსოვრება
                  </button>
                </div>
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

export default LaptopForm;
