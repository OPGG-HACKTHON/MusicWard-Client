import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

declare global {
  interface Window {
    Kakao: any;
  }
}

window.Kakao.init("324ce7ca3906aba5faa01ccd1cd5628e");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
