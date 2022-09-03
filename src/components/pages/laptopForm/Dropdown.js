import { Field, ErrorMessage } from "formik";
const Dropdown = ({ data, label, fieldName, className }) => {
  return (
    <div className={className}>
      <Field as="select" name={fieldName} id={fieldName}>
        <option value="" disabled hidden>
          {label}
        </option>
        {data &&
          data.map(({ name, id }) => (
            <option key={id} value={fieldName === "laptop_cpu" ? name : id}>
              {name}
            </option>
          ))}
      </Field>
      <ErrorMessage name={fieldName}>
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Dropdown;
