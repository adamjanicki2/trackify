import { useEffect, useState } from "react";
import CopyButton from "src/components/CopyButton";
import useAccessToken from "src/hooks/useAccessToken";
import useAlert from "src/hooks/useAlert";
import { getTopArtists } from "src/util";
import Image from "src/components/Image";

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
  }, [accessToken, setAlert]);

  if (!artists || !artists.length) return null;

  const copyText = getCopyText(artists);
  return (
    <section id="artists">
      <div className="flex flex-column gradient-two pa4">
        <div className="flex items-center justify-center mb3">
          <h1 className="mr2 mv0">Top Artists</h1>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(copyText);
              setAlert({ type: "success", message: "Copied top artists!" });
            }}
          />
        </div>
        <div className="flex flex-row flex-wrap justify-center m-auto">
          {artists.slice(0, NUMBER_OF_ARTISTS).map((artist, index) => (
            <Artist artist={artist} rank={index + 1} key={`artist${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Artist({ artist, rank }: { artist: any; rank: number }) {
  return (
    <a
      href={artist.external_urls.spotify}
      target="_blank"
      rel="noreferrer"
      className="no-underline black ma2"
    >
      <div className="flex flex-column items-center ba br2 b--light-gray">
        <Image src={artist.images[0].url} rank={rank} />
        <div className="flex flex-column tc pv2">
          <div className="f4 fw6">{artist.name}</div>
        </div>
      </div>
    </a>
  );
}
