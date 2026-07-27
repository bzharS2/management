/* eslint-disable no-unused-vars */
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  data,
} from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

function Main() {
  const [students, setStudents] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [ID, setId] = useState();
  const [fromUpdate, setFromUpdate] = useState(false);
  const [ageSort, setAgeSort] = useState(false);
  const [fnameSort, setFnameSort] = useState(false);
  const [search, setSearch] = useState();
  const [message, setMessage] = useState("");

  async function fetching() {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();

    setStudents(data);
    if (data.length == 0) {
      setMessage("no students");
    }
  }
  async function add() {
    if (!fromUpdate) {
      await fetch("http://localhost:5000/student", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          age,
        }),
      });
    } else {
      await fetch("http://localhost:5000/student", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          first_name,
          last_name,
          email,
          age,
        }),
      });
    }
  }

  async function remove(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this student",
    );
    if (!confirm) {
      return;
    }

    await fetch("http://localhost:5000/student", {
      method: "Delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    fetching();
  }
  async function Update(id, first_name, last_name, email, age) {
    setFirstName(first_name);
    setAge(age);
    setLastName(last_name);
    setEmail(email);
    setId(id);
    setFromUpdate(true);
  }
  async function SortingAge(State) {
    if (State) {
      const response = await fetch("http://localhost:5000/student/sort/age");
      const data = await response.json();
      setStudents(data);
    } else {
      fetching();
    }
  }
  async function SortingName(State) {
    if (State) {
      const response = await fetch(
        "http://localhost:5000/student/sort/first_name",
      );
      const data = await response.json();
      setStudents(data);
    } else {
      fetching();
    }
  }
  function isAgeSort() {
    let falseState = false;
    setFnameSort(falseState);
    let newState = !ageSort;
    setAgeSort(newState);
    SortingAge(newState);
  }
  function isNameSort() {
    let falseState = false;
    setAgeSort(falseState);
    let newState = !fnameSort;
    setFnameSort(newState);
    SortingName(newState);
  }
  async function searchStudent() {
    if (search.trim() === "") {
      fetching();
      return;
    }
    const response = await fetch(
      `http://localhost:5000/student?first_name=${search}`,
    );

    const data = await response.json();
    setStudents(data);
  }
  useEffect(() => {
    function getStudents() {
      fetching();
    }
    getStudents();
  }, []);
  return (
    <div className="student-app">
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

      <label htmlFor="age" className="field-label">
        Search by First Name{" "}
      </label>
      <input
        type="text"
        className="student-input"
        name="search"
        maxLength={20}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          searchStudent();
        }}
      >
        Search
      </button>
      <br />
      <br />

      <h3 className="app-title">Welcome to the Students page</h3>

      <button
        className="btn "
        style={{ backgroundColor: ageSort ? "green" : "gray" }}
        onClick={() => {
          isAgeSort();
        }}
      >
        sort by age
      </button>
      <button
        className=" btn"
        style={{ backgroundColor: fnameSort ? "green" : "gray" }}
        onClick={() => {
          isNameSort();
        }}
      >
        sort by First name
      </button>

      <h2 className="roster-message" style={{ color: "black" }}>
        {message}
      </h2>

      <div className="students">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3 className="student-name">{student.first_name}</h3>
            <h3>{student.last_name}</h3>
            <h3>{student.email}</h3>
            <h3>{student.age}</h3>
            <button
              className="btn  btn-delete"
              onClick={() => {
                remove(student.id);
              }}
            >
              Delete
            </button>
            <button
              className="btn  btn-update"
              onClick={() => {
                Update(
                  student.id,
                  student.first_name,
                  student.last_name,
                  student.email,
                  student.age,
                );
              }}
            >
              update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
