import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const NUMBER_OF_ARTISTS = 10;

function getCopyText(artists) {
  let output = "My Top Artists\n";
  artists.slice(0, NUMBER_OF_ARTISTS).forEach((artist, index) => {
    const rank = index + 1;
    const { name } = artist;
    output += `#${rank} ${name}\n\n`;
  });
  return output;
}

export default function TopArtists(props) {
  const { artists } = props;
  const copyText = getCopyText(artists);
  return (
    <div className="flex flex-column gradient-two pa4">
      <div className="top-display tc mb3">
        Top Artists
        <CopyToClipboard text={copyText}>
          <IconButton style={{ marginLeft: 8 }}>
            <Tooltip title="Copy Top Artists" style={{ color: "black" }} arrow>
              <ContentCopyIcon style={{ color: "black" }} />
            </Tooltip>
          </IconButton>
        </CopyToClipboard>
      </div>
      <div className="flex flex-row flex-wrap justify-center m-auto">
        {artists.slice(0, NUMBER_OF_ARTISTS).map((artist, index) => (
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            key={`artist${index}`}
            rel="noreferrer"
            className="no-underline black dim tracks-width"
          >
            <div className="flex flex-column items-center ma1">
              <div className="flex flex-row items-center">
                <div className="f2 b ph3 bg-lightest-blue br3 gradient-one near-white ma2">
                  {index + 1}
                </div>
                <img src={artist.images[0].url} className="mh3 br2 img-size" />
                <div
                  className="f2 b ph3 bg-lightest-blue br3 gradient-one near-white ma2"
                  style={{ visibility: "hidden" }}
                >
                  {index + 1}
                </div>
              </div>

              <div className="flex flex-column tc">
                <div className="f4 fw4">{artist.name}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
