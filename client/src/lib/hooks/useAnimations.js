import React from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";

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