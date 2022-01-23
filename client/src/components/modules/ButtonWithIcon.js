import classnames from "classnames";
import React from "react";

const ButtonWithIcon = ({ Icon, text, className, onClick, ...rest }) => {
  return (
    <button {...rest} onClick={onClick} className={classnames(className, "ButtonWithIcon")}>
      {!!Icon && <Icon className="ButtonWithIcon__icon" />}
      <span className="ButtonWithIcon__text">{text}</span>
    </button>
  );
}

ButtonWithIcon.defaultProps = {
  Icon: null,
  text: '',
  className: '',
  onClick: function () {}
}

export default ButtonWithIcon;