function SortButton({ageSort,isAgeSort,fnameSort,isNameSort}){
    return(
        <div>
      
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

        </div>
    );
}
export default SortButton