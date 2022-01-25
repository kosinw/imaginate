import React, { useState } from "react";

import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";
import SortPicker from "../modules/SortPicker";
import SearchInput from "../modules/SearchInput";

const Index = () => {
  const resource = "/api/animations";
  const [sort, setSort] = useState("score");
  const [search, setSearch] = useState("");

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title hidden lg:block">Discover Animations</h1>
        <div className="Page--Index__options">
          <SearchInput handleSearchChange={handleSearchChange} />
          <SortPicker handleSortChange={handleSortChange} />
        </div>
      </div>
      <AnimationPreviewGridView
        resource={resource + `?order=${sort}` + (search ? `&search=${search}` : "")}
      />
    </main>
  );
};

export default Index;
