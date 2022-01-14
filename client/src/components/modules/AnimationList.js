import React, { useState, useEffect } from "react";
import axios from "axios";

import SingleAnimation from "../modules/SingleAnimation";

/**
 * Renders a user's list of animations (or all if id not provided)
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
      return <SingleAnimation animation={animation} />;
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
