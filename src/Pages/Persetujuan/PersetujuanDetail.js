import {
    Anchor,
    Avatar,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Group,
    Paper,
    Select,
    SimpleGrid,
    Skeleton,
    Space,
    Stack,
    Text,
    TextInput,
    Tooltip,
    em,
    rem,
} from "@mantine/core";
import { IconBuildingBank, IconDownload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { basePersetujuanURL } from "../../utils/baseURL";
import { getDetailAdminPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";

const PersetujuanDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const [value, setValue] = useState([
        "DISETUJUI",
        "DITOLAK",
        "BELUM DIPROSES",
    ]);

    useEffect(() => {
        // dispatch(getAllPersetujuanAction());
        dispatch(getDetailAdminPersetujuanAction(params?.id));
    }, [dispatch, params]);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, appError, serverError, detailAdminPersetujuan } =
        persetujuan;

    console.log(detailAdminPersetujuan);

    const PRIMARY_COL_HEIGHT = rem(300);

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const list = detailAdminPersetujuan?.map((item, index) => (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <Paper
                    height={PRIMARY_COL_HEIGHT}
                    withBorder
                    radius="md"
                    shadow="md"
                    p="lg"
                >
                    <Container>
                        <Stack gap="lg">
                            <Paper withBorder radius="md" shadow="md" p="sm">
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
                                <Text ta="center" fz="lg" fw={500} mt="md">
                                    {item?.User?.nama}
                                </Text>
                                <Text ta="center" c="dimmed" fz="xs">
                                    {item?.User?.nik} • {item?.User?.notelpon}
                                </Text>
                            </Paper>
                            <Paper withBorder radius="md" shadow="md" p="lg">
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
                                <Text ta="center" fz="xs" truncate="end">
                                    {item?.norek}
                                </Text>
                            </Stack>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            <Space h="lg" />
            <Stack gap="lg">
                <Select
                    data={value}
                    value={
                        item?.Status?.nama === "PROSES"
                            ? "BELUM DIPROSES"
                            : item?.Status?.nama
                    }
                />
                <TextInput fullWidth value={item?.Proses?.nama} />
                <Button fullWidth>Simpan</Button>
            </Stack>{" "}
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
