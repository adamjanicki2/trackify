import logo from "../img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
library.add(faSpotify);
const CLIENT_ID = "d8ecd427f0084477b9e93984121de707";
const LINK_BASE = "https://accounts.spotify.com/authorize?";
const SCOPES = [
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  "playlist-read-private",
];
const REDIRECT_URI = "https://adamjanicki2.github.io/trackify";
// const REDIRECT_URI = "http://localhost:3000";
const PARAMS = {
  client_id: CLIENT_ID,
  response_type: "token",
  redirect_uri: REDIRECT_URI,
  scope: SCOPES.join(" "),
  show_dialog: true,
};

export default function Nav(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm`}
      id="mainNav"
    >
      <div className="container px-5">
        <div className="flex flex-row items-center">
          <img src={logo} width="64px" height="44px" alt="Trackify" />
          <a href="#home" className="b f3 black no-underline navbar-brand">
            Trackify
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="bi-list"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li className="nav-item">
              <a className="nav-link me-lg-3" href="#about">
                About
              </a>
            </li>
            {props.showData && (
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#tracks">
                  Tracks
                </a>
              </li>
            )}
            {props.showData && (
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#artists">
                  Artists
                </a>
              </li>
            )}
            {props.showData && (
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#spotipie">
                  Spotipie
                </a>
              </li>
            )}
          </ul>
          <button
            className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
            data-bs-toggle="modal"
            data-bs-target="#feedbackModal"
            onClick={() => {
              if (props.loggedIn) {
                window.location.hash = "";
                window.location.reload();
              } else {
                window.location.href = `${LINK_BASE}${new URLSearchParams(
                  PARAMS
                )}`;
              }
            }}
          >
            <span className="d-flex align-items-center">
              <span className="small">
                Sign {props.loggedIn ? "out of" : "into"} Spotify
              </span>
              <FontAwesomeIcon
                icon="fa-brands fa-spotify"
                className="ml1 white"
              />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
