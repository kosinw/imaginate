import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "753689922635-os8bde4plqrgt60mt3bor7f5kumnjbti.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container">
      <Link className="NavBar-title" to="/">
        Imaginate
      </Link>
      <Link className="NavBar-profile" to="/profile">
        Profile
      </Link>
      {userId ? (
        <GoogleLogout
          className="NavBar-login"
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          className="NavBar-login"
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )}
    </nav>
  );
};

export default NavBar;
