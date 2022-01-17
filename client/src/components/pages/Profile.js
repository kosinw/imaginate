import React from "react";
import axios from "axios";

// import AnimationList from "../modules/profile/AnimationList";
import ProfileCardGridView from "../modules/profile/ProfileCardGridView";

/**
 * Renders a user's profile
 *
 * Proptypes
 * @param {string} userId - user id of profile
 */
const Profile = (props) => {
  const [profileName, setProfileName] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/users/" + props.userId).then((response) => {
      const profileName = response.data.name;
      setProfileName(profileName);
    });
  }, []);

  return (
    <div>
      {profileName ? (
        <div>
          <h1>{profileName}</h1>
          {/* <AnimationList userId={props.userId} /> */}
          <ProfileCardGridView userId={props.userId} />
        </div>
      ) : (
        <div>
          <h1>Please sign in to view your profile.</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
