import React from "react";

import useAnimation from "../../lib/hooks/useAnimation";

import AnimationEditor from "../modules/editor/AnimationEditor";
import PageHeader from "../modules/PageHeader";

const Edit = ({ animationId }) => {
  const { animation, insertFrame } = useAnimation(animationId);

  if (!animation) {
    return (
      <div className="Edit">
        Loading...
      </div>
    );
  }

  return (
    <main className="Edit">
      <PageHeader title="Edit" subtitle={`Currently editing "${animation.title}" by ${animation.creator.name}.`} />
      <AnimationEditor insertFrame={insertFrame} animation={animation} />
    </main>
  );
};

export default Edit;
