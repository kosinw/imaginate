import useSWR from "swr";
import axios from "axios";

import fetcher from "../fetcher";
import useUser from "./useUser";

const useAnimation = (id) => {
  const prefix = `/api/animations/${id}`;
  const { mutate, data, error } = useSWR(prefix, fetcher);
  const { userId } = useUser();

  const upvote = async () => {
    if (!!userId) {
<<<<<<< HEAD
      await axios.post(`${prefix}/upvote`);
      mutate();
=======
      mutate();
      await axios.post(`${prefix}/upvote`);
>>>>>>> 20ea6ea9b2b2d90c533e31fc1ece5456231b1fcc
    }
  };

  return {
    animation: data,
    userUpvoted: data && data.upvoters.includes(userId),
    upvote,
    error
  };
}

export default useAnimation;