import {
    Badge,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    Paper,
    SegmentedControl,
    Table,
    Text,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import {
    getAllPersetujuanAction,
    getDetailUserPersetujuanAction,
} from "../../../redux/slices/persetujuan/persetujuanSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkButton from "../components/DarkButton/DarkButton";
import { Link } from "react-router-dom";
import MenuMantine from "../../../components/Menu/MenuMantine";
import classes from "./UserPage.module.css";
import dayjs from "dayjs";
import { nprogress } from "@mantine/nprogress";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function UserStatus() {
    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user;

    const dispatch = useDispatch();

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [value, setValue] = useState("progres");

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDetailUserPersetujuanAction(nik));
    }, [dispatch, nik]);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, persetujuanList, detailUserPersetujuan } = persetujuan;

    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });

    const persetujuanId =
        filteredResult?.length > 0 ? filteredResult[0].id : null;

    // const dataSegmentedControl = [
    //     {
    //         value: "home",
    //         label: (
    //             <Link
    //                 to={"/dashboard/user/beranda"}
    //                 style={{
    //                     textDecoration: "none",
    //                     color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
    //                 }}
    //             >
    //                 <Text>Beranda</Text>
    //             </Link>
    //         ),
    //     },
    //     {
    //         value: "progres",
    //         label: (
    //             <Link
    //                 to={`/dashboard/user/progres/${persetujuanId}`}
    //                 style={{
    //                     textDecoration: "none",
    //                     color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
    //                 }}
    //             >
    //                 <Text>Progres</Text>
    //             </Link>
    //         ),
    //     },
    // ];

    const statusColors = {
        PROSES: "blue",
        DITOLAK: "red",
        DISETUJUI: "green",
    };

    const prosesColors = {
        DISETUJUI: "green",
        PROSES: "blue",
        DITOLAK: "red",
    };

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const rows = detailUserPersetujuan?.map((item, index) => (
        <Table.Tr key={item?.id}>
            <Table.Td ta="center">
                <Text size="xs" ta="center">
                    {index + 1}
                </Text>
            </Table.Td>
            <Table.Td ta="center">
                <Text size="xs" ta="center">
                    {item?.keagamaanid}
                </Text>
            </Table.Td>
            <Table.Td ta="center">
                <Badge
                    color={statusColors[item?.Status?.nama]}
                    variant="outline"
                    size="xs"
                >
                    {item?.Status?.nama}
                </Badge>
            </Table.Td>
            <Table.Td ta="center">
                <Badge
                    color={prosesColors[item?.Proses?.nama]}
                    variant="outline"
                    size="xs"
                >
                    {item?.Proses?.nama}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="xs" ta="center">
                    {item?.Proses?.keterangan}
                </Text>
            </Table.Td>
            <Table.Td ta="center">
                <Text size="xs">
                    {dayjs(item?.updatedAt)
                        .locale("id")
                        .format("DD/MM/YYYY HH:mm")}
                </Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Container size="lg" mih="50vh">
                <Paper
                    p="xl"
                    radius="md"
                    h="80vh"
                    withBorder
                    style={{
                        backgroundColor:
                            "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                    }}
                >
                    <Title order={3} ta="center" mt="md" mb={30}>
                        Status Permohonan
                    </Title>
                    <Divider h="xl" />
                    {persetujuanId === null ? (
                        loading ? (
                            <Center>
                                <Loader />
                            </Center>
                        ) : (
                            <Title order={2} ta="center" c="red" fs="italic">
                                Maaf, Anda Belum Mengajukan Permohonan!
                            </Title>
                        )
                    ) : (
                        <Paper p="md" radius="md" withBorder>
                            <Table.ScrollContainer minWidth={500}>
                                <Table
                                    highlightOnHover
                                    withTableBorder
                                    withColumnBorders
                                    verticalSpacing="md"
                                    captionSide="bottom"
                                    style={{
                                        fontSize: 12,
                                        minWidth: "70vh",
                                    }}
                                >
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th ta="center">No.</Table.Th>
                                            <Table.Th ta="center">
                                                No. SIMAS/NSPP
                                            </Table.Th>
                                            <Table.Th ta="center">
                                                Status
                                            </Table.Th>
                                            <Table.Th ta="center">
                                                Proses
                                            </Table.Th>
                                            <Table.Th ta="center">
                                                Keterangan
                                            </Table.Th>
                                            <Table.Th ta="center">
                                                Update
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>{rows}</Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        </Paper>
                    )}
                </Paper>
            </Container>
        </>
    );
}
