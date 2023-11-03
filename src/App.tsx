import qs from "qs";
import { useEffect } from "react";
import About from "src/components/About";
import Alert from "src/components/Alert";
import Footer from "src/components/Foot";
import Nav from "src/components/Nav";
import TopArtists from "src/components/TopArtists";
import TopTracks from "src/components/TopTracks";
import useAccessToken from "src/hooks/useAccessToken";

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    const hash = qs.parse(window.location.hash.slice(1));
    if (hash.access_token && typeof hash.access_token === "string") {
      setAccessToken(hash.access_token);
      window.location.href = "/";
    }
  }, [setAccessToken]);

  return (
    <>
      <Nav />
      {accessToken && (
        <>
          <TopTracks />
          <TopArtists />
        </>
      )}
      <About />
      <Alert />
      <Footer />
    </>
  );
};

export default App;
