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

    const dataSegmentedControl = [
        {
            value: "home",
            label: (
                <Link
                    to={"/dashboard/user/beranda"}
                    style={{
                        textDecoration: "none",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                    }}
                >
                    <Text>Beranda</Text>
                </Link>
            ),
        },
        {
            value: "progres",
            label: (
                <Link
                    to={`/dashboard/user/progres/${persetujuanId}`}
                    style={{
                        textDecoration: "none",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                    }}
                >
                    <Text>Progres</Text>
                </Link>
            ),
        },
    ];

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

    const rows = detailUserPersetujuan?.map((item) => (
        <Table.Tr key={item?.id}>
            <Table.Td ta="center">
                <Group gap="sm">
                    <Badge
                        color={statusColors[item?.Status?.nama]}
                        variant="outline"
                        size="xs"
                    >
                        {item?.Status?.nama}
                    </Badge>
                </Group>
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
            <Container size="sm" mt={-15} mb={-65} mih="50vh">
                <Paper
                    p="md"
                    withBorder
                    bg={
                        computedColorScheme === "dark"
                            ? "var(--mantine-color-gray-9)"
                            : "var(--mantine-color-blueGray-light)"
                    }
                >
                    <Group justify="space-between" gap="xl">
                        {computedColorScheme === "light" ? (
                            <Image
                                loading="lazy"
                                radius="md"
                                w={200}
                                fit="contain"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                                fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                            />
                        ) : (
                            <Image
                                loading="lazy"
                                radius="md"
                                w={200}
                                fit="contain"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                fallbackSrc="https://placehold.co/500x100/1A1B1E/FFFFFF/png?text=HIBAHKU+LOGO"
                            />
                        )}
                        <Group gap="xs">
                            <DarkButton />
                            <MenuMantine />
                        </Group>
                    </Group>
                </Paper>
                <Paper
                    bg="var(--mantine-color-blueGray-light)"
                    style={{ minHeight: "calc(110vh - 90px)" }}
                    p={20}
                    withBorder
                >
                    <Paper p="sm" radius="md" h="80vh">
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
                                <Title
                                    order={2}
                                    ta="center"
                                    c="red"
                                    fs="italic"
                                >
                                    Maaf, Anda Belum Mengajukan Permohonan!
                                </Title>
                            )
                        ) : (
                            <>
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
                            </>
                        )}
                    </Paper>
                </Paper>
                <Center>
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        classNames={classes}
                        value={value}
                        onChange={setValue}
                        data={dataSegmentedControl}
                        fullWidth
                    />
                </Center>
            </Container>
        </>
    );
}
