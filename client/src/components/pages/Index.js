import React from "react";
import axios from "axios";

import AnimationPreview from "../modules/index/AnimationPreview";

const previewProps = (animation) => {
  return {
    uri: animation.frames[0].data,
    count: animation.score,
    name: animation.creator.name
  }
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
      {animations.map(animation => <AnimationPreview {...previewProps(animation)} />)}
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
