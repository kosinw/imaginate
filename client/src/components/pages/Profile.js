import React from "react";
import useSWR from "swr";

import fetcher from "../../lib/fetcher";

import ProfileCardGridView from "../modules/profile/ProfileCardGridView";
import PageHeader from "../modules/PageHeader";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = (props) => {
  const { data: user, error } = useSWR(`/api/users/${props.userId}`, fetcher);

  if (error) { return <div>Failed to load...</div> }

  return (
    <div>
      {user && user.name ? (
        <>
          <PageHeader title="Profile" subtitle={`Currently browsing the page of ${user.name}.`} />
          {/* <AnimationList userId={props.userId} /> */}
          <ProfileCardGridView userId={props.userId} />
        </>
      ) : (
        <>
          <h1>Please sign in to view your profile.</h1>
        </>
      )}
    </div>
  );
};

export default Profile;
