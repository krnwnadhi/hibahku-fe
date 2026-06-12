import {
    ActionIcon,
    Anchor,
    Badge,
    Button,
    Center,
    Container,
    Divider,
    Group,
    List,
    Loader,
    Modal,
    NumberFormatter,
    Paper,
    Popover,
    ScrollArea,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Title,
    rem,
    useComputedColorScheme,
} from "@mantine/core";
import {
    IconBuildingBank,
    IconBuildingMosque,
    IconChecks,
    IconCoins,
    IconPencil,
    IconQuestionMark,
    IconUser,
} from "@tabler/icons-react";
import {
    getAllPersetujuanAction,
    getDetailUserPersetujuanAction,
} from "../../../redux/slices/persetujuan/persetujuanSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { nprogress } from "@mantine/nprogress";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDisclosure } from "@mantine/hooks";

dayjs.extend(relativeTime);

export default function UserStatus() {
    const [opened, { open, close }] = useDisclosure(false);

    const [modalStatus, setModalStatus] = useState(false);
    const [modalProses, setModalProses] = useState(false);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user;

    const dispatch = useDispatch();

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
                <Group justify="center">
                    <Button size="compact-xs" variant="light" onClick={open}>
                        Detail
                    </Button>
                    <Button
                        size="compact-xs"
                        variant="light"
                        color="red"
                        component="a"
                        href={`/dashboard/user/progres/${persetujuanId}/edit`}
                    >
                        Edit
                    </Button>
                </Group>
                <Modal
                    opened={opened}
                    onClose={close}
                    centered
                    scrollAreaComponent={ScrollArea.Autosize}
                    title="Detail Pengajuan HIBAH"
                    size="auto"
                >
                    {/* Modal content */}
                    <List spacing="xs" size="sm" center>
                        <Stack gap="sm">
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconUser
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    </ThemeIcon>
                                }
                            >
                                <Group>
                                    <Text size="sm">
                                        Pengurus: {item?.User?.nama}
                                    </Text>
                                    <Divider size="sm" orientation="vertical" />
                                    <Text size="sm">
                                        No. HP: {item?.User?.notelpon}
                                    </Text>
                                </Group>
                            </List.Item>

                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconBuildingMosque
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    </ThemeIcon>
                                }
                            >
                                <Group>
                                    <Text size="sm">
                                        {" "}
                                        {item?.Keagamaan?.nama}
                                    </Text>
                                    <Divider size="sm" orientation="vertical" />
                                    <Text size="sm">
                                        Wilayah: {item?.Keagamaan?.wilayah}
                                    </Text>
                                </Group>
                            </List.Item>

                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconBuildingBank
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    </ThemeIcon>
                                }
                            >
                                <Text size="sm">
                                    Rekening Bank Jambi: {item?.norek}
                                </Text>
                            </List.Item>

                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconChecks
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    </ThemeIcon>
                                }
                            >
                                <Text size="sm"> Tujuan: {item?.tujuan}</Text>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconCoins
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    </ThemeIcon>
                                }
                            >
                                <Text size="sm">
                                    {" "}
                                    Jumlah Dana Pengajuan:{" "}
                                    <NumberFormatter
                                        prefix="Rp "
                                        value={item?.pengajuandana}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                    />
                                </Text>
                            </List.Item>
                        </Stack>
                    </List>
                </Modal>
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
            <Container size="xl" mih="50vh">
                <Paper
                    p="xs"
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
                        <Paper p="xs" radius="md" withBorder>
                            <Group gap="xs" mb="sm">
                                {/* MODAL STATUS */}
                                <Modal
                                    opened={modalStatus}
                                    onClose={() => setModalStatus(false)}
                                    title="TAHAPAN STATUS"
                                    centered
                                >
                                    <List type="ordered" size="xs">
                                        <Stack gap="md">
                                            <List.Item>
                                                <Badge
                                                    color="blue"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PROSES
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    DISETUJUI
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="red"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    DITOLAK
                                                </Badge>
                                            </List.Item>
                                        </Stack>
                                    </List>
                                </Modal>
                                <Button
                                    variant="subtle"
                                    onClick={() => setModalStatus(true)}
                                    rightSection={
                                        <IconQuestionMark
                                            size={16}
                                            style={{
                                                marginLeft: -5,
                                            }}
                                        />
                                    }
                                    size="xs"
                                    mr={-10}
                                >
                                    Status
                                </Button>
                                {/*  */}&#x2022;{/* Modal Proses */}
                                <Modal
                                    opened={modalProses}
                                    onClose={() => setModalProses(false)}
                                    title="TAHAPAN PROSES"
                                    centered
                                    size="auto"
                                >
                                    <List type="ordered" size="xs">
                                        <Stack gap="xs">
                                            <List.Item>
                                                <Badge
                                                    color="blue"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    DALAM PROSES
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    VERIFIKASI PERSYARATAN
                                                    ADMINISTRASI
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    VERIFIKASI FAKTUAL(SURVEI
                                                    LAPANGAN)
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    REKOMENDASI
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PERTIMBANGAN TAPD
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PENGANGGARAN
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PENERBITAN SK SDH DAN
                                                    DOKUMEN LAINNNYA
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PENANDATANGANAN NPHD, PAKTA
                                                    INTEGRITAS, PERNYATAAN
                                                    TANGGUNG JAWAB, DLL
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    PENCAIRAN DANA BANTUAN HIBAH
                                                </Badge>
                                            </List.Item>
                                            <List.Item>
                                                <Badge
                                                    color="green"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    LAPORAN PERTANGGUNGJAWABAN
                                                    PENGGUNAAN DANA BANTUAN
                                                    HIBAH
                                                </Badge>
                                            </List.Item>

                                            <List.Item>
                                                <Badge
                                                    color="red"
                                                    variant="outline"
                                                    size="xs"
                                                >
                                                    DITOLAK
                                                </Badge>
                                            </List.Item>
                                        </Stack>
                                    </List>
                                </Modal>
                                <Button
                                    variant="subtle"
                                    onClick={() => setModalProses(true)}
                                    rightSection={
                                        <IconQuestionMark
                                            size={16}
                                            style={{
                                                marginLeft: -5,
                                            }}
                                        />
                                    }
                                    size="xs"
                                    ml={-10}
                                >
                                    Proses
                                </Button>
                                {/*  */}
                            </Group>

                            <Divider h="md" />

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
                                                Detail
                                            </Table.Th>
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
