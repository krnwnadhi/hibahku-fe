import {
    Center,
    Container,
    Group,
    Paper,
    RingProgress,
    SimpleGrid,
    Text,
    rem,
} from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

const data = [
    {
        label: "Page views",
        stats: "456,578",
        progress: 65,
        color: "teal",
        icon: "up",
    },
    {
        label: "New users",
        stats: "2,550",
        progress: 72,
        color: "blue",
        icon: "up",
    },
    {
        label: "Orders",
        stats: "4,735",
        progress: 52,
        color: "red",
        icon: "down",
    },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector((state) => state?.auth?.userAuth);
    // console.log(user);

    useEffect(() => {
        if (user?.role === 2) {
            navigate("/dashboard/user/beranda");
        } else {
            navigate("/dashboard/");
        }
    }, [user, navigate]);

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <Paper withBorder radius="md" p="xs" key={stat.label}>
                <Container>
                    <Group>
                        <RingProgress
                            size={80}
                            roundCaps
                            thickness={8}
                            sections={[
                                { value: stat.progress, color: stat.color },
                            ]}
                            label={
                                <Center>
                                    <Icon
                                        style={{
                                            width: rem(20),
                                            height: rem(20),
                                        }}
                                        stroke={1.5}
                                    />
                                </Center>
                            }
                        />

                        <div>
                            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                                {stat.label}
                            </Text>
                            <Text fw={700} size="xl">
                                {stat.stats}
                            </Text>
                        </div>
                    </Group>
                </Container>
            </Paper>
        );
    });

    return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}
