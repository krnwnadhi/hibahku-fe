import {
    Alert,
    Avatar,
    Center,
    Container,
    Divider,
    Paper,
    Text,
} from "@mantine/core";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getAllPersetujuanAction } from "../../../redux/slices/persetujuan/persetujuanSlices";
import { getPeriode } from "../../../redux/slices/periode/periodeSlices";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export default function UserPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user ?? {};

    const { persetujuanList, loading } = useSelector(
        (state) => state?.persetujuan,
    );

    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });

    const persetujuanId =
        filteredResult?.length > 0 ? parseInt(filteredResult[0]?.id) : "";

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const UserInfo = () => {
        return (
            <Paper
                withBorder
                radius="md"
                shadow="sm"
                p="xl"
                my="xl"
                style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    width: "100%",
                    borderBottom: `2px solid var(--mantine-color-blue-6)`,
                }}
            >
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
                    SELAMAT DATANG, {user?.nama}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.nik}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.notelpon}
                </Text>
            </Paper>
        );
    };

    return (
        <>
            <Container size="md">
                <UserInfo />
                {persetujuanId ? (
                    // <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                    //     {/* Card 1: Status Utama (Live dari API) */}
                    //     <Paper withBorder p="xl" radius="md" shadow="sm">
                    //         <Stack gap="xs">
                    //             <Group justify="space-between">
                    //                 <Text size="xs" c="dimmed" fw={700}>
                    //                     STATUS PENGAJUAN
                    //                 </Text>
                    //                 <ThemeIcon
                    //                     variant="light"
                    //                     color="blue"
                    //                     radius="xl"
                    //                 >
                    //                     <IconChartLine size={18} />
                    //                 </ThemeIcon>
                    //             </Group>

                    //             <Skeleton visible={loading}>
                    //                 <Title order={2}>
                    //                     {persetujuanList?.status || "Draft"}
                    //                 </Title>
                    //             </Skeleton>

                    //             <Badge
                    //                 color="blue.1"
                    //                 c="blue.7"
                    //                 variant="filled"
                    //                 radius="sm"
                    //                 fullWidth
                    //             >
                    //                 Menunggu Verifikasi Internal
                    //             </Badge>
                    //         </Stack>
                    //     </Paper>

                    //     {/* Card 2: Progres Dokumen (Visual) */}
                    //     <Paper withBorder p="xl" radius="md" shadow="sm">
                    //         <Stack gap="xs">
                    //             <Text size="xs" c="dimmed" fw={700}>
                    //                 KELENGKAPAN BERKAS
                    //             </Text>
                    //             <Skeleton visible={loading}>
                    //                 <Group justify="space-between" mb={5}>
                    //                     <Text fw={700} size="xl">
                    //                         {persetujuanList?.percentComplete ||
                    //                             "65"}
                    //                         %
                    //                     </Text>
                    //                     <Text size="xs" c="dimmed">
                    //                         12 dari 18 File
                    //                     </Text>
                    //                 </Group>
                    //                 <Progress
                    //                     value={
                    //                         persetujuanList?.percentComplete ||
                    //                         65
                    //                     }
                    //                     size="lg"
                    //                     radius="xl"
                    //                     striped
                    //                     animated
                    //                 />
                    //             </Skeleton>
                    //             <Text size="xs" c="dimmed" mt="xs">
                    //                 Silahkan lengkapi dokumen yang kurang.
                    //             </Text>
                    //         </Stack>
                    //     </Paper>

                    //     {/* Card 3: Timeline Terakhir */}
                    //     <Paper withBorder p="xl" radius="md" shadow="sm">
                    //         <Stack gap="xs">
                    //             <Text size="xs" c="dimmed" fw={700}>
                    //                 UPDATE TERAKHIR
                    //             </Text>
                    //             <Skeleton visible={loading}>
                    //                 <Stack gap={5}>
                    //                     <Text fw={700} size="sm" lineClamp={1}>
                    //                         {persetujuanList?.lastUpdateTitle ||
                    //                             "Verifikasi Lapangan"}
                    //                     </Text>
                    //                     <Group gap={5}>
                    //                         <IconClock size={12} color="gray" />
                    //                         <Text size="xs" c="dimmed">
                    //                             {persetujuanList?.lastUpdateDate ||
                    //                                 "2 jam yang lalu"}
                    //                         </Text>
                    //                     </Group>
                    //                 </Stack>
                    //             </Skeleton>
                    //             <Button
                    //                 variant="light"
                    //                 size="compact-xs"
                    //                 mt="sm"
                    //                 rightSection={
                    //                     <IconChevronRight size={14} />
                    //                 }
                    //             >
                    //                 Lihat Log Aktivitas
                    //             </Button>
                    //         </Stack>
                    //     </Paper>
                    // </SimpleGrid>
                    <Center>
                        <Alert
                            variant="light"
                            color="blue"
                            title="INFO"
                            icon={<IconCheck />}
                        >
                            PERMOHONAN ANDA TELAH BERHASIL DIAJUKAN. SILAHKAN
                            MENUJU TAB PROGRESS UNTUK MELIHAT PERKEMBANGAN
                            PROSES PERMOHONAN ANDA.
                            <Divider my="sm" />
                            <Text
                                component={Link}
                                to={`/dashboard/user/progres/${persetujuanId}`}
                            >
                                KLIK DISINI
                            </Text>
                        </Alert>
                    </Center>
                ) : (
                    <Center>
                        <Alert
                            variant="light"
                            color="red"
                            title="MOHON MAAF"
                            icon={<IconInfoCircle />}
                        >
                            ANDA BELUM PERNAH MENGAJUKAN PERMOHONAN. SILAHKAN
                            AJUKAN PERMOHONAN MELALUI TAB PERMOHONAN.
                            <Divider my="sm" />
                            <Text component={Link} to="/dashboard/user/dokumen">
                                KLIK DISINI
                            </Text>
                        </Alert>
                    </Center>
                )}
            </Container>
        </>
    );
}
