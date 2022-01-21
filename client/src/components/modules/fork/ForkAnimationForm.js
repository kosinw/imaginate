import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const ForkAnimationForm = ({ parent, frameCount }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: title,
      framerate: parent.framerate,
      resolution: parent.resolution,
      parent: parent._id,
      frames: parent.frames.slice(0, parseInt(frameCount) + 1),
    };
    axios.post("/api/animations", body).then((response) => {
      navigate(`/edit/${response.data._id}`);
    });
  };

  return (
    <form className="ForkAnimationForm-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          className="ForkAnimationForm-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <input className="ForkAnimationForm-submit" type="submit" value="Submit" />
    </form>
  );
};

export default ForkAnimationForm;
