import { Field, ErrorMessage } from "formik";
const Email = () => {
  return (
    <div className="email">
      <div>
        <label htmlFor="email">მეილი</label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="grish666@redberry.ge"
        />
      </div>
      <ErrorMessage name="email">
        {(err) => <div style={{ color: "rgba(229, 47, 47, 1)" }}>{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Email;
