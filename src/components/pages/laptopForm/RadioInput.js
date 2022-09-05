import { Field } from "formik";
import errorImg from "../../../assets/error.png";

const RadioInput = ({ name, label, value1, value2, label1, label2, error }) => {
  return (
    <Field name={name}>
      {({ field }) => {
        return (
          <>
            <label htmlFor={name} id={error && "ERROR"}>
              {label}
              {error && <img src={errorImg} style={{ marginLeft: "14px" }} />}
            </label>
            <div>
              <div>
                <input type="radio" id={value1} {...field} value={value1} />
                <label htmlFor={value1}>{label1}</label>
              </div>
              <div>
                <input type="radio" id={value2} {...field} value={value2} />
                <label htmlFor={value2}>{label2}</label>
              </div>
            </div>
          </>
        );
      }}
    </Field>
  );
};
export default RadioInput;
