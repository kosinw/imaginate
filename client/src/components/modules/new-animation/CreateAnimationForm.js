import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const CreateAnimationForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO(kosi): Remove these hard coded values and add them to the form.
    const body = {
      title: title,
      framerate: 12,
      resolution: {
        width: 640,
        height: 360
      }
    };
    axios.post("/api/animations", body).then((response) => {
      navigate(`/animation/${response.data._id}/edit`);
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
      <input className="CreateAnimationForm-submit" type="submit" value="Submit" />
    </form>
  );
};

export default CreateAnimationForm;
