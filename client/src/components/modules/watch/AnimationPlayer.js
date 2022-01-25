import React from "react";
import Sketch from "react-p5";
import classnames from "classnames";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { HiFastForward, HiRewind, HiCog } from "react-icons/hi";
import { CgRepeat, CgPushRight } from "react-icons/cg";

import { calculateFrame } from "../../../lib/utils/aspect";

import UpvoteButton from "../UpvoteButton";
import UpdateDialog from "../dialog/UpdateDialog";
import Slider from "../Slider";

let _frameData = [];
let _frameBuffer;
let _p5;

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const AnimationCanvas = ({
  animation,
  frameCount,
  setFrameCount,
  setPaused,
  looping,
  paused,
  onClick,
}) => {
  const { width: frameWidth, height: frameHeight } = animation.resolution;
  const sketchWrapper = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const scaleFactor = 9 / 16;
  const { frames, framerate } = animation;
  const delay = (1 / framerate) * 1000;

  React.useLayoutEffect(() => {
    const resizeCanvas = () => {
      const rect = sketchWrapper.current.getBoundingClientRect();
      if (!!_p5) {
        _p5.resizeCanvas(rect.width, rect.width * scaleFactor);
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

    frames.map((frame) => {
      _frameData.push(p5.loadImage(frame.data));
    });
  };

  const setup = (p5, parent) => {
    setLoading(false);
    const rect = sketchWrapper.current.getBoundingClientRect();
    p5.createCanvas(rect.width, rect.width * scaleFactor).parent(parent);
    _frameBuffer = p5.createGraphics(frameWidth, frameHeight);
    p5.background(0);
  };

  const draw = (p5) => {
    const { width, height } = sketchWrapper.current.getBoundingClientRect();
    let _paused = false;

    if (_frameData.length === 0) {
      return;
    }

    if (frameCount >= _frameData.length) {
      if (looping) {
        setFrameCount(frameCount - _frameData.length);
      } else {
        setPaused(true);
        _paused = true;
      }
      return;
    }

    const image = _frameData[Math.floor(frameCount)];

    // NOTE(kosi): Maybe slight performance gain from not having to clear screen each time?
    // _frameBuffer.background(0);
    _frameBuffer.image(image, 0, 0, frameWidth, frameHeight);

    // Figure out y position to draw from by taking difference between
    // height of viewport and height of image and then dividing by two.
    const { virtualWidth, virtualHeight, x, y } = calculateFrame(frameWidth, frameHeight, width, height);
    p5.image(_frameBuffer, x, y, virtualWidth, virtualHeight);

    if (paused || _paused) {
      return;
    }

    const newFrameCount = Math.min(_frameData.length, frameCount + p5.deltaTime / delay);
    setFrameCount(newFrameCount);
  };

  return (
    <div
      key={animation.frames.length}
      ref={sketchWrapper}
      onClick={onClick}
      className={classnames("AnimationCanvas", { "AnimationCanvas--Skeleton": loading })}
    >
      <div id="p5_loading" />
      <Sketch
        className="AnimationCanvas__container"
        preload={preload}
        setup={setup}
        draw={draw}
      />
    </div>
  );
};


const AnimationPlayerControls = (props) => {
  const { onPlayClicked } = props;
  const { onNextFrameClicked, onPrevFrameClicked, onSettingsClicked } = props;
  const { onLoopClicked } = props;
  const { paused, looping } = props;
  const { currentFrame, totalFrames } = props;
  const { animationId } = props;

  return (
    <div className="AnimationPlayerControls">
      <div className="AnimationPlayerControls__group AnimationPlayerControls__group--left">
        <button title={paused ? "Play" : "Pause"} onClick={onPlayClicked} className="AnimationPlayerControls__button">
          {paused ?
            <BsPlayFill className="AnimationPlayerControls__icon" /> :
            <BsPauseFill className="AnimationPlayerControls__icon" />
          }
        </button>
        <div className="AnimationPlayerControls__subgroup">
          <button title="Next Frame" disabled={!paused} onClick={onPrevFrameClicked} className="AnimationPlayerControls__button">
            <HiRewind className="AnimationPlayerControls__icon" />
          </button>
          <span className={classnames("AnimationPlayerControls__text", { "AnimationPlayerControls__text--disabled": !paused })}>
            {`${currentFrame} / ${totalFrames}`}
          </span>
          <button title="Previous Frame" disabled={!paused} onClick={onNextFrameClicked} className="AnimationPlayerControls__button">
            <HiFastForward className="AnimationPlayerControls__icon" />
          </button>
        </div>
      </div>
      <div className="AnimationPlayerControls__group AnimationPlayerControls__group--right">
        <button title={looping ? "Loop" : "Play Once"} onClick={onLoopClicked} className="AnimationPlayerControls__button">
          {looping ?
            <CgRepeat className="AnimationPlayerControls__icon" /> :
            <CgPushRight className="AnimationPlayerControls__icon" />
          }
        </button>
        <button onClick={onSettingsClicked} title="Settings" className="AnimationPlayerControls__button">
          <HiCog className="AnimationPlayerControls__icon" />
        </button>
        <UpvoteButton className="AnimationPlayerControls__button" animationId={animationId} />
      </div>
    </div>
  );
};

AnimationPlayerControls.defaultProps = {
  onPlayClicked: function () { },
  onNextFrameClicked: function () { },
  onPrevFrameClicked: function () { },
  onLoopClicked: function () { },
  onSettingsClicked: function () {},
  currentFrame: 1,
  totalFrames: 1,
  paused: true,
  looping: true,
  animationId: null
};

const AnimationPlayer = ({ animation, owner, onFrameChanged, updateSettings }) => {
  const [paused, setPaused] = React.useState(true);
  const [frameCount, setFrameCount] = React.useState(0);
  const [looping, setLooping] = React.useState(false);
  const [wasPlaying, setWasPlaying] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const prevPaused = usePrevious(paused);

  const numDigits = Math.max(3, animation.frames.length.toString().length);
  const currentFrame = `${Math.min(animation.frames.length - 1, Math.floor(frameCount)) + 1}`.padStart(numDigits, '0');
  const totalFrames = `${animation.frames.length}`.padStart(numDigits, '0');

  // NOTE(kosi): Hack to basically have linear play start from beginning.
  React.useEffect(() => {
    if (prevPaused && !paused && !looping && frameCount >= animation.frames.length - 0.1) {
      setFrameCount(0);
    }
  }, [paused]);

  React.useEffect(() => {
    if (!!onFrameChanged) {
      onFrameChanged(frameCount);
    }
  }, [frameCount]);


  const moveFrame = (amount) => {
    const loop = (min, max, val) => Math.max(min, (val + max) % max);
    const clamp = (min, max, val) => Math.max(min, Math.min(max - 1, val));

    const fn = looping ? loop : clamp;

    const nearestFrame = Math.min(frameCount);
    setFrameCount(fn(0, animation.frames.length, nearestFrame + amount));

    if (!looping && amount > 0 && nearestFrame >= animation.frames.length - 1) {
      setFrameCount(animation.frames.length);
    }
  };

  return (
    <>
      <div className="AnimationPlayer">
        <AnimationCanvas
          animation={animation}
          frameCount={frameCount}
          setFrameCount={setFrameCount}
          setPaused={setPaused}
          looping={looping}
          paused={paused}
          onClick={() => setPaused(!paused)} />
        <Slider
          onBeforeChange={() => { if (!paused) { setWasPlaying(true); setPaused(true); } }}
          onAfterChange={() => { if (wasPlaying) { setWasPlaying(false); setPaused(false); } }}
          onChange={(value) => setFrameCount((value / 100) * totalFrames)}
          value={frameCount / totalFrames * 100}
          className="my-2"
        />
        <AnimationPlayerControls
          onPlayClicked={() => setPaused(!paused)}
          onLoopClicked={() => setLooping(!looping)}
          onPrevFrameClicked={() => moveFrame(-1)}
          onNextFrameClicked={() => moveFrame(+1)}
          onSettingsClicked={() => setOpen(true)}
          paused={paused}
          looping={looping}
          currentFrame={currentFrame}
          totalFrames={totalFrames}
          animationId={animation._id}
        />
      </div>
      <UpdateDialog
        open={open}
        setOpen={setOpen}
        disabled={!owner}
        onSubmit={(values) => updateSettings(values).then(() => setOpen(false))}
        defaultValues={{
          title: animation.title,
          framerate: animation.framerate,
          width: animation.resolution.width,
          height: animation.resolution.height
        }}
      />
    </>
  );
};

export default AnimationPlayer;
