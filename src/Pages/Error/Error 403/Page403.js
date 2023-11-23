import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./Page403.module.css";

export default function Page403() {
    return (
        <Container
            // className={classes.root}
            style={{ height: 300, paddingTop: "50px", fontSize: "48px" }}
        >
            {/* <div className={classes.label}>404</div> */}

            <Player
                src="https://lottie.host/11e4395a-c697-4b5b-8d45-8184de180521/v5Pcbyr6A1.json"
                loop
                autoplay
                style={{ height: "300px" }}
                // background="red"
            />

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
