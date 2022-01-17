import React, { useState, useEffect } from "react";
import axios from "axios";

import AnimationPreview from "../index/AnimationPreview";

const previewProps = (animation) => {
  return {
    uri: animation.frames[0].data,
    count: animation.score,
    name: animation.creator.name,
  };
};

const ProfileCardGridView = (props) => {
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    (async () => {
      const animations = await axios.get(`/api/users/${props.userId}/animations/`);
      const animationData = animations.data.filter((animation) => animation.frames.length > 0);
      setAnimations(animationData);
    })();
  }, []);

  return (
    <div className="IndexCardGridView">
      {animations.map((animation) => (
        <AnimationPreview {...previewProps(animation)} />
      ))}
    </div>
  );
};

export default ProfileCardGridView;
