import { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as Cloud } from "src/img/cloud.svg";
import useAccessToken from "src/hooks/useAccessToken";

const CLIENT_ID = "d8ecd427f0084477b9e93984121de707";
const LINK_BASE = "https://accounts.spotify.com/authorize?";
const SCOPES = [
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  "playlist-read-private",
] as const;

const PARAMS = {
  client_id: CLIENT_ID,
  response_type: "token",
  redirect_uri: window.location.href,
  scope: SCOPES.join(" "),
  show_dialog: true,
} as const;

const HEIGHT = 80;
type Props = {
  title: String;
  onClose: () => void;
};

const Navlink = ({ title, onClose }: Props) => (
  <li className="nav-item">
    <a className="navlink" href={`#${title.toLowerCase()}`} onClick={onClose}>
      <span>{title}</span>
    </a>
  </li>
);

type ButtonProps = {
  type: "login" | "logout";
  setAccessToken: (token: string | null) => void;
};
const Button = ({ type, setAccessToken }: ButtonProps) => {
  return (
    <li className="nav-item">
      <button
        style={{ borderRadius: 9999 }}
        onClick={() => {
          if (type === "logout") {
            setAccessToken(null);
          } else {
            window.location.href = `${LINK_BASE}${new URLSearchParams(
              PARAMS as any
            )}`;
          }
        }}
      >
        <span className="flex items-center">
          <span className="white fw5 f6">
            Sign {type === "logout" ? "out of" : "into"} Spotify
          </span>
          <FontAwesomeIcon icon={faSpotify} className="ml1 white" />
        </span>
      </button>
    </li>
  );
};

const Nav = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const isLoggedIn = !!accessToken;

  return (
    <>
      <nav
        className="flex items-center justify-between nav"
        id="nav"
        style={{ zIndex: 100 }}
      >
        <div className="flex items-center justify-between bar-container">
          <div className="flex items-center" style={{ height: HEIGHT }}>
            <a href="#home" className="flex items-center">
              <span className="f4 fw8 i mr2 mobile-hide">Trackify</span>
              <Cloud height="32px" />
            </a>
          </div>
          <div className="mobile">
            <Hamburger
              toggled={open}
              onToggle={() => setOpen(!open)}
              direction="right"
              size={27}
              rounded
            />
          </div>
        </div>
        <ul
          className={`flex items-center mobile-hide ${open ? "flex-imp" : ""}`}
        >
          {isLoggedIn && (
            <>
              <Navlink title="Tracks" onClose={closeMenu} />
              <Navlink title="Artists" onClose={closeMenu} />
              <Navlink title="Genres" onClose={closeMenu} />
              <Navlink title="About" onClose={closeMenu} />
            </>
          )}
          <Button
            type={isLoggedIn ? "logout" : "login"}
            setAccessToken={setAccessToken}
          />
        </ul>
      </nav>
      <div id="home" style={{ height: HEIGHT }} />
    </>
  );
};

export default Nav;
