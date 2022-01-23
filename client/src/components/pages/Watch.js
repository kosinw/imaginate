import React from "react";
import classnames from "classnames";
import { Link, navigate } from "@reach/router";

import AnimationPlayer from "../modules/watch/AnimationPlayer";
import ButtonWithIcon from "../modules/ButtonWithIcon";
import useAnimation from "../../lib/hooks/useAnimation";
import useAuth from "../../lib/hooks/useAuth";

import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { CgGitFork } from "react-icons/cg";

const Watch = ({ id }) => {
  const { animation } = useAnimation(id);
  const { userId } = useAuth();
  const [frame, setFrame] = React.useState(0);

  if (!animation) {
    return <div className="Watch">Loading...</div>;
  }

  const owner = userId === animation.creator._id;

  const ButtonGroup = () => {
    const roundedFrame = Math.min(animation.frames.length - 1, Math.floor(frame));

    return (
      <div className="Watch__ButtonGroup">
        <ButtonWithIcon onClick={() => navigate(`/edit/${animation._id}`)} Icon={HiPencilAlt} disabled={!owner} text="Edit" />
        <ButtonWithIcon onClick={() => navigate(`/fork/${animation._id}/${roundedFrame}`)} Icon={CgGitFork} disabled={!userId} text="Fork" />
        <ButtonWithIcon Icon={HiTrash} disabled={!owner} text="Delete" />
      </div>
    );
  }

  const TagsGroup = ({ tags }) => {
    const Tag = ({ text }) => {
      const colors = [
        ["bg-red-200", "text-red-900"],
        ["bg-orange-200", "text-orange-900"],
        ["bg-violet-200", "text-violet-900"],
        ["bg-lime-200", "text-lime-900"],
        ["bg-green-200", "text-green-900"],
        ["bg-cyan-200", "text-cyan-900"],
        ["bg-sky-200", "text-sky-900"],
        ["bg-indigo-200", "text-indigo-900"],
        ["bg-fuchsia-200", "text-fuchsia-900"],
      ];

      const color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <span onClick={() => navigate(`/search/${encodeURIComponent(text)}`)} className={classnames("Tag", color)}>
          {text}
        </span>
      );
    };

    return (
      <div className="TagsGroup">
        {tags.map(tag => <Tag text={tag} key={tag} />)}
      </div>
    );
  };

  return (
    <main className="Page Page--Watch">
      <section className="Watch__section Watch__section--left">
        <AnimationPlayer onFrameChanged={(value) => setFrame(value)} animation={animation} />
        <div className="Watch__info">
          <h4 className="Watch__title">
            "{animation.title}"{" "}by{" "}
            <Link className="Watch__link" to={`/profile/${animation.creator._id}`}>
              {animation.creator.name}
            </Link>
          </h4>
          <ButtonGroup />
        </div>
        <div className="Watch__TagsContainer">
          {/* <TagsGroup tags={tags} /> */}
        </div>
      </section>
    </main>
  );
};

export default Watch;
