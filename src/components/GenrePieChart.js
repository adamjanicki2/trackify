import ReactApexChart from "react-apexcharts";

export default function GenrePieChart(props) {
  const { artists } = props;
  const genresToNumber = {};
  const genresToArtists = {};
  const images = [];
  artists.forEach((artist) => {
    const artistName = artist.name;
    artist.genres.forEach((genre) => {
      const currentNum = genresToNumber[genre] ?? 0;
      const currentMembers = genresToArtists[genre] ?? [];
      if (!currentMembers.includes(artistName)) {
        currentMembers.push(artistName);
        images.push(artist.images[1].url);
      }
      genresToNumber[genre] = currentNum + 1;
      genresToArtists[genre] = currentMembers;
    });
  });
  const sortedEntries = Object.entries(genresToNumber).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="m-auto flex flex-column pa4" style={{ width: "60%" }}>
      <div className="top-display tc">Spotipie</div>
      <ReactApexChart
        options={{
          chart: {
            type: "pie",
          },
          plotOptions: {
            pie: {
              startAngle: 0,
              endAngle: 360,
            },
          },
          dataLabels: {
            enabled: true,
          },
          fill: {
            type: "gradient",
          },
          labels: sortedEntries.map(([genre, number]) => genre),
          colors: [
            "#3182bd",
            "#6baed6",
            "#9ecae1",
            "#c6dbef",
            "#e6550d",
            "#fd8d3c",
            "#fdae6b",
            "#fdd0a2",
            "#31a354",
            "#74c476",
            "#a1d99b",
            "#c7e9c0",
            "#756bb1",
            "#9e9ac8",
            "#bcbddc",
            "#dadaeb",
            "#636363",
            "#969696",
            "#bdbdbd",
            "#d9d9d9",
            "#393b79",
            "#5254a3",
            "#6b6ecf",
            "#9c9ede",
            "#637939",
            "#8ca252",
            "#b5cf6b",
            "#cedb9c",
            "#8c6d31",
            "#bd9e39",
            "#e7ba52",
            "#e7cb94",
            "#843c39",
            "#ad494a",
            "#d6616b",
            "#e7969c",
            "#7b4173",
            "#a55194",
            "#ce6dbd",
            "#de9ed6",
          ],
          legend: {
            show: true,
            formatter: function (val, opts) {
              return sortedEntries[opts.seriesIndex][0];
            },
            tooltipHoverFormatter: function (val, opts) {
              return sortedEntries[opts.seriesIndex][0];
            },
          },
        }}
        series={sortedEntries.map(([genre, amount]) => amount)}
        type="pie"
      />
    </div>
  );
}
