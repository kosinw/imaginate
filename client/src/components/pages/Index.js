import React from "react";
import tw, { styled } from "twin.macro";

const DebugBox = styled.div(() => [
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

const IndexCardGridView = () => {
  return (
    <div tw="grid grid-cols-1 gap-y-8 md:(grid-cols-2 gap-x-6 gap-y-12) lg:(grid-cols-3)">
      {[...Array(25)].map((x) => <DebugBox key={x} />)}
    </div>
  );
}

const StyledInput = styled.input(() => [
  tw`border-2`,
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
