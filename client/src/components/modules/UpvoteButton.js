import React from "react";
import { HiThumbUp } from "react-icons/hi";
import classnames from "classnames";

import useAnimation from "../../lib/hooks/useAnimation";
import useAuth from "../../lib/hooks/useAuth";

const UpvoteButton = ({ animationId }) => {
  const { userUpvoted, animation, upvote } = useAnimation(animationId);
  const { userId } = useAuth();

  const onClick = (e) => {
    e.stopPropagation();
    upvote();
  }

  return (
    <button
      onClick={onClick}
      disabled={!userId}
      type="button"
      title="Upvote"
      aria-label={userUpvoted ? "Remove upvote" : "Upvote"}
      className={classnames(
        "UpvoteButton",
        "disabled:text-gray-400",
        "space-x-2",
        { "UpvoteButton--active": userUpvoted, })}
    >
      <HiThumbUp className="w-4 h-4" />
      {!!animation &&
        <span className="UpvoteButon__counter">
          {animation.score}
        </span>
      }
    </button>
  );
}

export default UpvoteButton;