import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import classes from "./Page403.module.css";

export default function Page403() {
    return (
        <Container
            // className={classes.root}
            style={{ height: 300, paddingTop: 200, fontSize: "48px" }}
        >
            <div className={classes.label}>404</div>
            <Title className={classes.title}>
                Oops! Halaman tidak ditemukan.
            </Title>
            <Text
                c="dimmed"
                size="lg"
                ta="center"
                className={classes.description}
            >
                Maaf, halaman yang anda cari tidak ditemukan. Mungkin anda salah
                mengetik URL? Pastikan untuk memeriksa ejaan Anda.
            </Text>
            <Group justify="center">
                <Button
                    variant="filled"
                    size="md"
                    component={Link}
                    to="/dashboard"
                >
                    Halaman Utama
                </Button>
            </Group>
        </Container>
    );
}
