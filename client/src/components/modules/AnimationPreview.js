import React from "react";
import { Link } from "@reach/router";
import { HiArrowSmUp } from "react-icons/hi";

import Identicon from "../Identicon";

// TODO(kosi): Replace this with a webm preview instead of static image.
const AnimationPreview = ({ uri, name, profileId, count }) => {
  return (
    <figure className="AnimationPreview">
      <img className="thumbnail" src={uri} tw="object-cover" />
      <div className="info-container">
        <figcaption className="caption-container">
          <Identicon className="caption-icon" size={24} value={name} />
          <Link to={`/profile/${profileId}`}>
            <span className="caption-title">{name}</span>
          </Link>
        </figcaption>
        <div className="upvote-container">
          <button type="button" aria-label="Upvote" className="upvote-button">
            <HiArrowSmUp />
          </button>
          <span className="upvote-count">{count}</span>
        </div>
      </div>
    </figure>
  );
};

export default AnimationPreview;
