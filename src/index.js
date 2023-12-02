import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.module.css";

import {
    Loader,
    MantineProvider,
    createTheme,
    localStorageColorSchemeManager,
} from "@mantine/core";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store/store";

const colorSchemeManager = localStorageColorSchemeManager({
    key: "hibahkuColorScheme",
});

const theme = createTheme({
    defaultColorScheme: "dark",
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },
    primaryShade: { light: 7 },
    components: {
        Loader: Loader.extend({
            defaultProps: {
                type: "bars",
            },
        }),
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MantineProvider>
);
