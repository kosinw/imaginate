import React, { useState, useEffect } from "react";
import axios from "axios";

import AnimationViewer from "../modules/animation/AnimationViewer";

const Animation = ({ animationId }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    axios.get(`/api/animations/${animationId}`).then((response) => {
      setAnimationData(response.data);
    });
  }, []);

  const parseDate = (dateString) => {
    let dateObj = new Date(dateString);
    return dateObj.toDateString() + " " + dateObj.getHours() + ":" + dateObj.getMinutes();
  };

  return (
    <>
      {animationData ? (
        <div>
          <h1>{animationData.title || animationData.id}</h1>
          <AnimationViewer animation={animationData} />
          <p>Created: {parseDate(animationData.creationTime)}</p>
          <p>Last updated: {parseDate(animationData.updateTime)}</p>
          <p>Framecount: {animationData.frames.length}</p>
          <p>Score: {animationData.score}</p>
        </div>
      ) : null}
    </>
  );
};

export default Animation;
