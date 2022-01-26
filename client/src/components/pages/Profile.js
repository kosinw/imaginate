import React, { useState } from "react";
import useSWR from "swr";

import { useAnimationsInfinite } from "../../lib/hooks/useAnimations";

import Spinner from "../modules/Spinner";
import SortPicker from "../modules/SortPicker";
import AnimationPreviewGridView from "../modules/AnimationPreviewGridView";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = ({ userId }) => {
  const { data: user } = useSWR(userId && `/api/users/${userId}`);
  const [sort, setSort] = useState("score");
  const { animations, infinite } = useAnimationsInfinite(`/api/users/${userId}/animations` + `?order=${sort}`);

  if (!user) {
    return <div className="Page Page--Loading"><Spinner /></div>;
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
      <AnimationPreviewGridView animations={animations} infinite={infinite} />
    </main>
  );
};

export default Profile;
