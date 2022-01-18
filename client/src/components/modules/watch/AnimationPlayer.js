import React from "react";
import Sketch from "react-p5";

import { TiMediaPlay, TiMediaPause, TiArrowLoop } from "react-icons/ti";
import { AiOutlineSwap } from 'react-icons/ai';
import { CgPushRight } from 'react-icons/cg';
import { useMeasure, useUpdate } from "react-use";

import UpvoteButton from "../UpvoteButton";
import useUser from "../../../lib/hooks/useUser";

const AnimationThumbnail = ({ thumbnail, onClick }) => {
  return (
    <div onClick={onClick} className="AnimationThumbnail">
      <img src={thumbnail} className="AnimationThumbnail__image" />
    </div>
  );
}

let frameData = [];
let frameCount = 0;
let elapsedTime = 0;

const AnimationCanvas = ({ onClick, setProgress, setMode, mode, frames, framerate, looping }) => {
  const [ref, { width, height }] = useMeasure();
  const update = useUpdate();
  const delay = (1 / framerate) * 1000; // convert to delay in milliseconds

  React.useEffect(() => {
    const listener = window.addEventListener('resize', () => {
      update();
    })

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const preload = (p5) => {
    frameData = [];
    frameCount = 0;
    elapsedTime = 0;

    frames.map(frame => {
      frameData.push(p5.loadImage(frame.data));
    })
  }

  const setup = (p5, parent) => {
    p5.createCanvas(width, height).parent(parent);
    p5.background(0);
    p5.frameRate(framerate);

    // Resize all frames so that they fill up width of canvas
    // add black bars top and bottom.
    frameData.map(frame => {
      frame.resize(width, 0);
    });
  };

  const draw = (p5) => {
    p5.background(0);

    // Figure out y position to draw from by taking difference between
    // height of viewport and height of image and then dividing by two.
    const image = frameData[frameCount];
    const y = Math.floor((height - image.height) / 2);

    p5.image(image, 0, y);

    setProgress(frameCount / frameData.length);

    if (mode !== "playing") {
      return;
    }

    elapsedTime += p5.deltaTime;

    if (elapsedTime > delay) {
      elapsedTime = 0;
      frameCount += 1;
    }

    if (frameCount >= frameData.length) {
      if (looping) {
        frameCount = 0;
      } else {
        setMode("stopped");
      }
    }
  }

  return (
    <div ref={ref} onClick={onClick} className="AnimationCanvas hover:cursor-pointer">
      {/* TODO(kosi): Figure out a non hacky way besides just waiting for width and height not to be small. */}
      {width !== 0 && height !== 0 && <Sketch className="AnimationCanvas__container" preload={preload} setup={setup} draw={draw} />}
    </div>
  );
}

const AnimationPlayerControls = ({ mode, onPausePlayClick, looping, onLoopClick, isUpvoted, score }) => {
  return (
    <div className="AnimationPlayerControls">
      <div className="AnimationPlayerControls__left">
        <button onClick={onPausePlayClick} className="AnimationPlayerControls__play" title={mode !== "playing" ? "Play" : "Pause"}>
          {mode !== "playing" ? <TiMediaPlay className="w-6 h-6" /> : <TiMediaPause className="w-6 h-6" />}
        </button>
      </div>
      <div className="AnimationPlayerControls__right">
        <UpvoteButton score={score} active={isUpvoted} />
        <button onClick={onLoopClick} className="AnimationPlayerControls__loop" title={looping ? "Play once" : "Loop"}>
          {looping ? <TiArrowLoop className="w-6 h-6" /> : <CgPushRight className="w-6 h-6" />}
        </button>
        <button className="AnimationPlayerControls__swap" title="Swap to frame-by-frame mode">
          <AiOutlineSwap className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

const AnimationProgress = ({ progress }) => {
  const onClick = (e) => {
    e.preventDefault();

    const location = e.nativeEvent.offsetX;
    const newProgress = location / width;

    if (frameData.length > 0) {
      frameCount = Math.round(newProgress * frameData.length);
    }
  };

  const [ref, { width }] = useMeasure();

  return (
    <div onClick={onClick} ref={ref} className="AnimationProgress">
      <span style={{ width: `${progress * 100}%` }} className="AnimationProgress__played"></span>
    </div>
  );
}

const AnimationPlayer = ({ frames, framerate, thumbnail, score, upvoters }) => {
  const [mode, setMode] = React.useState("stopped");
  const [progress, setProgress] = React.useState(0);
  const [looping, setLooping] = React.useState(true);
  const { userId } = useUser();
  const isUpvoted = upvoters.includes(userId);

  const onThumbnailClick = () => {
    setMode(mode => mode === "stopped" ? "playing" : mode);
  }

  const onLoopClick = () => {
    setLooping(!looping);
  }

  const onPausePlayClick = () => {
    switch (mode) {
      case "stopped":
        setMode("playing");
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
            framerate={framerate}
            frames={frames}
            looping={looping}
            mode={mode}
            onClick={onPausePlayClick}
            setProgress={setProgress}
            setMode={setMode}
          />
        );
    }
  }

  return (
    <div className="AnimationPlayer">
      {renderViewport()}
      <AnimationProgress
        progress={progress}
      />
      <AnimationPlayerControls
        isUpvoted={isUpvoted}
        score={score}
        onPausePlayClick={onPausePlayClick}
        onLoopClick={onLoopClick}
        looping={looping}
        mode={mode}
      />
    </div>
  );
}

export default AnimationPlayer;