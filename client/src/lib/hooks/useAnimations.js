import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";
import useSWRInfinite from "swr/infinite";

export const useAnimationsInfinite = (collection, PAGE_SIZE = 12) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // end of the data

    return `${collection}&page=${pageIndex + 1}&pagesize=${PAGE_SIZE}`;
  };

  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey);

  const animations = !!data ? [].concat(...data) : null;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = !!data && !!data[0] && data[0].length === 0;
  const isReachingEnd =  isEmpty || (data && data[data.length - 1] && data[data.length - 1].length < PAGE_SIZE);
  const isRefreshing = isValidating && !!data && data.length === size;

  useEffect(() => {
    if (!!animations) {
      animations.map(animation => {
        mutate(`/api/animations/${animation._id}`, animation, false);
      });
    }
  }, [animations]);

  return {
    animations,
    error,
    infinite: {
      size,
      setSize,
      isLoadingMore,
      isEmpty,
      isReachingEnd,
      isRefreshing
    }
  };
};

const useAnimations = (collection) => {
  const { data: animations, error } = useSWR(collection);

  useEffect(() => {
    if (!!animations) {
      animations.map(animation => {
        mutate(`/api/animations/${animation._id}`, animation, false);
      });
    }
  }, [animations]);

  const createAnimation = async (values) => {
    const { title, framerate, width, height } = values;

    const body = {
      title,
      framerate,
      resolution: {
        width, height
      }
    };

    await toast.promise(
      axios
        .post("/api/animations", body)
        .then((response) => navigate(`/edit/${response.data._id}`)),
      {
        loading: 'Creating animation...',
        success: <b>Animation created!</b>,
        error: <b>There was an error creating your animation.</b>
      }
    );
  }

  return {
    animations,
    createAnimation,
    error
  };
}

export default useAnimations;