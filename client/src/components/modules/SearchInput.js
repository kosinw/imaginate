import React, { useState } from "react";

const SearchInput = ({ handleSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    handleSearchChange(event.target.value);
  };

  return (
    <div className="SearchInput-container">
      <label>Search:</label>
      <input className="SearchInput-input" type="text" value={search} onChange={handleChange} />
    </div>
  );
};

export default SearchInput;
