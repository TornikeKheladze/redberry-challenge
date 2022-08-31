import { ErrorMessage, Field } from "formik";

const InputField = ({ label, type, name, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field type={type} id={name} name={name} placeholder={placeholder} />
      <ErrorMessage name={name}>
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
