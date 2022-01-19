import useSWR from "swr";
import axios from "axios";
import produce from "immer";

import fetcher from "../fetcher";
import useUser from "./useUser";

const useAnimation = (id) => {
  const prefix = `/api/animations/${id}`;
  const { mutate, data, error } = useSWR(prefix, fetcher);
  const { userId } = useUser();

  const updateUpvoters = (animation, userId) => {
    return produce(animation, draft => {
      if (draft.upvoters.includes(userId)) {
        draft.upvoters = draft.upvoters.filter(upvoter => upvoter !== userId);
        draft.score -= 1;
      } else {
        draft.upvoters = [...draft.upvoters, userId]
        draft.score += 1;
      }
    });
  };

  const upvote = async () => {
    if (!!userId && !!data) {
      mutate(updateUpvoters(data, userId), false);
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