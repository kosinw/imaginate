import React, { useState } from "react";

import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";
import SortPicker from "../modules/SortPicker";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Paginator = () => {
  return (
    <div className="Paginator">
      <button disabled className="Paginator__icon">
        <HiArrowLeft className="w-3 h-3" />
      </button>
      <span className="Paginator__content">1 / 15</span>
      <button className="Paginator__icon">
        <HiArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

const Index = () => {
  const resource = "/api/animations";
  const [sort, setSort] = useState("score");

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title">Discover Animations</h1>
        <div className="Page--Index__options">
          <SortPicker handleSortChange={handleSortChange} />
          <Paginator />
        </div>
      </div>
      <AnimationPreviewGridView resource={resource + `?order=${sort}`} />
    </main>
  );
};

export default Index;
