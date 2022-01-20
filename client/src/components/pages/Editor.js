import React from "react";

import useAnimation from "../../lib/hooks/useAnimation";

import AnimationEditor from "../modules/editor/AnimationEditor";
import PageHeader from "../modules/PageHeader";

const Editor = ({ animationId }) => {
  const { animation, insertFrame } = useAnimation(animationId);

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
      <AnimationEditor insertFrame={insertFrame} animation={animation} />
    </main>
  );
};

export default Editor;
