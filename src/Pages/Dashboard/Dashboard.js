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
    rem,
} from "@mantine/core";
import { IconBuildingMosque, IconLicense, IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { getPeriode } from "../../redux/slices/periode/periodeSlices";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const icons = {
    persetujuan: IconLicense,
    listTempat: IconBuildingMosque,
    listUser: IconUser,
};

const items = [{ title: "Beranda", href: "/dashboard" }].map((item, index) => (
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
        dispatch(getPeriode());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);

    const allUsersList = useSelector((state) => state?.users);
    const { loading, usersList } = allUsersList;

    const allRumahIbadah = useSelector(
        (state) => state?.rumahIbadah?.rumahIbadahList,
    );
    const allPersetujuan = useSelector(
        (state) => state?.persetujuan?.persetujuanList,
    );

    // Filter rumahIbadahList by masjid kategoriid = 2
    const filteredRumahIbadah = allRumahIbadah?.result?.filter(
        (item) => item?.kategoriid === 2,
    );

    // Filter rumahIbadahList by lembaga keagamaan kategoriid = 1
    const filteredLembagaKeagamaan = allRumahIbadah?.result?.filter(
        (item) => item?.kategoriid === 1,
    );

    const cardStyles = {
        backgroundColor: "light-dark(#FCFCFC, #1E1E1E)",
    };

    const data = [
        {
            label: "Persetujuan",
            stats: allPersetujuan?.result?.length,
            progress: allPersetujuan?.result?.length,
            color: "red",
            icon: "persetujuan",
        },
        {
            label: "Pengguna",
            stats: usersList?.length,
            progress: usersList?.length,
            color: "violet",
            icon: "listUser",
        },
        {
            label: "Rumah Ibadah",
            stats: filteredRumahIbadah?.length,
            progress: filteredRumahIbadah?.length,
            color: "green",
            icon: "listTempat",
        },
        {
            label: "Lembaga Keagamaan",
            stats: filteredLembagaKeagamaan?.length,
            progress: filteredLembagaKeagamaan?.length,
            color: "blue",
            icon: "listTempat",
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
            <Paper radius="md" shadow="md" withBorder p="lg" style={cardStyles}>
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

    // const periode = useSelector((state) => state?.periode);

    // const { loading: loadingPeriode } = periode;

    // const mulaiPeriode = periode?.getPeriode?.map((x) => x.mulai);
    // const mulaiPeriodeFormat = dayjs(mulaiPeriode)
    //     .locale("id")
    //     .format("DD MMMM YYYY");

    // const selesaiPeriode = periode?.getPeriode?.map((x) => x.selesai);
    // const selesaiPeriodeFormat = dayjs(selesaiPeriode)
    //     .locale("id")
    //     .format("DD MMMM YYYY");

    // const PeriodeDashboard = () => {
    //     return (
    //         <Group grow>
    //             <Paper
    //                 radius="md"
    //                 shadow="sm"
    //                 p="lg"
    //                 withBorder
    //                 style={cardStyles}
    //             >
    //                 <Text ta="center" fz="md" fw={700}>
    //                     AKHIR PERIODE
    //                 </Text>
    //                 {loadingPeriode ? (
    //                     <Center>
    //                         <Loader size="xs" />
    //                     </Center>
    //                 ) : (
    //                     <Text ta="center" c="red" fz="sm">
    //                         {mulaiPeriodeFormat
    //                             ? mulaiPeriodeFormat
    //                             : "Tidak Ada Data"}
    //                     </Text>
    //                 )}
    //             </Paper>
    //             <Paper
    //                 radius="md"
    //                 shadow="sm"
    //                 p="lg"
    //                 withBorder
    //                 style={cardStyles}
    //             >
    //                 <Text ta="center" fz="md" fw={700}>
    //                     AWAL PERIODE
    //                 </Text>
    //                 {loading ? (
    //                     <Center>
    //                         <Loader size="xs" />
    //                     </Center>
    //                 ) : (
    //                     <Text ta="center" c="green" fz="sm">
    //                         {selesaiPeriodeFormat
    //                             ? selesaiPeriodeFormat
    //                             : "Tidak Ada Data"}
    //                     </Text>
    //                 )}
    //             </Paper>
    //         </Group>
    //     );
    // };

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
                style={cardStyles}
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
            <Container size="lg">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Stack gap="md">
                    <UserInfo />
                    {/* <PeriodeDashboard /> */}
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>{stats}</SimpleGrid>
                </Stack>
            </Container>
        </>
    );
}
