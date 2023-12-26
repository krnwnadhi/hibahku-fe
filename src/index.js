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
import { DatesProvider } from "@mantine/dates";
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
    colors: {
        dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5c5f66",
            "#373A40",
            "#2C2E33",
            "#25262b",
            "#1A1B1E",
            "#141517",
            "#101113",
        ],
        blueGray: [
            "#f3f3fe",
            "#e4e6ed",
            "#c8cad3",
            "#a9adb9",
            "#9093a4",
            "#808496",
            "#767c91",
            "#656a7e",
            "#585e72",
            "#4a5167",
        ],
        paleIndigo: [
            "#eef3ff",
            "#dee2f2",
            "#bdc2de",
            "#98a0ca",
            "#7a84ba",
            "#6672b0",
            "#5c68ac",
            "#4c5897",
            "#424e88",
            "#364379",
        ],
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
        <Provider store={store}>
            <BrowserRouter>
                <DatesProvider>
                    <App />
                </DatesProvider>
            </BrowserRouter>
        </Provider>
    </MantineProvider>
);
