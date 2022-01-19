import React from "react";

import useAnimation from "../../lib/hooks/useAnimation";

import AnimationEditor from "../modules/editor/AnimationEditor";
import PageHeader from "../modules/PageHeader";

const Editor = ({ animationId }) => {
  const { animation, error, insertFrame } = useAnimation(animationId);

  if (error) {
    return (
      <div className="Watch">
        Failed to load...
      </div>
    )
  }

  if (!animation) {
    return (
      <div className="Watch">
        Loading...
      </div>
    );
  }

  return (
    <main className="Editor">
      <PageHeader title="Editor" subtitle={`Currently editing "${animation.title}" by ${animation.creator.name}.`} />
      <AnimationEditor insertFrame={insertFrame} animaton={animation} />
    </main>
  );
};

export default Editor;
