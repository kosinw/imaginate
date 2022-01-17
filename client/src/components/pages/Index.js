import React from "react";
import axios from "axios";

import AnimationPreview from "../modules/index/AnimationPreview";

const previewProps = (animation) => {
  return {
    uri: animation.frames[0].data,
    count: animation.score,
    name: animation.creator.name,
    profileId: animation.creator._id,
  };
};

const IndexCardGridView = () => {
  const [animations, setAnimations] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const animations = await axios.get("/api/animations/");
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

const IndexSearchView = () => {
  return (
    <div className="IndexSearchView">
      <input className="searchbar" placeholder="Search..." />
    </div>
  );
};

const Index = () => {
  return (
    <div className="Index">
      <IndexSearchView />
      <IndexCardGridView />
    </div>
  );
};

export default Index;
