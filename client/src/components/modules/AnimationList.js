import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "axios";

/**
 * Renders a user's list of animations (or all if not provided)
 *
 * Proptypes
 * @param {string} userId - user id of author
 */
const AnimationList = (props) => {
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    if (props.userId) {
      axios.get("/api/users/" + props.userId + "/animations/").then((response) => {
        const animationObjs = response.data;
        setAnimations(animationObjs);
      });
    } else {
      axios.get("/api/animations/").then((response) => {
        const animationObjs = response.data;
        setAnimations(animationObjs);
      });
    }
  });

  let animationsList = null;
  const hasAnimations = animations.length !== 0;
  if (hasAnimations) {
    animationsList = animations.map((animation) => {
      const profileLink = "/profile/" + animation.creator._id;
      return (
        <div>
          <h3>{animation._id}</h3>
          <Link to={profileLink}>{animation.creator.name}</Link>
        </div>
      );
    });
  } else {
    animationsList = <div>No animations</div>;
  }

  return (
    <>
      <h2>Animations</h2>
      {animationsList}
    </>
  );
};

export default AnimationList;
