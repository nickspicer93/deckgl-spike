import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/react";
import "./assets/custom.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

Sentry.init({
    dsn: "https://f5c894bfe5624f898d5d7b168c1d999f@o958876.ingest.sentry.io/5907417"
});

ReactDOM.render(
    <App />
    , document.getElementById("root"));