import React from "react";

import useAnimation from "../../lib/hooks/useAnimation";

import AnimationEditor from "../modules/editor/AnimationEditor";
import Spinner from "../modules/Spinner";

const Edit = ({ animationId }) => {
  const { animation, insertFrame, updateSettings } = useAnimation(animationId);

  if (!animation) {
    return <div className="Page Page--Loading"><Spinner /></div>;
  }

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title">
          Currently editing "{animation.title}" by{" "}
          <span className="text-primary">{animation.creator.name}</span>.
        </h1>
      </div>
      <AnimationEditor
        insertFrame={insertFrame}
        updateSettings={updateSettings}
        animation={animation}
      />
    </main>
  );
};

export default Edit;
