import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App.jsx";
import App2 from "@/App2.jsx";

// Import store
import { Provider } from "react-redux";
import store from "./store/store.js";

import "@/assets/styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/* <App2 /> */}
    </Provider>
  </StrictMode>
);
