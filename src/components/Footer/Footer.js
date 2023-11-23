import { Link } from "react-router-dom";
import React from "react";
import { Text } from "@mantine/core";

const Footer = () => {
    return (
        <Text size="sm" align="center">
            Copyright © 2023{" "}
            <Text
                component={Link}
                to="https://kesra.jambiprov.go.id"
                target="_blank"
                rel="noopener noreferrer"
                weight="bold"
            >
                Biro Kesra Provinsi Jambi
            </Text>{" "}
            By{" "}
            <Text
                component={Link}
                to="https://diskominfo.jambiprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                weight="bold"
            >
                Diskominfo Provinsi Jambi
            </Text>
        </Text>
    );
};

export default Footer;
