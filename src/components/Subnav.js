export default function Subnav() {
  return (
    <section className="bg-light mt3" id="about">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
          <div className="col-12 col-lg-5">
            <h1 className="display-1 lh-1 mb-3">Your Music Visualized</h1>
            <p className="lead fw-normal text-muted mb-5">
              View your favorite songs, artists, trends, and patterns in one
              place. Sign into your Spotify account to get started.
            </p>
          </div>
          <div className="col-sm-8 col-md-6">
            <div className="px-5 px-sm-0">
              <img
                className="img-fluid rounded-circle"
                src="https://source.unsplash.com/u8Jn2rzYIps/900x900"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
