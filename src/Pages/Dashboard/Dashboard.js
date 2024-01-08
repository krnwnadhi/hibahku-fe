import {
    Anchor,
    Breadcrumbs,
    Center,
    Container,
    Group,
    Loader,
    LoadingOverlay,
    Paper,
    RingProgress,
    SimpleGrid,
    Text,
    rem,
} from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import AreaChartMantine from "../../components/AreaChart/AreaChartMantine";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
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

    //
    const user = useSelector((state) => state?.auth?.userAuth);

    //
    const allUsersList = useSelector((state) => state?.users);
    const { loading, usersList } = allUsersList;
    console.log(usersList?.result?.length);

    //
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
            progress: 65,
            color: "teal",
            icon: "up",
            link: "/dashboard/admin/persetujuan",
        },
        {
            label: "Rumah Ibadah",
            stats: allRumahIbadah?.result?.length,
            progress: 72,
            color: "blue",
            icon: "up",
            link: "/dashboard/rumah-ibadah/list",
        },
        {
            label: "Users",
            stats: usersList?.result?.length,
            progress: 52,
            color: "red",
            icon: "down",
            link: "/dashboard/admin/list",
        },
    ];

    useEffect(() => {
        if (user?.role === 2) {
            navigate("/dashboard/user/beranda");
        } else {
            navigate("/dashboard/");
        }
    }, [user, navigate]);

    // useEffect(() => {
    //     loading && (
    //         <LoadingOverlay
    //             visible={loading}
    //             zIndex={1000}
    //             overlayProps={{ radius: "sm", blur: 1 }}
    //         />
    //     );
    // }, [loading]);

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
                            // component={<Anchor />}
                            // href={stat.link}
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

    return (
        <>
            <Container size="xl">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                />
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <AreaChartMantine />{" "}
                </SimpleGrid>
            </Container>
        </>
    );
}
