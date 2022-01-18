import React from "react";
import { Link } from "@reach/router";
import { HiArrowSmUp } from "react-icons/hi";
import classnames from "classnames";

import Identicon from "../Identicon";

// TODO(kosi): Replace this with a webm preview instead of static image.
const AnimationPreview = ({ animation, userId }) => {
  const active = animation.upvoters.includes(userId);

  return (
    <figure className="AnimationPreview">
      <img className="thumbnail" src={animation.thumbnail} />
      <div className="info-container">
        <figcaption className="caption-container">
          <Identicon className="caption-icon" size={24} value={animation.creator.name} />
          <Link to={`/profile/${animation.creator._id}`}>
            <span className="caption-title">{animation.creator.name}</span>
          </Link>
        </figcaption>
        <div className="upvote-container">
          <button
            type="button"
            aria-label="Upvote"
            className={classnames({ "upvote-button": true, "active": active })}>
            <HiArrowSmUp />
            <span className="upvote-count">
              {animation.score}
            </span>
          </button>
        </div>
      </div>
    </figure>
  );
};

export default AnimationPreview;
