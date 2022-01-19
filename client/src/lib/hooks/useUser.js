import useSWR from 'swr';
import axios from 'axios';

const fetcher = async () => {
  const { data: user } = await axios.get("/api/whoami");
  return user._id;
}

const useUser = () => {
  const { data, mutate } = useSWR("@auth/user", fetcher);

  const handleLogin = async (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;

    mutate(async () => {
      const { data: user } = await axios.post("/api/login", { token: userToken });
      return user._id;
    }, false);
  };

  const handleLogout = async () => {
    mutate(undefined, false);
    await axios.post("/api/logout");
  };

  return {
    userId: data,
    handleLogin,
    handleLogout
  };
}

export default useUser;
