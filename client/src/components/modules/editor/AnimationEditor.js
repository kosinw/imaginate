import React from "react";
import Sketch from "react-p5";
import { navigate } from "@reach/router";

import { calculateFrame } from "../../../lib/utils/aspect";
import useAuth from "../../../lib/hooks/useAuth";

import WeightTool from "./WeightTool";
import BrushPicker from "./BrushPicker";
import ColorPicker from "./ColorPicker";
import UpdateDialog from "../dialog/UpdateDialog";
import ButtonWithIcon from "../ButtonWithIcon";

import { CgShapeCircle } from "react-icons/cg";
import { HiCog, HiSave, HiUpload, HiMinus, HiPlay, HiDuplicate } from "react-icons/hi";
import { toast } from 'react-hot-toast';

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

  const drawOnionSkin = (buffer, opacity = 120) => {
    if (frameCount > 0) {
      const frame = _frameData[frameCount - 1];

      const { virtualWidth, virtualHeight, x, y } = calculateFrame(frame.width, frame.height, buffer.width, buffer.height);

      buffer.clear();
      buffer.tint(255, opacity);
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
    p5.strokeWeight(10);
    p5.frameRate(60);

    if (width < 200) { p5.noSmooth(); } // NOTE(kosi): Arbitrary for pixel art

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
    p5.line(p5.mouseX, p5.mouseY, p5.mouseX + 1, p5.mouseY + 1);
  };

  const duplicateLast = () => {
    drawOnionSkin(layer1, 255);
  };

  const save = async () => {
    _p5.background(255);
    _p5.image(layer1, 0, 0, cnv.width, cnv.height);

    const canvas = cnv.elt;
    await insertFrame(canvas);
  };

  const handleWeight = (weight) => {
    layer1.strokeWeight(weight);
    _p5.strokeWeight(weight);
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
    _p5.stroke(color);
  };

  const handleUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);

    if (!!layer1) {
      const drawRoutine = (img) => {
        const { virtualWidth, virtualHeight, x, y } = calculateFrame(img.width, img.height, layer1.width, layer1.height);
        layer1.clear();
        layer1.image(img, x, y, virtualWidth, virtualHeight);
      };

      const img = _p5.loadImage(file, () => drawRoutine(img));
    } else {
      toast.error("Unable to upload file.");
    }
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
            <div className="AnimationPlayerControls__group space-x-2">
              <button onClick={() => setOnionSkin(!onionSkin)} title="Toggle Onion Skin" className="AnimationPlayerControls__button">
                <CgShapeCircle className="AnimationPlayerControls__icon" />
              </button>
              <button onClick={() => navigate(`/watch/${animation._id}`)} title="Watch" className="AnimationPlayerControls__button">
                <HiPlay className="AnimationPlayerControls__icon" />
              </button>
              <span className="AnimationPlayerControls__text AnimationPlayerControls__text--editor">
                Currently editing frame {animation.frames.length + 1}
              </span>
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
          <div className="flex flex-col space-y-2">
            <ButtonWithIcon className="justify-center" Icon={HiMinus} onClick={() => layer1.clear()} text="Clear" />
            <ButtonWithIcon className="justify-center" Icon={HiSave} onClick={save} text="Save" />
            <ButtonWithIcon className="justify-center" Icon={HiDuplicate} onClick={duplicateLast} text="Duplicate" /> 
            <label
              htmlFor="file-upload"
              className="border-primary space-x-2 text-primary w-full border rounded-md font-public px-3 py-1 text-base flex items-center justify-center relative hover:bg-primary hover:text-foreground hover:cursor-pointer" >
              <input onChange={handleUpload} id="file-upload" type="file" className="appearance-none hidden w-full" />
              <HiUpload className="w-4 h-4" />
              <span>
                Upload
              </span>
            </label>
          </div>
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
