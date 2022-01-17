import React from 'react';
import axios from 'axios';

const useUser = () => {
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { data: user } = await axios.get("/api/whoami");

      if (user._id) {
        setUserId(user._id);
      }
    })();
  }, []);

  const handleLogin = async (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    const { data: user } = await axios.post("/api/login", { token: userToken });
    setUserId(user._id)
  };

  const handleLogout = async () => {
    setUserId(undefined);
    await axios.post("/api/logout");
  };

  return {
    userId,
    handleLogin,
    handleLogout
  };
}

export default useUser;
