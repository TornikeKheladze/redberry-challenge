import { ErrorMessage, Field } from "formik";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  className,
  validate,
  error,
}) => {
  return (
    <div className={className} id={error && "ERROR"}>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        validate={validate && validate}
      />
      <ErrorMessage name={name}>
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
