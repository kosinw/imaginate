import React, { useState } from "react";
import classnames from "classnames";
import { GithubPicker } from "react-color";

const luma = (c) => {
  let co = c.substring(1);      // strip #
  let rgb = parseInt(co, 16);   // convert rrggbb to decimal
  let r = (rgb >> 16) & 0xff;  // extract red
  let g = (rgb >> 8) & 0xff;  // extract green
  let b = (rgb >> 0) & 0xff;  // extract blue

  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma;
};

// Pallete is list of strings of hex codes, passed into picker to restrict color choices
// Initial color is black
const ColorPicker = ({ pallete, handleColor }) => {
  const [color, setColor] = useState("#000000");
  const defaultPallete = [
    '#000000',
    '#ffffff',
    '#4a883b',
    '#93b65f',
    '#dce137',
    '#f86f43',
    '#bb0f49',
    '#771a4e',
    '#3d184c',
    '#72253d',
    '#a45050',
    '#d48c75',
    '#f8d1a0',
    '#f266e2',
    '#963fc5',
    '#492ba7',
    '#2b1458',
    '#3544a9',
    '#1f8be8',
    '#90c5dc',
    '#72788b',
    '#25487c',
    '#398ea4',
    '#36deb7',
    '#90e626',
    '#259f2b',
    '#195d54',
    '#132e35',
  ];

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
    handleColor(newColor.hex);
  };

  return (
    <div className="ColorPicker-container">
      <h4 className="EditorTool-label">Color:{" "}<span className={classnames(luma(color) < 70 && "bg-foreground", "ml-1")} style={{ color }}>{color}</span></h4>
      <GithubPicker
        width="100%"
        triangle="hide"
        colors={pallete || defaultPallete}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
