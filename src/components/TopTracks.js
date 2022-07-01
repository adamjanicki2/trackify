import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const NUMBER_OF_TRACKS = 10;

function getCopyText(tracks) {
  let output = "My Top Tracks\n";
  tracks.slice(0, NUMBER_OF_TRACKS).forEach((track, index) => {
    const rank = index + 1;
    const { name, artists, album } = track;
    output += `#${rank} ${name}\n${artists[0].name} (${
      album.release_date.split("-")[0]
    })\n\n`;
  });
  return output;
}

export default function TopTracks(props) {
  const { tracks } = props;
  const copyText = getCopyText(tracks);
  return (
    <div className="flex flex-column gradient-one pa4">
      <div className="top-display tc mb3">
        Top Tracks
        <CopyToClipboard text={copyText}>
          <IconButton style={{ marginLeft: 8 }}>
            <Tooltip title="Copy Top Tracks" style={{ color: "black" }} arrow>
              <ContentCopyIcon style={{ color: "black" }} />
            </Tooltip>
          </IconButton>
        </CopyToClipboard>
      </div>
      <div className="flex flex-row flex-wrap justify-center m-auto">
        {tracks.slice(0, NUMBER_OF_TRACKS).map((track, index) => (
          <a
            href={track.external_urls.spotify}
            target="_blank"
            key={`toptrack${index}`}
            rel="noreferrer"
            className="no-underline black dim tracks-width"
          >
            <div className="flex flex-column items-center ma1">
              <div className="flex flex-row items-center">
                <div className="f2 b ph3 bg-lightest-blue br3 gradient-one near-white ma2">
                  {index + 1}
                </div>
                <img
                  src={track.album.images[0].url}
                  className="mh3 br2 img-size"
                />
                <div
                  className="f2 b ph3 bg-lightest-blue br3 gradient-one near-white ma2"
                  style={{ visibility: "hidden" }}
                >
                  {index + 1}
                </div>
              </div>

              <div className="flex flex-column tc">
                <div className="f4 fw4">{track.name}</div>
                <div className="f5 fw4">
                  {track.artists.map((artist) => artist.name).join(" & ")}
                </div>
                <div className="f5 fw3">
                  {track.album.release_date.split("-")[0]}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
