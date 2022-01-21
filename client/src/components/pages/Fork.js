import React, { useState, useEffect } from "react";
import axios from "axios";

import ForkAnimationForm from "../modules/fork/ForkAnimationForm";
import PageHeader from "../modules/PageHeader";

const ForkAnimation = ({ animationId, frameCount }) => {
  const [parentAnimation, setParentAnimation] = useState(null);

  useEffect(() => {
    axios.get(`/api/animations/${animationId}`).then((response) => {
      setParentAnimation(response.data);
    });
  }, []);

  if (!parentAnimation) {
    return <div className="ForkAnimation">Loading...</div>;
  }

  return (
    <main className="ForkAnimation">
      <PageHeader
        title="Fork"
        subtitle={`Forking "${parentAnimation.title}" by ${parentAnimation.creator.name}`}
      />
      <ForkAnimationForm parent={parentAnimation} frameCount={frameCount} />
    </main>
  );
};

export default ForkAnimation;
