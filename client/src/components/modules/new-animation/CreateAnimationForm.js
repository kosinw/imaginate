import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const CreateAnimationForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { title: title };
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
