import React from "react";
import { Link, navigate } from "@reach/router";

import AnimationPlayer from "../modules/watch/AnimationPlayer";
import ActivityFeed from "../modules/watch/ActivityFeed";
import ButtonWithIcon from "../modules/ButtonWithIcon";
import Spinner from "../modules/Spinner";
import DeleteDialog from "../modules/dialog/DeleteDialog";
import ForkDialog from "../modules/dialog/ForkDialog";

import useAnimation from "../../lib/hooks/useAnimation";
import useAuth from "../../lib/hooks/useAuth";

import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { CgGitFork } from "react-icons/cg";

const Watch = ({ id }) => {
  const { animation, deleteAnimation, forkAnimation, updateSettings } = useAnimation(id);
  const { userId } = useAuth();
  const [frame, setFrame] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openFork, setOpenFork] = React.useState(false);
  const [defaultFrame, setDefaultFrame] = React.useState(0);

  if (!animation) {
    return <div className="Page Page--Loading"><Spinner /></div>;
  }

  const owner = userId === animation.creator._id;

  const ButtonGroup = () => {
    const roundedFrame = Math.min(animation.frames.length - 1, Math.floor(frame));

    React.useEffect(() => {
      setDefaultFrame(roundedFrame);
    }, [roundedFrame]);

    return (
      <div className="Watch__ButtonGroup">
        <ButtonWithIcon onClick={() => navigate(`/edit/${animation._id}`)} Icon={HiPencilAlt} disabled={!userId} text="Edit" />
        <ButtonWithIcon onClick={() => setOpenFork(true)} Icon={CgGitFork} disabled={!userId} text="Fork" />
        <ButtonWithIcon onClick={() => setOpenDelete(true)} Icon={HiTrash} disabled={!owner} text="Delete" />
      </div>
    );
  }

  return (
    <main className="Page Page--Watch">
      <section className="Watch__section Watch__section--left">
        <AnimationPlayer owner={owner} updateSettings={updateSettings} onFrameChanged={(value) => setFrame(value)} animation={animation} />
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
      <section className="Watch__section Watch__section--right">
        <ActivityFeed animationId={animation._id} />
      </section>
      <>
        <DeleteDialog
          onDelete={() => deleteAnimation().then(() => setOpenDelete(false))}
          open={openDelete}
          setOpen={setOpenDelete}
        />
        <ForkDialog
          defaultValues={{frame: defaultFrame + 1}}
          onSubmit={(values) => forkAnimation(values).then(() => setOpenFork(false))}
          min={1}
          max={animation.frames.length}
          open={openFork}
          setOpen={setOpenFork}
        />
      </>
    </main>
  );
};

export default Watch;
