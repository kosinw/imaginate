import { useEffect } from "react";
import useSWR, { mutate } from "swr";

import fetcher from "../utils/fetcher";

const useAnimations = (collection) => {
  const { data: animations, error } = useSWR(collection, fetcher);

  useEffect(() => {
    if (!!animations) {
      animations.map(animation => {
        mutate(`/api/animations/${animation._id}`, animation, false);
      });
    }
  }, [animations]);

  return {
    animations,
    error
  };
}

export default useAnimations;