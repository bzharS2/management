/* eslint-disable no-unused-vars */
import StudentForm from "./components/studentForm";
import SearchBar from "./components/searchBar";
import SortButton from "./components/sortButton";
import StudentList from "./components/studentList";

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
  const [age, setAge] = useState("");
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
    setAge("")
    setEmail("")
    setFirstName("")
    setLastName("")
  }
  async function add(e) {
    e.preventDefault();
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
      setFromUpdate(false);
    }
    fetching();
  
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
      <StudentForm
        age={age}
        email={email}
        first_name={first_name}
        last_name={last_name}
        setAge={setAge}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        fromUpdate={fromUpdate}
        add={add}
      />
      <SearchBar setSearch={setSearch} searchStudent={searchStudent} /><br />
      <SortButton
        ageSort={ageSort}
        fnameSort={fnameSort}
        isAgeSort={isAgeSort}
        isNameSort={isNameSort}
      />
      <br />
      <StudentList students={students} remove={remove} update={Update} />
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
