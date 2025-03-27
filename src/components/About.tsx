export default function About() {
  return (
    <section id="about">
      <div className="flex flex-change pa3 justify-around">
        <div className="flex flex-column items-center justify-center">
          <h1
            className="flex w-90 ma0 mb4 tc"
            style={{ fontSize: "calc(2.5rem + 4.5vh)" }}
          >
            Your Music Visualized.
          </h1>
          <p className="dark-gray f4 fw4 w-90 mv0 pb4">
            Trackify lets you view your favorite songs, artists, trends, and
            patterns in one place. Sign into your Spotify account to get
            started.
          </p>
        </div>
        <div className="flex justify-center about-img">
          <img
            src="/trackify/splash.webp"
            alt=""
            className="br-100"
            style={{ maxHeight: "75vh" }}
          />
        </div>
      </div>
    </section>
  );
}
