import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "chart.js/auto";
Chart.register(ArcElement);

const COLORS = [
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
];

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
  const data = {
    labels: sortedEntries.map((entry) => entry[0]),
    datasets: [
      {
        data: sortedEntries.map((entry) => entry[1]),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
        borderColor: "white",
        radius: "100%",
      },
    ],
  };
  const totalCount = sortedEntries.reduce((prev, cur) => prev + cur[1], 0);
  return (
    <div className="flex m-auto flex-column pa4 pie-width">
      <div className="top-display tc">Spotipie</div>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                color: "#111111",
                font: {
                  size: 16,
                  family: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Helvetica Neue"',
                    "sans-serif",
                  ],
                },
              },
            },
            tooltip: {
              boxPadding: 4,
              font: {
                family: [
                  "-apple-system",
                  "BlinkMacSystemFont",
                  '"Helvetica Neue"',
                  "sans-serif",
                ],
              },
              callbacks: {
                label: function (context) {
                  const percentage = ((context.raw * 100) / totalCount).toFixed(
                    1
                  );
                  return `${context.label} (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
