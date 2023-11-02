import { useEffect, useState } from "react";
import CopyButton from "src/components/CopyButton";
import useAccessToken from "src/hooks/useAccessToken";
import useAlert from "src/hooks/useAlert";
import { getTopArtists } from "src/util";

const NUMBER_OF_ARTISTS = 10;

function getCopyText(artists: any[]) {
  let output = "My Top Artists\n";
  artists.slice(0, NUMBER_OF_ARTISTS).forEach((artist, index) => {
    const rank = index + 1;
    const { name } = artist;
    output += `#${rank} ${name}\n\n`;
  });
  return output;
}

export default function TopArtists() {
  const { accessToken } = useAccessToken();
  const { setAlert } = useAlert();
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    const setup = async () => {
      const res = await getTopArtists(accessToken);
      if (res?.items) {
        setArtists(res.items);
      } else {
        setAlert({
          type: "error",
          message: "Failed to fetch from Spotify API",
        });
      }
    };
    setup();
  }, []);

  if (!artists || !artists.length) return null;

  const copyText = getCopyText(artists);
  return (
    <section id="artists">
      <div className="flex flex-column gradient-two pa4">
        <div className="flex items-center justify-center mb3">
          <h1 className="mr2 mv0">Top Tracks</h1>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(copyText);
              setAlert({ type: "success", message: "Copied top artists!" });
            }}
          />
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
                  <img
                    src={artist.images[0].url}
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
                  <div className="f4 fw4">{artist.name}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
