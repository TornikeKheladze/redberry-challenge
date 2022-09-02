import { Field, ErrorMessage } from "formik";

const RadioInput = ({ name, label, value1, value2, label1, label2 }) => {
  return (
    <>
      <Field name={name}>
        {({ field }) => {
          return (
            <>
              <label htmlFor={name}>{label}</label>
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
      <ErrorMessage name={name}>
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </>
  );
};
export default RadioInput;
