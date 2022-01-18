import React from "react";
import { HiArrowSmUp } from "react-icons/hi";
import classnames from "classnames";

const UpvoteButton = ({ score, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      title="Upvote"
      aria-label={active ? "Remove upvote" : "Upvote"}
      className={classnames({ "UpvoteButton": true, "UpvoteButton--active": active })}>
      <HiArrowSmUp />
      <span className="UpvoteButon__counter">
        {score}
      </span>
    </button>
  );
}

export default UpvoteButton;