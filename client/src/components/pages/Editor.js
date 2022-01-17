import React from "react";

import AnimationEditor from "../modules/editor/AnimationEditor";

const Editor = ({ animationId }) => {
  return (
    <div>
      <h1>Editor</h1>
      <AnimationEditor animationId={animationId} />
    </div>
  );
};

export default Editor;
