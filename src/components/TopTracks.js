export default function TopTracks(props) {
  const { tracks } = props;
  const imgUrl = tracks[0].album.images[1].url;
  return (
    <div className="flex flex-column gradient-one pa4">
      <div className="top-display tc">Top Tracks</div>
      <div className="flex flex-column m-auto">
        {tracks.slice(0, 10).map((track, index) => (
          <div
            className="flex flex-row flex-wrap items-center ma1 w-100"
            key={`toptrack${index}`}
          >
            <div className="f2 fw4">#{index + 1}</div>
            <img src={track.album.images[0].url} className="mh3 br2 img-size" />
            <div className="flex flex-column">
              <div className="f4 fw4">{track.name}</div>
              <div className="f5 fw4">
                {track.artists.map((artist) => artist.name).join(" & ")}
              </div>
              <div className="f5 fw3">
                {track.album.release_date.split("-")[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
