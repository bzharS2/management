import StudentCard from "./studentCard";
function StudentList({ students, remove, update }) {

  return (
    <div className="students">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          remove={remove}
          update={update}
        />
      ))}
    </div>
  );
}
export default StudentList;
