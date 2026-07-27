function StudentForm({
  age,
  first_name,
  setFirstName,
  last_name,
  add,
  setLastName,
  email,
  setEmail,
  fromUpdate,
  setAge,
}) {
  return (
    <form className="student-form" onSubmit={add}>
      <label htmlFor="FirstName" className="field-label">
        Enter the first name{" "}
      </label>
      <input
        value={first_name}
        className="student-input"
        type="text"
        name="FirstName"
        required
        maxLength={15}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="LastName" className="field-label">
        Enter the last name{" "}
      </label>
      <input
        value={last_name}
        type="text"
        name="LastName"
        className="student-input"
        required
        maxLength={15}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="email" className="field-label">
        Enter the email{" "}
      </label>
      <input
        value={email}
        type="text"
        name="email"
        className="student-input"
        required
        maxLength={50}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label htmlFor="age" className="field-label">
        Enter the age{" "}
      </label>
      <input
        value={age}
        type="number"
        className="student-input"
        name="age"
        required
        maxLength={2}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <br />
      <button className="btn btn-submit">
        {" "}
        {fromUpdate ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
export default StudentForm;
