import React, { useState } from "react";

const BrushPicker = ({ handleBrush }) => {
  const [brush, setBrush] = useState("Pencil");

  const handleChange = (event) => {
    handleBrush(event.target.value);
    setBrush(event.target.value);
  };

  return (
    <div className="BrushPicker-radiocontainer">
      Brush: {brush}
      <label>
        <input
          name="brush"
          type="radio"
          value="Pencil"
          className="BrushPicker-radio"
          onChange={handleChange}
          defaultChecked
        />
        Pencil
      </label>
      <label>
        <input
          name="brush"
          type="radio"
          value="Eraser"
          className="BrushPicker-radio"
          onChange={handleChange}
        />
        Eraser
      </label>
    </div>
  );
};

export default BrushPicker;
