import React, { useState } from "react";

const WeightTool = ({ handleWeight }) => {
  const [weight, setWeight] = useState(1);

  const handleChange = (event) => {
    setWeight(event.target.value);
    handleWeight(weight);
  };

  return (
    <div class="WeightTool-slidecontainer">
      <label>
        Weight: {weight} px
        <input
          type="range"
          min="1"
          max="64"
          value={weight}
          onChange={handleChange}
          className="WeightTool-slider"
        />
      </label>
    </div>
  );
};

export default WeightTool;
