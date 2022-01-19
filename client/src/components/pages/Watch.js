import React from "react";

import AnimationPlayer from "../modules/watch/AnimationPlayer";
import PageHeader from "../modules/PageHeader";

import useAnimation from "../../lib/hooks/useAnimation";

const Watch = ({ id }) => {
  const { animation, error } = useAnimation(id);

  if (error) {
    return (
      <div className="Watch">
        Failed to load...
      </div>
    )
  }

  if (!animation) {
    return (
      <div className="Watch">
        Loading...
      </div>
    );
  }

  const { title, creator } = animation;

  return (
    <main className="Watch">
      <PageHeader title="Watch" subtitle={`Currently watching "${title}" by ${creator.name}.`} />
      <AnimationPlayer animation={animation} />
    </main>
  );
};

export default Watch;
