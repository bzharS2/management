function StudentCard({ student, remove, update }) {
  return (
    <div className="student-card">
      <h3>{student.first_name}</h3>
      <h3>{student.last_name}</h3>
      <h3>{student.email}</h3>
      <h3>{student.age}</h3>
      <button className="btn btn-delete" onClick={() => remove(student.id)}>
        Delete
      </button>
      <button
        className="btn  btn-update"
        onClick={() => {
          update(
            student.id,
            student.first_name,
            student.last_name,
            student.email,
            student.age,
          );
        }}
      >
        Update
      </button>
    </div>
  );
}
export default StudentCard;
