import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as Yup from "yup";

import "./LaptopForm.scss";
import {
  createLaptop,
  fetchBrands,
  fetchCpus,
} from "../../../features/laptopsSlice";
import logo from "../../../assets/logo.png";
import camera from "../../../assets/camera.png";
import ImageInput from "./ImageInput";
import InputField from "../employeeForm/InputField";
import Header from "../../Header";
import Dropdown from "./Dropdown";
import RadioInput from "./RadioInput";
import { submit } from "../../../features/formSlice";

const LaptopForm = () => {
  const dispatch = useDispatch();
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
  const employeeFormData = useSelector(({ formData }) => formData.formData);

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
  });

  // const validate = ({
  //   laptop_cpu,
  //   laptop_brand_id,
  //   laptop_name,
  //   laptop_image,
  //   laptop_cpu_cores,
  //   laptop_cpu_threads,
  //   laptop_ram,
  //   laptop_hard_drive_type,
  //   laptop_state,
  //   laptop_price,
  // }) => {
  //   let error = {};
  //   let formData = {
  //     laptop_cpu,
  //     laptop_brand_id,
  //     laptop_name,
  //     laptop_cpu_cores,
  //     laptop_cpu_threads,
  //     laptop_ram,
  //     laptop_hard_drive_type,
  //     laptop_state,
  //     laptop_price,
  //   };
  //   localStorage.setItem("laptopForm", JSON.stringify(formData));

  //   if (!laptop_name || laptop_name.length < 2) {
  //     error.laptop_name = "სავალდებულო";
  //   }
  //   if (!laptop_brand_id) {
  //     error.laptop_brand_id = "სავალდებულო";
  //   }
  //   if (!laptop_cpu) {
  //     error.laptop_cpu = "სავალდებულო";
  //   }
  //   if (!laptop_cpu_cores) {
  //     error.laptop_cpu_cores = "სავალდებულო";
  //   }
  //   if (!laptop_cpu_threads) {
  //     error.laptop_cpu_threads = "სავალდებულო";
  //   }
  //   if (!laptop_ram) {
  //     error.laptop_ram = "სავალდებულო";
  //   }
  //   if (!laptop_hard_drive_type) {
  //     error.laptop_hard_drive_type = "სავალდებულო";
  //   }
  //   if (!laptop_state) {
  //     error.laptop_state = "სავალდებულო";
  //   }
  //   if (!laptop_price) {
  //     error.laptop_price = "სავალდებულო";
  //   }
  //   if (!laptop_image) {
  //     error.laptop_image = "სავალდებულო";
  //   }

  //   return error;
  // };

  const data = JSON.parse(localStorage.getItem("laptopForm"));
  if (data) initialValues = data;

  const onSubmit = (values) => {
    const allValues = { ...employeeFormData, ...values };
    let data = new FormData();
    Object.keys(allValues).forEach((key) => {
      data.append(key, allValues[key]);
    });
    dispatch(createLaptop(allValues));
    localStorage.clear("form");
  };

  return (
    <>
      <div className="laptopFormPage">
        <Header active="laptop" to="/info/employee" />
        <Formik
          initialValues={initialValues}
          // validate={validate}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form id="forma">
              <div className="imageInput">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("laptop_image", event.currentTarget.files[0]);
                  }}
                />
                {/* <Field name="laptop_image">
                {(val) => {
                  console.log({ val });
                  return (
                    <>
                      <div className="mobileView">
                        <img src={camera} alt="camera" />
                      </div>
                      <p className="mobileView">ლეპტოპის ფოტოს ატვირთვა</p>
                      <p className="desktopView">
                        ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                      </p>
                      <button type="button" className="desktopView">
                        ატვირთე
                        <input type="file" className="desktopView" />
                      </button>
                    </>
                  );
                }}
              </Field> */}
              </div>
              <div className="fields">
                <InputField
                  name="laptop_name"
                  type="text"
                  label="ლეპტოპის სახელი"
                  placeholder="HP"
                />
                {brands && (
                  <Dropdown
                    data={brands}
                    label="ლეპტოპის ბრენდი"
                    fieldName="laptop_brand_id"
                  />
                )}
              </div>
              <div className="cpus">
                {cpus && (
                  <Dropdown data={cpus} label="CPU" fieldName="laptop_cpu" />
                )}
                <InputField
                  type="text"
                  name="laptop_cpu_cores"
                  label="CPU-ს ბირთვი"
                  placeholder="14"
                />
                <InputField
                  type="text"
                  name="laptop_cpu_threads"
                  label="CPU-ს ნაკადი"
                  placeholder="365"
                />
              </div>
              <div className="rams">
                <InputField
                  type="text"
                  label="ლეპტოპის RAM (GB)"
                  placeholder="16"
                  name="laptop_ram"
                  className="ram"
                />
                <div className="memory">
                  <RadioInput
                    name="laptop_hard_drive_type"
                    label="მეხსიერების ტიპი"
                    value1="SSD"
                    value2="HDD"
                    label1="SSD"
                    label2="HDD"
                  />
                </div>
              </div>
              <div className="price rams">
                {/* თარიღი სწორად */}
                <InputField
                  type="text"
                  placeholder="დდ/თთ/წწწწ"
                  label="შეძენის რიცხვი (არჩევითი)"
                  name="laptop_purchase_date"
                  className="ram"
                />
                <InputField
                  type="text"
                  placeholder="0000"
                  label="ლეპტოპის ფასი"
                  name="laptop_price"
                  className="ram"
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
                />
              </div>
              <div className="buttons">
                <button className="goBack" type="button">
                  უკან
                </button>
                <button className="submitBtn" type="submit">
                  დამახსოვრება
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="employee-logo">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

export default LaptopForm;
