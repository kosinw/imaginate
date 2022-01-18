import React from "react";
import axios from "axios";

import useUser from '../../lib/hooks/useUser';
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

const IndexHeader = () => {
  return (
    <div className="IndexHeader">
      <h1 className="IndexHeader__h1">Discover</h1>
      <h2 className="IndexHeader__h2">Discover the most popular animations.</h2>
    </div>
  )
}

const Index = () => {
  return (
    <main className="Index">
      <IndexHeader />
      <IndexCardGridView />
    </main>
  );
};

export default Index;
