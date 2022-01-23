import React from "react";
import { Link } from "@reach/router";

import UpvoteButton from "./UpvoteButton";

export const AnimationPreviewSkeleton = () => {
  return (
    <div className="AnimationPreview AnimationPreview--Skeleton">
      <div className="AnimationPreview__thumbnail AnimationPreview__thumbnail--Skeleton" />
      <div className="AnimationPreview__info AnimationPreview__info--Skeleton">
        <div className="AnimationPreview__creator AnimationPreview__creator--Skeleton" />
        <div className="AnimationPreview__button AnimationPreview__button--Skeleton" />
      </div>
    </div>
  );
};

const AnimationPreview = ({ animation }) => {
  return (
    <div className="AnimationPreview">
      <Link className="AnimationPreview__thumbnail-container" to={`/watch/${animation._id}`}>
        <div className="AnimationPreview__thumbnail" style={{ backgroundImage: `url(${animation.thumbnail})` }} />
      </Link>
      <div className="AnimationPreview__info">
        <Link className="AnimationPreview__creator" to={`/profile/${animation.creator._id}`}>
          {animation.creator.name}
        </Link>
        <UpvoteButton className="AnimationPreview__button" animationId={animation._id} />
      </div>
    </div>
  );
};

export default AnimationPreview;
