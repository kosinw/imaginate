import React, { useState } from "react";

const SortPicker = ({ handleSortChange }) => {
  const [sort, setSort] = useState("score");

  const handleChange = (event) => {
    setSort(event.target.value);
    handleSortChange(event.target.value);
  };

  return (
    <div className="SortPicker-container">
      <label>Order:</label>
      <select className="SortPicker-select" onChange={handleChange}>
        <option className="SortPicker-option" value="score">
          Score
        </option>
        <option className="SortPicker-option" value="latest">
          Latest
        </option>
      </select>
    </div>
  );
};

export default SortPicker;
