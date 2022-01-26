import React from "react";
import classnames from "classnames";

const Slider = (props) => {
  const {
    min,
    max,
    value,
    onChange,
    onBeforeChange,
    round,
    onAfterChange,
    className
  } = props;

  const eventParams = { passive: false };

  const root = React.useRef(null);

  const handleInput = (e) => {
    e.preventDefault();
    const bounds = root.current.getBoundingClientRect();
    const point = e.touches ? e.changedTouches[0] : e;
    const dist = Math.max(Math.min(point.clientX - bounds.left, bounds.width), 0);
    const percent = (1 / bounds.width) * dist;
    const newValue = ((props.max - props.min) * percent) - props.min;
    onChange(round ? Math.round(newValue) : newValue);
  }

  const handleMouseUp = (e) => {
    handleInput(e);
    document.removeEventListener('mousemove', handleInput, eventParams);
    document.removeEventListener('mouseup', handleMouseUp, eventParams);
    document.removeEventListener('touchmove', handleInput, eventParams);
    document.removeEventListener('touchend', handleMouseUp, eventParams);
    onAfterChange(e);
  }

  const handleMouseDown = (e) => {
    onBeforeChange(e);
    handleInput(e);
    document.addEventListener('mousemove', handleInput, eventParams);
    document.addEventListener('mouseup', handleMouseUp, eventParams);
    document.addEventListener('touchmove', handleInput, eventParams);
    document.addEventListener('touchend', handleMouseUp, eventParams);
  }

  const _value = Math.max(min, Math.min(max, value));
  const progress = ((_value - min) / (max - min)) * 100;

  return (
    <div
      ref={root}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      className={classnames("Slider", className)}
    >
      <div className="Slider__bar">
        <div className="Slider__progress" style={{ left: 0, width: `${progress}%` }}></div>
        <div className="Slider__handle" style={{ left: `${progress}%` }}></div>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  round: false,
  onChange: function () { },
  onBeforeChange: function () { },
  onAfterChange: function () { },
};

export default Slider;