import React from "react";
import Sketch from "react-p5";

import { calculateFrame } from "../../../lib/utils/aspect";
import useAuth from "../../../lib/hooks/useAuth";

import WeightTool from "./WeightTool";
import BrushPicker from "./BrushPicker";
import ColorPicker from "./ColorPicker";
import UpdateDialog from "../dialog/UpdateDialog";
import ButtonWithIcon from "../ButtonWithIcon";

import { CgShapeCircle } from "react-icons/cg";
import { HiCog, HiSave } from "react-icons/hi";

let cnv;
let _p5;
let _frameData = [];

let layer0;
let layer1;

const AnimationEditor = ({ animation, updateSettings, insertFrame }) => {
  // TODO(kosi): Change this hard coding of frameCount to actually selecting it
  const { frames } = animation;
  const { width, height } = animation.resolution;
  const [frameCount] = React.useState(animation.frames.length);
  const [onionSkin, setOnionSkin] = React.useState(true);
  const viewportRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const { userId } = useAuth();

  const owner = userId === animation.creator._id;

  const getRect = () => viewportRef.current && viewportRef.current.getBoundingClientRect();

  const calculateCanvasSize = () => {
    const rect = getRect();

    if (!!rect) {
      return calculateFrame(width, height, rect.width, rect.height);
    } else {
      return calculateFrame(width, height, width, height);
    }
  }

  React.useLayoutEffect(() => {
    const resizeCanvas = () => {
      if (!!_p5 && !!layer0 && !!layer1) {
        const { virtualWidth: vw, virtualHeight: vh } = calculateCanvasSize();
        layer0 = _p5.createGraphics(vw, vh);
        drawOnionSkin(layer0);
        _p5.resizeCanvas(vw, vh);
      }
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  const preload = (p5) => {
    _frameData = [];
    _p5 = p5;
    _frameData = frames.map(frame => p5.loadImage(frame.data));
  }

  const drawOnionSkin = (buffer) => {
    if (frameCount > 0) {
      const frame = _frameData[frameCount - 1];

      const { virtualWidth, virtualHeight, x, y } = calculateFrame(frame.width, frame.height, buffer.width, buffer.height);

      buffer.clear();
      buffer.tint(255, 120);
      buffer.image(frame, x, y, virtualWidth, virtualHeight);
      buffer.noTint();
    }
  };

  const setup = (p5, parent) => {
    const { virtualWidth: vw, virtualHeight: vh } = calculateCanvasSize();

    p5.pixelDensity(1)
    cnv = p5.createCanvas(vw, vh).parent(parent);
    layer0 = p5.createGraphics(vw, vh);
    layer1 = p5.createGraphics(width, height);

    p5.stroke(0);
    p5.strokeWeight(1);
    p5.frameRate(30);

    drawOnionSkin(layer0);
  };

  const draw = (p5) => {
    p5.background(255);

    if (onionSkin) {
      p5.image(layer0, 0, 0, cnv.width, cnv.height);
    }

    const scaleX = layer1.width / cnv.width;
    const scaleY = layer1.height / cnv.height;

    const fx = p5.mouseX * scaleX;
    const fy = p5.mouseY * scaleY;
    const tx = p5.pmouseX * scaleX;
    const ty = p5.pmouseY * scaleY;

    if (p5.mouseIsPressed === true) {
      layer1.line(fx, fy, tx, ty);
    }

    p5.image(layer1, 0, 0, cnv.width, cnv.height);
  };

  const save = async () => {
    _p5.background(255);
    _p5.image(layer1, 0, 0, cnv.width, cnv.height);

    const canvas = cnv.elt;
    await insertFrame(canvas);
  };

  const handleWeight = (weight) => {
    layer1.strokeWeight(weight);
  };

  const handleBrush = (brush) => {
    if (brush === "Pencil") {
      layer1.noErase();
    } else if (brush === "Eraser") {
      layer1.erase();
    }
  };

  const handleColor = (color) => {
    layer1.stroke(color);
  };

  return (
    <>
      <div className="AnimationEditor">
        <section className="AnimationEditor__section AnimationEditor__section--left">
          <div ref={viewportRef} className="AnimationCanvas AnimationCanvas--editor">
            <div id="p5_loading" />
            <Sketch className="AnimationCanvas__container AnimationCanvas__container--editor" preload={preload} setup={setup} draw={draw} />
          </div>
          <div className="AnimationPlayerControls AnimationPlayerControls--editor">
            <div className="AnimationPlayerControls__group">
              <button onClick={() => setOnionSkin(!onionSkin)} title="Toggle Onion Skin" className="AnimationPlayerControls__button">
                <CgShapeCircle className="AnimationPlayerControls__icon" />
              </button>
            </div>
            <div className="AnimationPlayerControls__group">
              <button onClick={() => setOpen(true)} title="Settings" className="AnimationPlayerControls__button">
                <HiCog className="AnimationPlayerControls__icon" />
              </button>
            </div>
          </div>
        </section>
        <section className="AnimationEditor__section AnimationEditor__section--right">
          <ColorPicker handleColor={handleColor} />
          <WeightTool handleWeight={handleWeight} />
          <BrushPicker handleBrush={handleBrush} />
          {/* <button className="AnimationEditor-submit" onClick={save}>
            Save
          </button> */}
          <ButtonWithIcon className="justify-center" Icon={HiSave} onClick={save} text="Save" />
        </section>
      </div>
      <UpdateDialog
        disabled={!owner}
        defaultValues={{
          title: animation.title,
          width: animation.resolution.width,
          height: animation.resolution.height,
          framerate: animation.framerate
        }}
        open={open}
        setOpen={setOpen}
        onSubmit={(values) => updateSettings(values).then(() => setOpen(false))}
      />
    </>
  );
};

export default AnimationEditor;
