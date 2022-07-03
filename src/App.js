import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Subnav from "./components/Subnav";
import Footer from "./components/Footer";
import "./App.css";
import { retrieveAccessToken, getTopArtists, getTopTracks } from "./helpers";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";
import GenrePieChart from "./components/GenrePieChart";

export default function App() {
  const [accessToken, setAccessToken] = useState(undefined);
  // const [topTracksAllTime, setTopTracksAllTime] = useState([]);
  // const [topArtistsAllTime, setTopArtistsAllTime] = useState([]);
  // const [topTracksSixMonths, setTopTracksSixMonths] = useState([]);
  // const [topArtistsSixMonths, setTopArtistsSixMonths] = useState([]);
  const [topTracksRecent, setTopTracksRecent] = useState(undefined);
  const [topArtistsRecent, setTopArtistsRecent] = useState(undefined);

  useEffect(() => {
    const token = retrieveAccessToken();
    token && setAccessToken(token);
  }, [setAccessToken]);

  useEffect(() => {
    if (accessToken) {
      // getTopTracks(accessToken, "long_term").then((tracks) => {
      //   setTopTracksAllTime(tracks);
      // });
      // getTopTracks(accessToken, "medium_term").then((tracks) => {
      //   setTopTracksSixMonths(tracks);
      // });
      getTopTracks(accessToken, "short_term").then((tracks) => {
        setTopTracksRecent(tracks.items);
      });
      // getTopArtists(accessToken, "long_term").then((Artists) => {
      //   setTopArtistsAllTime(Artists);
      // });
      // getTopArtists(accessToken, "medium_term").then((Artists) => {
      //   setTopArtistsSixMonths(Artists);
      // });
      getTopArtists(accessToken, "short_term").then((artists) => {
        setTopArtistsRecent(artists.items);
      });
    }
  }, [accessToken]);

  return (
    <div id="home">
      <Nav
        loggedIn={accessToken || false}
        setAccessToken={setAccessToken}
        showData={accessToken || false}
      />
      {topTracksRecent && <div className="mt5"> </div>}
      <div id="tracks" className="mt4">
        {topTracksRecent && <TopTracks tracks={topTracksRecent} />}
      </div>
      <div id="artists">
        {topArtistsRecent && <TopArtists artists={topArtistsRecent} />}
      </div>
      <div id="spotipie">
        {topArtistsRecent && <GenrePieChart artists={topArtistsRecent} />}
      </div>
      <Subnav />
      <Footer />
    </div>
  );
}
