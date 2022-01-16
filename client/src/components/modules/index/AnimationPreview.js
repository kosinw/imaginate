
import React from "react";

// TODO(kosi): Replace this with a webm preview instead of static image.
const AnimationPreview = ({ data }) => {
  return (
    <div className="AnimationPreview">
      <img className="thumbnail" src={data} tw="object-cover" />
    </div>
  );
}

export default AnimationPreview;
