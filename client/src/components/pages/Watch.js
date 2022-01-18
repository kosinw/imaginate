import React from "react";
import useSWR from "swr";

import fetcher from "../../lib/fetcher";

import AnimationPlayer from "../modules/watch/AnimationPlayer";

const WatchHeader = ({ title, creator }) => {
  return (
    <div className="WatchHeader">
      <h1 className="WatchHeader__h1">Watch</h1>
      <h2 className="WatchHeader__h2">Currently watching "{title}" by {creator}.</h2>
    </div>
  )
}

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
      <WatchHeader title={title} creator={creator.name} />
      <AnimationPlayer {...animation} />
    </main>
  );
};

export default Watch;
