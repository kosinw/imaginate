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
      <Link to={`/animation/${animation._id}`}>
        <img className="thumbnail" src={animation.thumbnail} />
      </Link>
      <div className="info-container">
        <span className="info-title">{animation.title || "Untitled"}</span>
        <div className="action-container">
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
              className={classnames({ "upvote-button": true, active: active })}
            >
              <HiArrowSmUp />
              <span className="upvote-count">{animation.score}</span>
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default AnimationPreview;
