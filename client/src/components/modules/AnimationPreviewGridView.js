import React from "react";

import AnimationPreview, { AnimationPreviewSkeleton } from "./AnimationPreview";
import useAnimations from "../../lib/hooks/useAnimations";

const AnimationPreviewGridView = ({ resource }) => {
  const { animations } = useAnimations(resource);

  if (!animations) {
    return (
      <div className="AnimationPreviewGridView">
        {[...Array(12).keys()].map((x) => <AnimationPreviewSkeleton key={x} />)}
      </div>
    );
  }

  return (
    <div className="AnimationPreviewGridView">
      {animations.map(animation =>
        <AnimationPreview
          key={animation._id}
          animation={animation}
        />)}
    </div>
  );
};

export default AnimationPreviewGridView;