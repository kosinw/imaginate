import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const CreateAnimationForm = () => {
  const [title, setTitle] = useState("");
  const [framerate, setFramerate] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: title,
      framerate: framerate,
      resolution: {
        width: width,
        height: height,
      },
    };
    axios.post("/api/animations", body).then((response) => {
      navigate(`/edit/${response.data._id}/`);
    });
  };

  return (
    <form className="CreateAnimationForm-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          className="CreateAnimationForm-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Framerate (fps):
        <input
          className="CreateAnimationForm-input"
          type="text"
          value={framerate}
          onChange={(e) => setFramerate(e.target.value)}
        />
      </label>
      <label>
        Width (px):
        <input
          className="CreateAnimationForm-input"
          type="text"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </label>
      <label>
        Height (px):
        <input
          className="CreateAnimationForm-input"
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <input className="CreateAnimationForm-submit" type="submit" value="Submit" />
    </form>
  );
};

export default CreateAnimationForm;
