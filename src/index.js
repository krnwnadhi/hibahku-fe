import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.module.css";

import {
    MantineProvider,
    createTheme,
    localStorageColorSchemeManager,
} from "@mantine/core";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store/store";

const colorSchemeManager = localStorageColorSchemeManager({
    key: "hibahkuColorScheme",
});

const theme = createTheme({
    defaultColorScheme: "dark",
    fontFamily: "Open Sans, sans-serif",
    // primaryColor: "cyan",
    primaryShade: { light: 7 },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
        <Provider store={store}>
            <BrowserRouter>
                {/* <Notifications autoClose={3000} containerWidth={100} /> */}

                <App />
            </BrowserRouter>
        </Provider>
    </MantineProvider>
    // </React.StrictMode>
);
