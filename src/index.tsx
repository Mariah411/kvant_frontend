import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { ConfigProvider } from "antd";
import ru_RU from "antd/locale/ru_RU";
import "./App.css";

//      colorPrimary: "#722ed1",

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider
        locale={ru_RU}
        theme={{
          token: {
            colorPrimary: "#722ed1",
            colorLink: "#722ed1",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
