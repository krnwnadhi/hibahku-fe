import { Avatar, BackgroundImage, Paper, Text, Tooltip } from "@mantine/core";

import backgroundSvg from "../../../../assets/layered-peaks-haikei.svg";
import { useSelector } from "react-redux";

export default function UserInfo() {
    const user = useSelector((state) => state?.auth?.userAuth);
    const { nama, nik, notelpon } = user;

    return (
        <>
            <Paper
                radius="md"
                withBorder
                p="lg"
                bg="var(--mantine-color-body)"
                shadow="md"
            >
                <BackgroundImage h="30vh" src={backgroundSvg}>
                    <Tooltip
                        label={nama}
                        withArrow
                        transitionProps={{ transition: "pop", duration: 500 }}
                    >
                        <Avatar
                            src={`https://ui-avatars.com/api/?name=${nama}&background=random`}
                            size={60}
                            radius={120}
                            mx="auto"
                        />
                    </Tooltip>
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {nama}
                    </Text>
                    <Text ta="center" c="dimmed" fz="xs">
                        {nik} • {notelpon}
                    </Text>
                </BackgroundImage>
            </Paper>
        </>
    );
}
