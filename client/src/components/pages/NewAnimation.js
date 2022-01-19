import React from "react";

import CreateAnimationForm from "../modules/new-animation/CreateAnimationForm";
import PageHeader from "../modules/PageHeader";

const NewAnimation = () => {
  return (
    <main className="NewAnimation">
      <PageHeader title="Create" subtitle="Get ready to create your newest animation!" />
      <CreateAnimationForm />
    </main>
  );
};

export default NewAnimation;
