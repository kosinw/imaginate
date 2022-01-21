import React from "react";
import { navigate } from "@reach/router";
// import axios from "axios";
import Sketch from "react-p5";

import WeightTool from "./WeightTool";
import BrushPicker from "./BrushPicker";
import ColorPicker from "./ColorPicker";

let cnv;
let p5Instance;

const AnimationEditor = ({ animation, insertFrame }) => {
  const setup = (p5, parent) => {
    p5Instance = p5;
    cnv = p5.createCanvas(640, 360).parent(parent);
    cnv.id("sketch-editor");
    p5.background(255);
    p5.stroke(0);
    p5.strokeWeight(1);
  };

  const draw = (p5) => {
    if (p5.mouseIsPressed === true) {
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };

  // const save = () => {
  //   const body = { data: cnv.elt.toDataURL() };
  //   axios.post(`/api/animations/${animation._id}`, body).then((response) => {
  //     // TODO: redirect to animation instead of discover
  //     navigate("/");
  //   });
  // };

  const save = () => {
    const canvas = cnv.elt;
    insertFrame(canvas).then(() => {
      navigate(`/watch/${animation._id}`);
    });
  };

  const handleWeight = (weight) => {
    p5Instance.strokeWeight(weight);
  };

  const handleBrush = (brush) => {
    if (brush === "Pencil") {
      p5Instance.noErase();
    } else if (brush === "Eraser") {
      p5Instance.erase();
    }
  };

  const handleColor = (color) => {
    p5Instance.stroke(color);
  };

  return (
    <div className="AnimationEditor-container">
      <Sketch className="AnimationEditor-sketch" setup={setup} draw={draw} />
      <div className="AnimationEditor-tools-container">
        <BrushPicker handleBrush={handleBrush} />
        <WeightTool handleWeight={handleWeight} />
        <ColorPicker handleColor={handleColor} />
        <button className="AnimationEditor-submit" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AnimationEditor;
