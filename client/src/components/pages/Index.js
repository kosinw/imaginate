import React from "react";

import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";
import PageHeader from "../modules/PageHeader";

const Index = () => {
  const resource = '/api/animations';

  return (
    <main className="Index">
      <PageHeader title="Discover" subtitle="Discover the most popular animations." />
      <AnimationPreviewGridView resource={resource} />
    </main>
  );
};

export default Index;
