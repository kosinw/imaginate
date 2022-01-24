import React from "react";
import useSWR from "swr";

import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = ({ userId }) => {
  const { data: user } = useSWR(userId && `/api/users/${userId}`);

  // TODO(kosi): Input spinner + skeleton cards.
  if (!user) { return <div>Loading...</div> }

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title">
          Currently browsing <span className="text-primary">{user.name}'s</span> profile page.
        </h1>
      </div>
      <AnimationPreviewGridView resource={`/api/users/${userId}/animations`} />
    </main>
  );
};

export default Profile;
