import React from "react";
import axios from "axios";

import useUser from '../../hooks/useUser';
import AnimationPreview from "../modules/AnimationPreview";

const IndexCardGridView = () => {
  const [animations, setAnimations] = React.useState([]);
  const { userId } = useUser();

  React.useEffect(() => {
    (async () => {
      const animations = await axios.get("/api/animations/");
      const animationData = animations.data.filter((animation) => animation.frames.length > 0);
      setAnimations(animationData);
    })();
  }, []);

  return (
    <div className="IndexCardGridView">
      {animations.map(animation =>
        <AnimationPreview
          key={animation._id}
          userId={userId}
          animation={animation}
        />)}
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
