import { Field, ErrorMessage } from "formik";

const TeamDropdown = ({ teams }) => {
  return (
    <div className="team dropdown">
      <Field as="select" name="team_id" id="team_id">
        <option value="" disabled>
          თიმი
        </option>
        {teams.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="team_id">
        {(err) => <div className="error">{err}</div>}
      </ErrorMessage>
    </div>
  );
};

export default TeamDropdown;
