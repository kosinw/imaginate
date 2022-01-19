import React from "react";
import useSWR from "swr";

import fetcher from "../../lib/fetcher";

import PageHeader from "../modules/PageHeader";
import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = ({ userId }) => {
  const { data: user, error } = useSWR(userId && `/api/users/${userId}`, fetcher);

  // TODO(kosi): Input spinner + skeleton cards.
  if (error) { return <div>Failed to load...</div> }
  if (!user) { return <div>Loading...</div> }

  return (
    <main className="Profile">
      <PageHeader title="Profile" subtitle={`Currently browsing the page of ${user.name}.`} />
      <AnimationPreviewGridView resource={`/api/users/${userId}/animations`} />
    </main>
  );
};

export default Profile;
