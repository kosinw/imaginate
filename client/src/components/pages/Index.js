import React from "react";
import axios from "axios";
import tw, { styled } from "twin.macro";

import AnimationPreview from "../modules/common/AnimationPreview";

// TODO(kosi): Replace this with an actual webm.
const parseAnimationData = (animation) => {
  return animation.frames[0].data;
}

const IndexCardGridView = () => {
  const [animations, setAnimations] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const animations = await axios.get("/api/animations/")
        .catch(error => {
          // TODO(kosi): Error handling
          return;
        });
      setAnimations(animations.data);
    })();
  }, []);
  return (
    <div tw="grid grid-cols-1 gap-y-8 md:(grid-cols-2 gap-x-6 gap-y-12) lg:(grid-cols-4)">
      {animations.map(animation => <AnimationPreview data={parseAnimationData(animation)} />)}
    </div>
  );
}

const StyledInput = styled.input(() => [
  tw`border-b-2`,
  tw`focus:outline-none`,
  tw`px-2`,
  tw`py-1.5`,
  tw`text-lg`,
  tw`placeholder:text-black`,
  tw`placeholder:font-bold`,
  tw`rounded-sm`,
  tw`font-mono`,
  tw`border-black`,
  tw`border-solid`
]);

const IndexSearchView = () => {
  return (
    <div tw="py-16 flex items-center justify-center">
      <StyledInput placeholder="Search..." />
    </div>
  )
};

const Index = ({ userId }) => {
  return (
    <div tw="container mx-auto">
      <IndexSearchView />
      <IndexCardGridView />
    </div>
  );
};

export default Index;
