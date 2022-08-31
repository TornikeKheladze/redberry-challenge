import { Field, ErrorMessage } from "formik";

const PositionsDropdown = ({ filteredPositions }) => {
  return (
    <div className="position dropdown">
      <Field as="select" name="position_id" id="position_id">
        <option value="" disabled>
          პოზიცია
        </option>
        {filteredPositions &&
          filteredPositions.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </Field>
      <ErrorMessage name="position_id">
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};
export default PositionsDropdown;
