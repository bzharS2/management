function SearchBar({setSearch,searchStudent}) {
  return (
    <div>
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
    </div>
    
  );
}
export default SearchBar