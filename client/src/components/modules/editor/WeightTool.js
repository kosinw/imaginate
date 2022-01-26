import React, { useState } from "react";
import Slider from "../../modules/Slider";

const WeightTool = ({ handleWeight }) => {
  const [weight, setWeight] = useState(1);

  const handleChange = (value) => {
    setWeight(value);
    handleWeight(value);
  };

  return (
    <div className="WeightTool-slidecontainer">
      <h4 className="pb-0 EditorTool-label">Weight: {weight} px</h4>
      <Slider
        round
        min={1}
        max={64}
        value={weight}
        onChange={handleChange}
      />
    </div>
  );
};

export default WeightTool;
