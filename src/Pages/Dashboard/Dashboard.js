import {
    Anchor,
    Avatar,
    Breadcrumbs,
    Center,
    Container,
    Group,
    Loader,
    Paper,
    RingProgress,
    SimpleGrid,
    Stack,
    Text,
    Title,
    rem,
} from "@mantine/core";
import { IconBuildingMosque, IconLicense, IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { logoutUserAction } from "../../redux/slices/auth/authSlices";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const icons = {
    persetujuan: IconLicense,
    listTempat: IconBuildingMosque,
    listUser: IconUser,
};

const items = [{ title: "Home", href: "/dashboard" }].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" truncate="end">
        {item.title}
    </Anchor>
));

export default function Dashboard() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
        dispatch(getAllRumahIbadahAction());
        dispatch(getAllUsersAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    console.log(user);

    const allUsersList = useSelector((state) => state?.users);
    const { loading, usersList } = allUsersList;

    const allRumahIbadah = useSelector(
        (state) => state?.rumahIbadah?.rumahIbadahList
    );
    const allPersetujuan = useSelector(
        (state) => state?.persetujuan?.persetujuanList
    );

    const data = [
        {
            label: "Persetujuan",
            stats: allPersetujuan?.result?.length,
            progress: allPersetujuan?.result?.length,
            color: "teal",
            icon: "persetujuan",
        },
        {
            label: "Rumah Ibadah",
            stats: allRumahIbadah?.result?.length,
            progress: allRumahIbadah?.result?.length,
            color: "blue",
            icon: "listTempat",
        },
        {
            label: "Pengguna",
            stats: usersList?.result?.length,
            progress: usersList?.result?.length,
            color: "red",
            icon: "listUser",
        },
    ];

    useEffect(() => {
        if (user?.role === 2) {
            navigate("/dashboard/user/beranda");
        } else {
            navigate("/dashboard/");
        }
    }, [user, navigate]);

    const UserInfo = () => {
        return (
            <Paper radius="md" shadow="md" withBorder p="xl">
                <Avatar
                    size={50}
                    radius={120}
                    mx="auto"
                    key={user?.nama}
                    src={`https://ui-avatars.com/api/?name=${user?.nama}&background=random`}
                    color="initials"
                    alt="Admin"
                />
                <Text ta="center" fz="md" fw={700} mt="md">
                    Selamat Datang, {user?.nama}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.nik}
                </Text>
            </Paper>
        );
    };

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <Paper
                withBorder
                radius="md"
                mt={10}
                shadow="lg"
                p="xs"
                key={stat.label}
            >
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
                                {stat?.label}
                            </Text>
                            <Text fw={700} size="xl">
                                {loading ? (
                                    <Loader mt="xs" size={18} />
                                ) : (
                                    stat?.stats
                                )}
                            </Text>
                        </div>
                    </Group>
                </Container>
            </Paper>
        );
    });

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Stack gap="md">
                    <UserInfo />
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
                </Stack>
            </Container>
        </>
    );
}
