import React from "react";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/whoami").then((response) => {
      const profileName = response.data.name;
      setProfileName(profileName);
    });
  }, []);

  return (
    <div>
      {profileName ? (
        <div>
          <h1>{profileName}</h1>
          <p>Welcome to your profile!</p>
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
