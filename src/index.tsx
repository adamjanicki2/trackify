import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
// Make sure this is first!
import "tachyons/css/tachyons.min.css";
import "src/style.css";
import "src/media.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
