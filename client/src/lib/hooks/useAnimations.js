import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

import fetcher from "../utils/fetcher";

const useAnimations = (collection) => {
  const { data: animations, error } = useSWR(collection, fetcher);
  const { mutate } = useSWRConfig();

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