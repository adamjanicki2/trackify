import { useEffect, useState } from "react";
import CopyButton from "src/components/CopyButton";
import useAccessToken from "src/hooks/useAccessToken";
import useAlert from "src/hooks/useAlert";
import { getTopTracks } from "src/util";
import Image from "src/components/Image";

const NUMBER_OF_TRACKS = 10;

function getCopyText(tracks: any[]) {
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

export default function TopTracks() {
  const { accessToken, setAccessToken } = useAccessToken();
  const { setAlert } = useAlert();
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    const setup = async () => {
      const res = await getTopTracks(accessToken);
      if (res?.items) {
        setTracks(res.items);
      } else {
        setAlert({
          type: "error",
          message: "Failed to fetch from Spotify API. Try signing in again.",
        });
        setAccessToken(null);
      }
    };
    setup();
  }, [setAlert, accessToken, setAccessToken]);

  if (!tracks || !tracks.length) return null;

  const copyText = getCopyText(tracks);
  return (
    <section id="tracks">
      <div className="flex flex-column pa4">
        <div className="flex items-center justify-center mb3">
          <h1 className="mr2 mv0">Top Tracks</h1>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(copyText);
              setAlert({ type: "success", message: "Copied top tracks!" });
            }}
          />
        </div>
        <div className="flex flex-row flex-wrap justify-center m-auto">
          {tracks.slice(0, NUMBER_OF_TRACKS).map((track, index) => (
            <Track track={track} rank={index + 1} key={`track${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Track({ track, rank }: { track: any; rank: number }) {
  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noreferrer"
      className="no-underline black ma2"
    >
      <div
        className="flex flex-column items-center ba br2 b--light-gray"
        style={{ maxWidth: 300 }}
      >
        <Image src={track.album.images[0].url} rank={rank} />
        <div className="flex flex-column tc pv2">
          <div className="f4 fw6">{track.name}</div>
          <div className="f5 fw5 i">
            {track.artists.map((artist: any) => artist.name).join(" & ")}
          </div>
          <div className="f5 fw5 dark-gray">
            {track.album.release_date.split("-")[0]}
          </div>
        </div>
      </div>
    </a>
  );
}
