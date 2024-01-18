import {
    Anchor,
    Avatar,
    Breadcrumbs,
    Button,
    CloseButton,
    Combobox,
    Container,
    Grid,
    Group,
    Input,
    InputBase,
    LoadingOverlay,
    Paper,
    SimpleGrid,
    Skeleton,
    Space,
    Stack,
    Text,
    TextInput,
    Tooltip,
    VisuallyHidden,
    em,
    rem,
    useCombobox,
} from "@mantine/core";
import {
    IconBuildingBank,
    IconDownload,
    IconFileDownload,
} from "@tabler/icons-react";
import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    changeStatusPersetujuanAction,
    deleteFileAction,
    getDetailAdminPersetujuanAction,
} from "../../redux/slices/persetujuan/persetujuanSlices";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { IconTrash } from "@tabler/icons-react";
import { basePersetujuanURL } from "../../utils/baseURL";
import { modals } from "@mantine/modals";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";

const PersetujuanDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(`(max-width: ${em(850)})`);
    const [loadingFetch, setLoadingFetch] = useState(false);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const {
        loading,
        appError,
        serverError,
        detailAdminPersetujuan,
        isDeleted,
        changeStatus,
    } = persetujuan;

    // const prosesId = detailAdminPersetujuan?.map((x) => x?.Proses?.id);
    // const prosesIdtoString = prosesId?.toString();
    // console.log(prosesIdtoString);

    const namaKategori = detailAdminPersetujuan?.map(
        (x) => x?.Keagamaan?.Kategori?.nama
    );

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            id: params.id,
            newStatus: "",
            // newProses: prosesIdtoString,
        },

        validate: {
            id: isNotEmpty("Harap diisi"),
            newStatus: isNotEmpty("Harap diisi"),
            // newProses: isNotEmpty("Harap diisi"),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        // console.log(values);
        dispatch(changeStatusPersetujuanAction(values));
        // form.reset()
        // form.clearErrors();
    });

    const statusInput = [
        {
            value: 1,
            description: "DISETUJUI",
        },
        {
            value: 2,
            description: "DITOLAK",
        },
        {
            value: 3,
            description: "PROSES",
        },
    ];

    function SelectOption({ value, description }) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState();
    const selectedOption = statusInput.find((item) => item?.value === value);

    const options = statusInput.map((item) => (
        <Combobox.Option
            value={item?.value}
            key={item?.value}
            active={item === value}
        >
            <SelectOption {...item} />
        </Combobox.Option>
    ));

    useEffect(() => {
        // dispatch(getAllPersetujuanAction());
        dispatch(getDetailAdminPersetujuanAction(params?.id));
    }, [dispatch, params]);

    if (isDeleted || changeStatus)
        return <Navigate to="/dashboard/admin/persetujuan" replace={true} />;

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: "Hapus Persetujuan?",
            centered: true,
            children: (
                <Text size="sm">
                    {`Apakah Anda yakin ingin menghapus persetujuan ${detailAdminPersetujuan?.map(
                        (x) => x?.Keagamaan?.nama
                    )} oleh ${detailAdminPersetujuan?.map(
                        (x) => x?.User?.nama
                    )}?`}
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onCancel: () => {
                toast.error("Aksi dibatalkan");
            },
            onConfirm: () => {
                toast("Loading...", {
                    id: "load-data",
                    isLoading: true,
                    autoClose: false, // Don't auto-close for loading
                });
                setLoadingFetch(loading);
                setTimeout(() => {
                    dispatch(deleteFileAction(params?.id));
                    setLoadingFetch(loading);
                    toast.dismiss(); // Dismiss the loading toast
                    toast.success("Data berhasil dihapus");
                }, 2000);
            },
        });

    const PRIMARY_COL_HEIGHT = rem(300);

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const list = detailAdminPersetujuan?.map((item, index) => (
        <>
            <form onSubmit={formOnSubmit}>
                {namaKategori.toString() === "RUMAH IBADAH" ? (
                    // MASJID START

                    <SimpleGrid
                        cols={{ base: 1, sm: 2 }}
                        spacing="lg"
                        pos="relative"
                    >
                        <LoadingOverlay
                            visible={loading}
                            zIndex={1000}
                            overlayProps={{ radius: "sm", blur: 1 }}
                        />
                        <Paper
                            height={PRIMARY_COL_HEIGHT}
                            withBorder
                            radius="md"
                            shadow="md"
                            p="lg"
                        >
                            <Container>
                                <Stack gap="lg">
                                    <Paper
                                        withBorder
                                        radius="md"
                                        shadow="md"
                                        p="sm"
                                    >
                                        <Tooltip
                                            label={item?.User?.nama}
                                            withArrow
                                            transitionProps={{
                                                transition: "pop",
                                                duration: 500,
                                            }}
                                        >
                                            <Avatar
                                                src={`https://ui-avatars.com/api/?name=${item?.User?.nama}&background=random`}
                                                size={40}
                                                radius={120}
                                                mx="auto"
                                            />
                                        </Tooltip>
                                        <Text
                                            ta="center"
                                            fz="lg"
                                            fw={500}
                                            mt="md"
                                        >
                                            {item?.User?.nama}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.User?.nik} •{" "}
                                            {item?.User?.notelpon}
                                        </Text>
                                    </Paper>
                                    <Paper
                                        withBorder
                                        radius="md"
                                        shadow="md"
                                        p="lg"
                                    >
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.nama} -{" "}
                                            {item?.Keagamaan?.Kategori?.nama}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.wilayah}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.alamat}
                                        </Text>
                                    </Paper>
                                </Stack>
                            </Container>
                        </Paper>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Surat Permohonan
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Suratpermohonan?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Suratpermohonan?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Proposal
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Proposal?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Proposal?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                RAB
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Rab?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Rab?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                SK Pengurus
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Sk?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Sk?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                KTP
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Ktp?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Ktp?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                SIMAS/Rekom
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Asetrekom?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Asetrekom?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                Suket Tipologi
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Suket?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Suket?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconBuildingBank size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Rekening Bank 9
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            truncate="end"
                                        >
                                            {item?.norek}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>
                ) : (
                    // LEMBAGA KEAGAMAAN START
                    <SimpleGrid
                        cols={{ base: 1, sm: 2 }}
                        spacing="lg"
                        pos="relative"
                    >
                        <LoadingOverlay
                            visible={loading}
                            zIndex={1000}
                            overlayProps={{ radius: "sm", blur: 1 }}
                        />
                        <Paper
                            height={PRIMARY_COL_HEIGHT}
                            withBorder
                            radius="md"
                            shadow="md"
                            p="lg"
                        >
                            <Container>
                                <Stack gap="lg">
                                    <Paper
                                        withBorder
                                        radius="md"
                                        shadow="md"
                                        p="sm"
                                    >
                                        <Tooltip
                                            label={item?.User?.nama}
                                            withArrow
                                            transitionProps={{
                                                transition: "pop",
                                                duration: 500,
                                            }}
                                        >
                                            <Avatar
                                                src={`https://ui-avatars.com/api/?name=${item?.User?.nama}&background=random`}
                                                size={40}
                                                radius={120}
                                                mx="auto"
                                            />
                                        </Tooltip>
                                        <Text
                                            ta="center"
                                            fz="lg"
                                            fw={500}
                                            mt="md"
                                        >
                                            {item?.User?.nama}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.User?.nik} •{" "}
                                            {item?.User?.notelpon}
                                        </Text>
                                    </Paper>
                                    <Paper
                                        withBorder
                                        radius="md"
                                        shadow="md"
                                        p="lg"
                                    >
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.nama} -{" "}
                                            {item?.Keagamaan?.Kategori?.nama}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.wilayah}
                                        </Text>
                                        <Text ta="center" c="dimmed" fz="xs">
                                            {item?.Keagamaan?.alamat}
                                        </Text>
                                    </Paper>
                                </Stack>
                            </Container>
                        </Paper>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Surat Permohonan
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Suratpermohonan?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Suratpermohonan?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Proposal
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Proposal?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Proposal?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                RAB
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Rab?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Rab?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                SK Pengurus
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Sk?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Sk?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                KTP
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Ktp?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Ktp?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                Izin Operasional
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Izinoperasional?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Izinoperasional?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                Akta Pendirian
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Aktapendirian?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.Aktapendirian?.namafile}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconDownload size={16} />{" "}
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                            >
                                                Pengesahan
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            component={Anchor}
                                            href={`${basePersetujuanURL}/download/${item?.Pengesahankemenkumham?.namafile}`}
                                            truncate="end"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {
                                                item?.Pengesahankemenkumham
                                                    ?.namafile
                                            }
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                        {/*  */}
                        <Grid gutter="md">
                            <Grid.Col span={isMobile ? 12 : 24}>
                                <Paper
                                    height={SECONDARY_COL_HEIGHT}
                                    withBorder
                                    radius="md"
                                    shadow="md"
                                    p="xl"
                                >
                                    <Stack gap="xl">
                                        <Group justify="center" gap="sm">
                                            <IconBuildingBank size={16} />
                                            <Text
                                                ta="center"
                                                fz={isMobile ? "xs" : "sm"}
                                                truncate="end"
                                            >
                                                Rekening Bank 9
                                            </Text>
                                        </Group>
                                        <Text
                                            ta="center"
                                            fz="xs"
                                            truncate="end"
                                        >
                                            {item?.norek}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>

                    // LEMBAGA KEAGAMAAN END
                )}
                <Space h="lg" />
                <Stack gap="lg">
                    {/* <Select
                    data={value}
                    value={
                        item?.Status?.nama === "PROSES"
                            ? "BELUM DIPROSES"
                            : item?.Status?.nama
                    }
                /> */}

                    <VisuallyHidden>
                        <TextInput disabled {...form.getInputProps("id")} />
                    </VisuallyHidden>
                    {/* 
                    <TextInput
                        disabled
                        fullWidth
                        value={item?.Proses?.keterangan}
                    /> */}

                    {/* Status */}
                    <Combobox
                        store={combobox}
                        withinPortal={false}
                        onOptionSubmit={(value) => {
                            setValue(value);
                            form.setFieldValue("newStatus", value);
                            combobox.closeDropdown();
                        }}
                        transitionProps={{
                            duration: 200,
                            transition: "pop",
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                label="Status"
                                component="button"
                                type="button"
                                pointer
                                rightSectionPointerEvents={
                                    value === null ? "none" : "all"
                                }
                                rightSection={
                                    value !== null ? (
                                        <CloseButton
                                            size="sm"
                                            onMouseDown={(event) =>
                                                event.preventDefault()
                                            }
                                            onClick={() => setValue(null)}
                                            aria-label="Clear value"
                                        />
                                    ) : (
                                        <Combobox.Chevron />
                                    )
                                }
                                onClick={() => combobox.toggleDropdown()}
                                multiline
                                error={form.errors.newStatus && "Harap diisi"}
                            >
                                {selectedOption ? (
                                    <SelectOption {...selectedOption} />
                                ) : (
                                    <Input.Placeholder>
                                        Pilih Status
                                    </Input.Placeholder>
                                )}
                            </InputBase>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options
                                mah={200}
                                type="scroll"
                                style={{ overflowY: "auto" }}
                            >
                                {options}
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>

                    <TextInput
                        disabled
                        fullWidth
                        value={item?.Proses?.keterangan}
                    />

                    <Group grow>
                        <Button
                            fullWidth
                            leftSection={<IconFileDownload size={14} />}
                            type="submit"
                            disabled={!form.isValid()}
                            loading={loading}
                        >
                            Simpan
                        </Button>
                        <Button
                            variant="outline"
                            color="red"
                            leftSection={<IconTrash size={14} />}
                            onClick={openDeleteModal}
                            loading={loading}
                        >
                            Hapus
                        </Button>
                    </Group>
                </Stack>
            </form>
        </>
    ));

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
        {
            title: `Detail - ${params.id}`,
            href: `/dashboard/admin/persetujuan/detail/${params.id}`,
            // href: `/dashboard/admin/persetujuan/${params.id}`,
        },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                {list}
            </Container>
        </>
    );
};

export default PersetujuanDetail;
