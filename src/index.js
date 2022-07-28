import React from "react";
import ReactDOM from "react-dom/client";
import App from "./shared/App";
import "./index.css";
import "./app.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import ScrollToTop from "./elements/ScrollTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop /> {/* 페이지 이동 시 스크롤 위로 가게 */}
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
