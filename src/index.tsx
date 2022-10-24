import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {RecoilRoot} from 'recoil'
import { Provider } from "react-redux";
import store from "./module/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>
);


serviceWorkerRegistration.register();
reportWebVitals();
