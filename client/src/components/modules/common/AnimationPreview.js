
import React from "react";
import tw, { styled } from "twin.macro";

const StyledBox = styled.div(() => [
  tw`border-solid`,
  tw`border-black`,
  tw`border-4`,
  tw`bg-gray-500`,
  tw`text-white`,
  tw`inline-flex`,
  tw`items-center`,
  tw`justify-center`,
  tw`rounded-sm`,
  'box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);',
  'aspect-ratio: 16 / 9;'
]);

// TODO(kosi): Replace this with a webm preview instead of static image.
const AnimationPreview = ({ data }) => {
  return (
    <StyledBox>
      <img src={data} tw="object-cover" />
    </StyledBox>
  );
}

export default AnimationPreview;
