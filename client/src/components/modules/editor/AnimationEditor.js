import React from "react";
import { navigate } from "@reach/router";
import Sketch from "react-p5";

import useMeasure from "react-use/lib/useMeasure";

import WeightTool from "./WeightTool";
import BrushPicker from "./BrushPicker";
import ColorPicker from "./ColorPicker";

let cnv;
let p5Instance;
let _frameData = [];

let _buffer;

const AnimationEditor = ({ animation, insertFrame }) => {
  // TODO(kosi): Change this hard coding of frameCount to actually selecting it
  const { frames } = animation;
  const { width, height } = animation.resolution;
  const [frameCount] = React.useState(animation.frames.length);
  const [onionSkin] = React.useState(true);

  const preload = (p5) => {
    _frameData = frames.map(frame => p5.loadImage(frame.data));
  }

  const setup = (p5, parent) => {
    p5Instance = p5;
    cnv = p5.createCanvas(width, height).parent(parent);
    cnv.id("sketch-editor");
    _buffer = p5.createGraphics(width, height);
    _buffer.background(255, 255, 255, 0);
    p5.stroke(0);
    p5.strokeWeight(1);
  };

  const draw = (p5) => {
    p5.background(255);

    if (onionSkin && frameCount > 0) {
      const frame = _frameData[frameCount - 1];
      p5.tint(255, 128);
      p5.image(frame, 0, 0, width, height);
      p5.tint(255, 255);
    }

    if (p5.mouseIsPressed === true) {
      _buffer.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }

    p5.image(_buffer, 0, 0);
  };

  const save = () => {
    p5Instance.background(255);
    p5Instance.image(_buffer, 0, 0);
    const canvas = cnv.elt;
    insertFrame(canvas).then(() => {
      navigate(`/watch/${animation._id}`);
    });
  };

  const handleWeight = (weight) => {
    _buffer.strokeWeight(weight);
  };

  const handleBrush = (brush) => {
    if (brush === "Pencil") {
      _buffer.noErase();
    } else if (brush === "Eraser") {
      _buffer.erase();
    }
  };

  const handleColor = (color) => {
    _buffer.stroke(color);
  };

  return (
    <div className="AnimationEditor-container aspect-video hover:cursor-crosshair">
      <Sketch className="AnimationEditor-sketch" preload={preload} setup={setup} draw={draw} />
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
