import React from "react";
import { HiArrowDown } from "react-icons/hi";

import Spinner from "./Spinner";
import AnimationPreview, { AnimationPreviewSkeleton } from "./AnimationPreview";

const AnimationPreviewGridView = ({ animations, infinite }) => {
  if (!animations) {
    return (
      <div className="AnimationPreviewGridView">
        {[...Array(12).keys()].map((x) => (
          <AnimationPreviewSkeleton key={x} />
        ))}
      </div>
    );
  }

  if (!animations.length) {
    return (
      <div className="AnimationPreviewGridView">
        <p className="AnimationPreviewGridView__center-text">No Animations</p>
      </div>
    );
  }

  return (
    <div className="AnimationPreviewGridViewContainer">
      <div className="AnimationPreviewGridView">
        {animations.map((animation) => (
          <AnimationPreview key={animation._id} animation={animation} />
        ))}
      </div>
      {
        !!infinite && !infinite.isReachingEnd &&
        <>
          <button
            disabled={infinite.isLoadingMore || infinite.isReachingEnd}
            onClick={() => infinite.setSize(infinite.size + 1)}
            title="Load more"
            className="text-secondary-200 hover:text-primary py-1 p-4 self-center transition-colors"
          >
            {infinite.isLoadingMore ? <Spinner className="w-5 h-5" /> : <HiArrowDown className="w-5 h-5 animate-bounce" />}
          </button>
        </>
      }
    </div>
  );
};

AnimationPreviewGridView.defaultProps = {
  animations: [],
  infinite: null
};

export default AnimationPreviewGridView;
