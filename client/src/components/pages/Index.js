import React from "react";

import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Paginator = () => {
  return (
    <div className="Paginator">
      <button disabled className="Paginator__icon">
        <HiArrowLeft className="w-3 h-3" />
      </button>
      <span className="Paginator__content">
        1 / 15
      </span>
      <button className="Paginator__icon">
        <HiArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

const Index = () => {
  const resource = '/api/animations';

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title">
          Discover Animations
        </h1>
        <Paginator />
      </div>
      <AnimationPreviewGridView resource={resource} />
    </main>
  );
};

export default Index;
