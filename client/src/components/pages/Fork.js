import React from "react";

import ForkAnimationForm from "../modules/fork/ForkAnimationForm";
import PageHeader from "../modules/PageHeader";

import useAnimation from "../../lib/hooks/useAnimation";

const ForkAnimation = ({ animationId, frameCount }) => {
  const { animation } = useAnimation(animationId);

  if (!animation) {
    return <div className="ForkAnimation">Loading...</div>;
  }

  return (
    <main className="ForkAnimation">
      <PageHeader
        title="Fork"
        subtitle={`Forking "${animation.title}" by ${animation.creator.name}`}
      />
      <ForkAnimationForm parent={animation} frameCount={frameCount} />
    </main>
  );
};

export default ForkAnimation;
