import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import produce from "immer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cuid from "cuid";

import fetcher from "../utils/fetcher";
import { storage } from "../utils/firebase";

import useAuth from "./useAuth";

const useAnimation = (id) => {
  const prefix = `/api/animations/${id}`;
  const { mutate, data, error } = useSWR(prefix, fetcher);
  const { userId } = useAuth();
  const [uploading, setUploading] = useState(false);

  const insertFrame = async (canvas) => {
    mutate();

    const imageRef = ref(storage, `frames/${cuid()}.webp`);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 1));

    setUploading(true);
    const snapshot = await uploadBytes(imageRef, blob)
    const imageUrl = await getDownloadURL(snapshot.ref);
    const animation = await axios.post(prefix, { data: imageUrl });
    setUploading(false);

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

  return {
    animation: data,
    userUpvoted: data && data.upvoters.includes(userId),
    upvote,
    error,
    uploading,
    insertFrame
  };
}

export default useAnimation;