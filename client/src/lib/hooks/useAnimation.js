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
      mutate();
      await axios.post(`${prefix}/upvote`);
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