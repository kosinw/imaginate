import React from "react";

import AnimationPreview from "./AnimationPreview";
import useAnimations from "../../lib/hooks/useAnimations";

const AnimationPreviewGridView = ({ resource }) => {
  const { animations, error } = useAnimations(resource);

  if (error) return <div className="AnimationPreviewGridView">Failed to load.</div>
  if (!animations) return <div className="AnimationPreviewGridView">Loading...</div>

  return (
    <div className="AnimationPreviewGridView">
      {animations.map(animation =>
        <AnimationPreview
          key={animation._id}
          animationId={animation._id}
        />)}
    </div>
  );
};

export default AnimationPreviewGridView;