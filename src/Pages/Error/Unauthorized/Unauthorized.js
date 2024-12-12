import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./Unauthorized.module.css";
import { useSelector } from "react-redux";

export default function Unauthorized() {
    const user = useSelector((state) => state?.auth?.userAuth);

    return (
        <Container
            style={{ height: 300, paddingTop: "50px", fontSize: "48px" }}
        >
            <Player
                src="https://lottie.host/11e4395a-c697-4b5b-8d45-8184de180521/v5Pcbyr6A1.json"
                loop
                autoplay
                style={{ height: "300px" }}
            />

            <Title className={classes.title}>Oops! Halaman terlarang.</Title>
            <Text
                c="dimmed"
                size="lg"
                ta="center"
                className={classes.description}
            >
                Maaf, halaman yang anda cari hanya bisa diakses oleh admin.
            </Text>
            <Group justify="center">
                <Button
                    variant="filled"
                    size="md"
                    component={Link}
                    to={
                        user?.role === 1
                            ? "/dashboard"
                            : "/dashboard/user/beranda"
                    }
                >
                    Halaman Utama
                </Button>
            </Group>
        </Container>
    );
}
