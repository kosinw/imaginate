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

  const _insertFrame = async (canvas) => {
    const imageRef = ref(storage, `frames/${cuid()}.webp`);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 1));

    const snapshot = await uploadBytes(imageRef, blob)
    const imageUrl = await getDownloadURL(snapshot.ref);
    const animation = await axios.post(prefix, { data: imageUrl });

    return animation;
  }

  const insertFrame = async (canvas) => {
    return await toast.promise(
      _insertFrame(canvas)
        .then(() => mutate())
        .then(() => navigate(`/watch/${data._id}`)),
      {
        loading: 'Creating new frame...',
        success: <b>Frame successfully created!</b>,
        error: <b>There was an error while creating this frame.</b>
      }
    )
  };

  const forkAnimation = async (values) => {
    const { title, frame } = values;
    const parent = data;

    const body = {
      title: title,
      framerate: parent.framerate,
      resolution: parent.resolution,
      parent: parent._id,
      frames: parent.frames.slice(0, parseInt(frame)),
    };

    await toast.promise(
      axios
        .post("/api/animations", body)
        .then((response) => { mutate(); return response; })
        .then((response) => navigate(`/edit/${response.data._id}`)),
      {
        loading: 'Forking animation...',
        success: <b>Animation successfully forked!</b>,
        error: <b>There was an error while forking this animation.</b>
      }
    )
  };

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

  const updateSettings = async (values) => {
    const { title, framerate } = values;

    const _update = produce(draft => {
      draft.title = title;
      draft.framerate = framerate;
      return draft;
    });

    mutate(_update(data), false);

    const body = {
      title,
      framerate
    };

    await toast.promise(
      axios.put(prefix, body).then(() => mutate()),
      {
        loading: 'Updating animation...',
        success: <b>Animation updated!</b>,
        error: <b>There was an error while updating your animation.</b>
      }
    );
  };

  const deleteAnimation = async () => {
    mutate(null, false);
    await toast.promise(
      axios.delete(prefix).then(() => mutate()).then(() => navigate("/")),
      {
        loading: 'Deleting animation...',
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
    insertFrame,
    deleteAnimation,
    forkAnimation,
    updateSettings
  };
}

export default useAnimation;