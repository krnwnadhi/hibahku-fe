import { Anchor, Text } from "@mantine/core";

import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
        <Text size="sm" align="center" c="dimmed">
            Copyright © 2024{" "}
            <Anchor
                component={Link}
                type="button"
                to="https://kesra.jambiprov.go.id"
                target="_blank"
                rel="noopener noreferrer"
                ta="center"
            >
                Biro Kesra Provinsi Jambi
            </Anchor>{" "}
            By{" "}
            <Anchor
                component={Link}
                type="button"
                to="https://diskominfo.jambiprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                ta="center"
            >
                Diskominfo Provinsi Jambi
            </Anchor>{" "}
        </Text>
    );
};

export default Footer;
