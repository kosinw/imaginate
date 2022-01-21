import React from "react";
import { Link } from "@reach/router";
import useAuth from "../../lib/hooks/useAuth";

/**
 * The navigation bar at the top of all pages.
 */
const NavBar = () => {
  const { googleSignIn, googleSignOut, userId } = useAuth();

  const profileLink = "/profile/" + userId;
  return (
    <nav className="NavBar-container">
      <div className="Navbar-left">
        <Link className="NavBar-title" to="/">
          Imaginate
        </Link>
      </div>

      <div className="NavBar-right">
        <div style={{ display: "flex", height: "100%" }}>
          <Link className="NavBar-link" to={"/search"}>
            Search
          </Link>
          {userId ? (
            <>
              <Link className="NavBar-link" to={profileLink}>
                Profile
              </Link>
              <Link to="/create" className="NavBar-link">
                Create
              </Link>
              <button onClick={googleSignOut} className="NavBar-link">
                  Sign Out
              </button>
            </>
          ) : (
            <button onClick={googleSignIn} className="NavBar-link">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
