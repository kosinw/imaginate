import React from "react";
import { Link, navigate } from "@reach/router";

import Identicon from "./Identicon";
import UpvoteButton from "./UpvoteButton";

import useAnimation from "../../lib/hooks/useAnimation";

const AnimationPreview = ({ animationId }) => {
  const { animation } = useAnimation(animationId);

  const onPreviewClick = () => {
    navigate(`/watch/${animation._id}`);
  };

  // TODO(kosi): Place skeleton loader here
  if (!animation) return <div>Loading...</div>;

  return (
    <div onClick={onPreviewClick} className="AnimationPreview">
      <img className="thumbnail" src={animation.thumbnail} />
      <div className="info-container">
        <Link onClick={e => e.stopPropagation()} to={`/profile/${animation.creator._id}`} className="caption-container">
          <Identicon className="caption-icon" size={24} value={animation.creator.name} />
          <span className="caption-title">{animation.creator.name}</span>
        </Link>
        <div className="upvote-container">
          <UpvoteButton animationId={animation._id} />
        </div>
      </div>
    </div>
  );
};

export default AnimationPreview;
