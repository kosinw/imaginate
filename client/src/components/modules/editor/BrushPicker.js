import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { BsEraserFill } from "react-icons/bs";

const BrushPicker = ({ handleBrush }) => {
  const [brush, setBrush] = useState("Pencil");

  const handleChange = (event) => {
    handleBrush(event.target.value);
    setBrush(event.target.value);
  };

  return (
    <div className="BrushPicker-radiocontainer">
      <label className="BrushPicker-option">
        <input
          name="brush"
          type="radio"
          value="Pencil"
          className="BrushPicker-radio"
          onChange={handleChange}
          defaultChecked
        />
        <HiPencil className="BrushPicker-label" />
      </label>
      <label className="BrushPicker-option">
        <input
          name="brush"
          type="radio"
          value="Eraser"
          className="BrushPicker-radio"
          onChange={handleChange}
        />
        <BsEraserFill className="BrushPicker-label" />
      </label>
    </div>
  );
};

export default BrushPicker;
