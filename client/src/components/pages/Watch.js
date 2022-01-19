import React from "react";
import useSWR from "swr";

import fetcher from "../../lib/fetcher";

import AnimationPlayer from "../modules/watch/AnimationPlayer";
import PageHeader from "../modules/PageHeader";

const Watch = ({ id }) => {
  const { data: animation, error } = useSWR(`/api/animations/${id}`, fetcher);

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
