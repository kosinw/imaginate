import React, { useState } from "react";
import { GithubPicker } from "react-color";

// Pallete is list of strings of hex codes, passed into picker to restrict color choices
// Initial color is black
const ColorPicker = ({ pallete, handleColor }) => {
  const [color, setColor] = useState("#000000");
  const defaultPallete = [
    "#000000",
    "#FFFFFF",
    "#B80000",
    "#DB3E00",
    "#FCCB00",
    "#008B02",
    "#006B76",
    "#1273DE",
    "#004DCF",
    "#5300EB",
  ];

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
    handleColor(newColor.hex);
  };

  return (
    <div className="ColorPicker-container">
      <GithubPicker
        triangle="hide"
        colors={pallete || defaultPallete}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
