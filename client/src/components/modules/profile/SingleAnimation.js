import React from "react";
import { Link } from "@reach/router";

// import "./SingleAnimation.css";

const THUMBNAIL_WIDTH = 144;
const THUMBNAIL_HEIGHT = 108;

// TODO: generate thumbnail from animation, include as src
import thumbnail from "../../../public/test-thumbnail.png";

/**
 * Renders a single animation as part of a list
 *
 * Proptypes
 * @param {Animation} animation
 */
const SingleAnimation = ({ animation }) => {
  const profileLink = "/profile/" + animation.creator._id;
  return (
    <div className="SingleAnimation-container">
      <img
        className="SingleAnimation-thumbnail"
        src={thumbnail}
        width={THUMBNAIL_WIDTH}
        height={THUMBNAIL_HEIGHT}
      />
      <h3 className="SingleAnimation-title">{animation._id}</h3>
      <div className="SingleAnimation-info-container">
        <Link className="SingleAnimation-author" to={profileLink}>
          {animation.creator.name}
        </Link>
        <p className="SingleAnimation-score">Score: {animation.score}</p>
      </div>
    </div>
  );
};

export default SingleAnimation;
