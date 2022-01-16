import React from "react";
import axios from "axios";

import AnimationPreview from "../modules/index/AnimationPreview";

const parseAnimationData = (animation) => {
  return animation.frames[0].data;
}

const IndexCardGridView = () => {
  const [animations, setAnimations] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const animations = await axios.get("/api/animations/");
      setAnimations(animations.data);
    })();
  }, []);
  return (
    <div className="IndexCardGridView">
      {animations.map(animation => <AnimationPreview data={parseAnimationData(animation)} />)}
    </div>
  );
}

const IndexSearchView = () => {
  return (
    <div className="IndexSearchView">
      <input className="searchbar" placeholder="Search..." />
    </div>
  )
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
