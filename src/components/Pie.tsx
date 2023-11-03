import { Chart } from "react-google-charts";

type Props = {
  artists: any[];
};

function getStats(artists: any[]) {
  const genresToNumber: Record<string, number> = {};
  const genresToArtists: Record<string, Set<string>> = {};
  artists.forEach((artist) => {
    const artistName = artist.name;
    artist.genres.forEach((genre: string) => {
      const currentNum = genresToNumber[genre] ?? 0;
      const currentMembers = genresToArtists[genre] ?? new Set();
      currentMembers.add(artistName);
      genresToNumber[genre] = currentNum + 1;
      genresToArtists[genre] = currentMembers;
    });
  });
  const sortedEntries = Object.entries(genresToNumber).sort(
    (a, b) => b[1] - a[1]
  );
  return sortedEntries;
}

export default function Pie({ artists }: Props) {
  const stats = getStats(artists);
  return (
    <section id="genres">
      <div className="flex flex-column items-center pv4 ph1">
        <h1 className="mv0">Spotipie</h1>
        <Chart
          width={"100%"}
          height={"800px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[["Genre", "Number of Artists"], ...stats]}
          options={{
            pieSliceText: "label",
            is3D: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </section>
  );
}
