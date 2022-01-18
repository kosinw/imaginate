import React from "react";
import { Link, navigate } from "@reach/router";

import Identicon from "./Identicon";
import UpvoteButton from "./UpvoteButton";

const AnimationPreview = ({ animation, userId }) => {
  const active = animation.upvoters.includes(userId);

  const onPreviewClick = () => {
    navigate(`/watch/${animation._id}`);
  };

  return (
    <figure onClick={onPreviewClick} className="AnimationPreview">
      <img className="thumbnail" src={animation.thumbnail} />
      <div className="info-container">
        <figcaption className="caption-container">
          <Identicon className="caption-icon" size={24} value={animation.creator.name} />
          <Link to={`/profile/${animation.creator._id}`}>
            <span className="caption-title">{animation.creator.name}</span>
          </Link>
        </figcaption>
        <div className="upvote-container">
          <UpvoteButton active={active} score={animation.score} onClick={() => { }} />
        </div>
      </div>
    </figure>
  );
};

export default AnimationPreview;
