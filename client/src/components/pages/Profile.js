import React, { useState } from "react";
import useSWR from "swr";

import fetcher from "../../lib/utils/fetcher";
import SortPicker from "../modules/SortPicker";
import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = ({ userId }) => {
  const { data: user } = useSWR(userId && `/api/users/${userId}`, fetcher);
  const [sort, setSort] = useState("score");

  // TODO(kosi): Input spinner + skeleton cards.
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <main className="Page Page--Index">
      <div className="Page--Index__header">
        <h1 className="Page--Index__title">
          Currently browsing <span className="text-primary">{user.name}'s</span> profile page.
        </h1>
        <div className="Page--Index__options">
          <SortPicker handleSortChange={handleSortChange} />
        </div>
      </div>
      <AnimationPreviewGridView resource={`/api/users/${userId}/animations` + `?order=${sort}`} />
    </main>
  );
};

export default Profile;
