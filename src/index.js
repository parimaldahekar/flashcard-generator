import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./State/Store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provides the Store the global states using Provider Component from Redux */}
    <Provider store={store}>
      {/* Router component provides the routes to the application */}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

