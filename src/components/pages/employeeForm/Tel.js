import { Field, ErrorMessage } from "formik";
const Email = () => {
  return (
    <div className="telNum">
      <div>
        <label htmlFor="phone_number">ტელეფონის ნომერი</label>
        <Field
          type="text"
          id="phone_number"
          name="phone_number"
          placeholder="+995 598 00 07 01"
        />
      </div>
      <ErrorMessage name="phone_number">
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Email;
