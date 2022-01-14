import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const THUMBNAIL_WIDTH = 144;
const THUMBNAIL_HEIGHT = 108;

// TODO: generate thumbnail from animation, include as src
import thumbnail from "../../public/test-thumbnail.png";

/**
 * Renders a single animation as part of a list
 *
 * Proptypes
 * @param {Animation} animation
 */
const SingleAnimation = ({ animation }) => {
  const profileLink = "/profile/" + animation.creator._id;
  return (
    <div classname="SingleAnimation-container">
      <img
        classname="SingleAnimation-thumbnail"
        src={thumbnail}
        width={THUMBNAIL_WIDTH}
        height={THUMBNAIL_HEIGHT}
      />
      <h3 classname="SingleAnimation-title">{animation._id}</h3>
      <Link classname="SingleAnimation-author" to={profileLink}>
        {animation.creator.name}
      </Link>
    </div>
  );
};

export default SingleAnimation;
