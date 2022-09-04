import { Field, ErrorMessage } from "formik";
const Email = () => {
  const validateEmail = (email) => {
    let error;
    if (!email) {
      error = "სავალდებულო";
    } else if (email.slice(-12) !== "@redberry.ge") {
      error = "მეილი უნდა მთავრდებოდეს @redberry.ge";
    }
    return error;
  };
  return (
    <div className="email">
      <div>
        <label htmlFor="email">მეილი</label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="grish666@redberry.ge"
          validate={validateEmail}
        />
      </div>
      <ErrorMessage name="email">
        {(err) => <div style={{ color: "rgba(229, 47, 47, 1)" }}>{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Email;
