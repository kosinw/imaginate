import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { navigate } from "@reach/router";
import useSWR from "swr";
import axios from "axios";
import produce from "immer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cuid from "cuid";

import { storage } from "../utils/firebase";

import useAuth from "./useAuth";

const useAnimation = (id) => {
  const prefix = `/api/animations/${id}`;
  const { mutate, data, error } = useSWR(prefix);
  const { userId } = useAuth();
  const [uploading, setUploading] = useState(false);

  const insertFrame = async (canvas) => {
    const imageRef = ref(storage, `frames/${cuid()}.webp`);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 1));

    setUploading(true);
    const snapshot = await uploadBytes(imageRef, blob)
    const imageUrl = await getDownloadURL(snapshot.ref);
    const animation = await axios.post(prefix, { data: imageUrl });
    setUploading(false);

    mutate();

    return animation;
  }

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

  const deleteAnimation = async () => {
    mutate(null, false);
    toast.promise(
      axios.delete(prefix).then(() => mutate()).then(() => navigate("/")),
      {
        loading: 'Deleting...',
        success: <b>Animation deleted!</b>,
        error: <b>There was an error while deleting your animation.</b>
      }
    );
  };

  return {
    animation: data,
    userUpvoted: data && data.upvoters.includes(userId),
    upvote,
    error,
    uploading,
    insertFrame,
    deleteAnimation
  };
}

export default useAnimation;