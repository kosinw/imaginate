import React from "react";
import { navigate } from "@reach/router";
import Sketch from "react-p5";

let cnv;

const AnimationViewer = ({ animation }) => {
  let imageFrames = [];
  let frameCount = 0;

  const preload = (p5) => {
    for (let i = 0; i < animation.frames.length; i++) {
      imageFrames[i] = p5.loadImage(animation.frames[i].data);
    }
  };

  const setup = (p5, parent) => {
    cnv = p5.createCanvas(animation.resolution.width, animation.resolution.height).parent(parent);
    cnv.id("sketch-viewer");
    p5.background(255);
    p5.frameRate(animation.framerate);
  };

  const draw = (p5) => {
    p5.image(imageFrames[frameCount], 0, 0);
    frameCount += 1;
    if (frameCount === imageFrames.length) {
      frameCount = 0;
    }
  };

  return (
    <div className="AnimationViewer-container">
      <Sketch className="AnimationViewer-sketch" preload={preload} setup={setup} draw={draw} />
      <button
        className="AnimationViewer-edit"
        onClick={() => {
          navigate(`/animation/${animation._id}/edit`);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default AnimationViewer;
