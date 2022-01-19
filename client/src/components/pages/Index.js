import React from "react";
import useSWR from "swr";

import fetcher from '../../lib/fetcher';
import useUser from '../../lib/hooks/useUser';

import AnimationPreview from "../modules/AnimationPreview";
import PageHeader from "../modules/PageHeader";

const IndexCardGridView = () => {
  const { userId } = useUser();
  const { data: animations, error } = useSWR('/api/animations', fetcher);

  if (error) return <div className="IndexCardGridView">Failed to load. {error}</div>
  if (!animations) return <div className="IndexCardGridView">Loading...</div>

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

const Index = () => {
  return (
    <main className="Index">
      <PageHeader title="Discover" subtitle="Discover the most popular animations." />
      <IndexCardGridView />
    </main>
  );
};

export default Index;
