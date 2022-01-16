import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "753689922635-os8bde4plqrgt60mt3bor7f5kumnjbti.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  const profileLink = "/profile/" + userId;
  return (
    <nav className="NavBar-container">
      <div className="Navbar-left">
        <Link to="/" className="NavBar-link">Discover</Link>
      </div>

      <div className="NavBar-center">
        <Link className="NavBar-title" to="/">
          Imaginate
        </Link>
      </div>

      <div className="NavBar-right">
        {userId ? (
          <div style={{'display': 'flex', 'height': '100%'}}>
            <Link className="NavBar-link" to={profileLink}>
              Profile
            </Link>

            <GoogleLogout
              className="NavBar-login"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              onFailure={(err) => console.log(err)}
            />
          </div>
        ) : (
          <GoogleLogin
            className="NavBar-login"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
