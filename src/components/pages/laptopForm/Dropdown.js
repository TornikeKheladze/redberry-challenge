import { Field } from "formik";

const Dropdown = ({
  data,
  label,
  fieldName,
  className,
  positionsFilter,
  error,
}) => {
  return (
    <div className={className} id={error && "ERROR"}>
      <Field
        as="select"
        name={fieldName}
        id={fieldName}
        validate={positionsFilter && positionsFilter}
      >
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
    </div>
  );
};

export default Dropdown;
