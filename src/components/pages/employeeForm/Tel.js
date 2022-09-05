import { Field, ErrorMessage } from "formik";
const Email = ({ error }) => {
  const phoneValidate = (value) => {
    let error;
    if (!value) {
      error = "სავალდებულო";
    } else if (value.slice(0, 4) !== "+995" || value.length !== 13) {
      error = "გთხოვთ შეიყვანოთ ვალიდური ნომერი (+995*******) ";
    }
    return error;
  };
  return (
    <div className="telNum" id={error && "ERROR"}>
      <div>
        <label htmlFor="phone_number">ტელეფონის ნომერი</label>
        <Field
          validate={phoneValidate}
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
