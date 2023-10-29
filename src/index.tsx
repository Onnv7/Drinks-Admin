import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import store from "./services/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer style={{ zIndex: 99999 }} />
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
