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
      await axios.post(`${prefix}/upvote`);
      mutate();
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