export default function TopArtists(props) {
  const { artists } = props;
  return (
    <div className="flex flex-column gradient-two pa4">
      <div className="top-display tc">Top Artists</div>
      <div className="flex flex-column m-auto">
        {artists.slice(0, 10).map((artist, index) => (
          <div
            className="flex flex-row flex-wrap items-center ma1"
            key={`topartist${index}`}
          >
            <div className="f2 fw4">#{index + 1}</div>
            <img src={artist.images[0].url} className="mh3 br2 img-size" />
            <div className="f3 fw2"> {artist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
