import React from "react";
import Sketch from "react-p5";
import { navigate } from "@reach/router";

import { TiMediaPlay, TiMediaPause, TiArrowLoop } from "react-icons/ti";
import { CgPushRight } from 'react-icons/cg';
import { HiChevronLeft, HiChevronRight, HiPencilAlt, HiSwitchHorizontal } from 'react-icons/hi';

import useMeasure from "react-use/lib/useMeasure";

import UpvoteButton from "../UpvoteButton";

const AnimationThumbnail = ({ thumbnail, onClick }) => {
  return (
    <div onClick={onClick} className="AnimationThumbnail">
      <img src={thumbnail} className="AnimationThumbnail__image" />
    </div>
  );
}

let _frameData = [];

const AnimationCanvas = ({
  animation,
  frameCount,
  setFrameCount,
  looping,
  mode,
  setMode,
  frameByFrameMode,
  onClick
}) => {
  const [ref, { width, height }] = useMeasure();
  const { frames, framerate } = animation;
  const delay = (1 / framerate) * 1000;

  const preload = (p5) => {
    _frameData = [];

    frames.map(frame => {
      _frameData.push(p5.loadImage(frame.data));
    })
  }

  const setup = (p5, parent) => {
    p5.createCanvas(width, height).parent(parent);
    p5.background(0);

    // Resize all frames so that they fill up width of canvas
    // add black bars top and bottom.
    _frameData.map(frame => {
      frame.resize(width, 0);
    });
  };

  const draw = (p5) => {
    if (frameCount >= _frameData.length) {
      if (looping) {
        setFrameCount(0);
      } else {
        setMode("stopped");
      }
      return;
    }

    p5.background(0);

    // Figure out y position to draw from by taking difference between
    // height of viewport and height of image and then dividing by two.
    const image = _frameData[Math.floor(frameCount)];
    const y = Math.floor((height - image.height) / 2);

    p5.image(image, 0, y);

    if (mode !== "playing" || frameByFrameMode) {
      return;
    }

    const newFrameCount = Math.min(_frameData.length, frameCount + (p5.deltaTime / delay));
    setFrameCount(newFrameCount);
  }

  return (
    <div ref={ref} onClick={onClick} className="AnimationCanvas hover:cursor-pointer">
      {width !== 0 && height !== 0 && <Sketch key={width} className="AnimationCanvas__container" preload={preload} setup={setup} draw={draw} />}
    </div>
  );
}

const AnimationPlayerControls = ({
  mode,
  onPausePlayClick,
  looping,
  onLoopClick,
  onSwapClick,
  onLeftClick,
  onRightClick,
  frameByFrameMode,
  frameCount,
  totalFrames,
  animationId
}) => {
  const onEditClick = () => {
    if (!frameByFrameMode) {
      navigate(`/animation/${animationId}/edit`)
    }
  }

  return (
    <div className="AnimationPlayerControls">
      <div className="AnimationPlayerControls__left">
        {!frameByFrameMode ? (
          <button onClick={onPausePlayClick} className="AnimationPlayerControls__button" title={mode !== "playing" ? "Play" : "Pause"}>
            {mode !== "playing" ? <TiMediaPlay className="w-6 h-6" /> : <TiMediaPause className="w-6 h-6" />}
          </button>
        ) : (
          <>
            <button onClick={onLeftClick} className="AnimationPlayerControls__button">
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <span>{Math.floor(frameCount) + 1} / {totalFrames}</span>
            <button onClick={onRightClick} className="AnimationPlayerControls__button">
              <HiChevronRight className="w-6 h-6" />
            </button>
          </>
        )
        }
      </div>
      <div className="AnimationPlayerControls__right">
        <UpvoteButton animationId={animationId} />
        <button onClick={onEditClick} className="AnimationPlayerControls__button" title="Edit">
          <HiPencilAlt className="w-6 h-6" />
        </button>
        <button onClick={onLoopClick} className="AnimationPlayerControls__button" title={looping ? "Play once" : "Loop"}>
          {looping ? <TiArrowLoop className="w-6 h-6" /> : <CgPushRight className="w-6 h-6" />}
        </button>
        <button onClick={onSwapClick} className="AnimationPlayerControls__button" title="Swap to frame-by-frame mode">
          <HiSwitchHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

const AnimationProgress = ({ frameCount, setFrameCount, totalFrames }) => {
  const onClick = (e) => {
    e.preventDefault();

    const location = e.nativeEvent.offsetX;
    const newProgress = location / width;

    setFrameCount(newProgress * totalFrames);
  };

  const [ref, { width }] = useMeasure();
  const progress = frameCount / totalFrames;

  return (
    <div onClick={onClick} ref={ref} className="AnimationProgress">
      <span style={{ width: `${progress * 100}%` }} className="AnimationProgress__played"></span>
    </div>
  );
}

const AnimationPlayer = ({ animation }) => {
  const { thumbnail } = animation;
  const [mode, setMode] = React.useState("stopped");

  const [frameCount, setFrameCount] = React.useState(0);
  const totalFrames = animation.frames.length;

  const [frameByFrameMode, setFrameByFrameMode] = React.useState(false);

  const [looping, setLooping] = React.useState(true);

  const onThumbnailClick = () => {
    setMode("playing");
    setFrameCount(0);
  }

  const onLoopClick = () => {
    setLooping(!looping);
  }

  const mod = (n, m) => {
    return ((n % m) + m) % m;
  }

  const onSwapClick = () => {
    setMode("paused");
    setFrameByFrameMode(!frameByFrameMode);
  }

  const onLeftClick = () => {
    const nextFrame = Math.floor(frameCount) - 1;

    if (looping) {
      setFrameCount(mod(nextFrame, totalFrames));
      return;
    }

    setFrameCount(Math.max(nextFrame, 0));
  }

  const onRightClick = () => {
    const nextFrame = Math.floor(frameCount) + 1;

    if (looping) {
      setFrameCount(mod(nextFrame, totalFrames));
      return;
    }

    setFrameCount(Math.min(nextFrame, totalFrames - 1));
  }

  const onPausePlayClick = () => {
    switch (mode) {
      case "stopped":
        setMode("playing");
        setFrameCount(0);
        break;
      case "playing":
        setMode("paused");
        break;
      case "paused":
        setMode("playing");
        break;
    }
  }

  const renderViewport = () => {
    switch (mode) {
      case "stopped":
        return <AnimationThumbnail onClick={onThumbnailClick} thumbnail={thumbnail} />;
      default:
        return (
          <AnimationCanvas
            animation={animation}
            frameCount={frameCount}
            setFrameCount={setFrameCount}
            looping={looping}
            mode={mode}
            setMode={setMode}
            frameByFrameMode={frameByFrameMode}
            onClick={onPausePlayClick}
          />
        );
    }
  }

  return (
    <div className="AnimationPlayer">
      {renderViewport()}
      <AnimationProgress
        frameCount={frameCount}
        setFrameCount={setFrameCount}
        totalFrames={totalFrames}
      />
      <AnimationPlayerControls
        frameByFrameMode={frameByFrameMode}
        onSwapClick={onSwapClick}
        onPausePlayClick={onPausePlayClick}
        onLoopClick={onLoopClick}
        looping={looping}
        mode={mode}
        frameCount={frameCount}
        totalFrames={totalFrames}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        animationId={animation._id}
      />
    </div>
  );
}

export default AnimationPlayer;