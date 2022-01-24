import React from "react";
import { Link } from "@reach/router";

import CreateDialog from "./dialog/CreateDialog";

import useAuth from "../../lib/hooks/useAuth";
import useAnimations from "../../lib/hooks/useAnimations";

const Header = () => {
  const { loggedIn, userId, googleSignIn, googleSignOut } = useAuth();
  const { createAnimation } = useAnimations();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="Header">
        <div className="Header__item Header__item--left">
          <h1 className="Header__title"><Link to="/">Imaginate</Link></h1>
          <h2 className="Header__subtitle">by{" "}
            <span className="Header__link">Noah's Fan Club</span>
          </h2>
        </div>
        <div className="Header__item Header__item--right">
          <ul className="Header__navigation-items">
            {!loggedIn ?
              <>
                <li className="Header__navigation-item">
                  <button onClick={googleSignIn}>
                    Sign In
                  </button>
                </li>
              </> :
              <>
                <li className="Header__navigation-item">
                  <button onClick={() => setOpen(true)}>
                    Create
                  </button>
                </li>
                <li className="Header__navigation-item">
                  <Link to={`/profile/${userId}`}>
                    Profile
                  </Link>
                </li>
                <li className="Header__navigation-item">
                  <button onClick={googleSignOut}>
                    Sign Out
                  </button>
                </li>
              </>
            }
          </ul>
        </div>
      </header>
      <CreateDialog
        open={open}
        setOpen={setOpen}
        onSubmit={(values) => createAnimation(values).then(() => setOpen(false))}
      />
    </>
  )
};

export default Header;