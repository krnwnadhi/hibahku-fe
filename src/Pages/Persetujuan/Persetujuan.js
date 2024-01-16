import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Center,
    Container,
    Group,
    LoadingOverlay,
    Pagination,
    Paper,
    Popover,
    Space,
    Table,
    Text,
    TextInput,
    Tooltip,
    rem,
} from "@mantine/core";
import {
    IconArrowRight,
    IconCheck,
    IconPencil,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/DateFormatter";
import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { basePersetujuanURL } from "../../utils/baseURL";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { useSearchParams } from "react-router-dom";

const Persetujuan = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    // const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, persetujuanList = [] } = persetujuan;
    // console.log(persetujuanList);

    const [persetujuanListState, setPersetujuanListState] = useState([
        persetujuanList,
    ]);

    const getPersetujuanList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${basePersetujuanURL}/list`,
                config
            );
            const result = response?.data?.result;

            setPersetujuanListState(result);
            // setTotalItems(response.data.totalItems);
            // setTotalPage(response.data.totalPage);
            // setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPersetujuanList();
        window.scrollTo(0, 0);
    }, []);

    const getStatusText = (statusid) => {
        const statusMap = {
            1: (
                <Badge color="green" size="xs">
                    DISETUJUI
                </Badge>
            ),
            2: (
                <Badge color="red" size="xs">
                    DITOLAK
                </Badge>
            ),
            3: (
                <Badge color="blue" size="xs">
                    BELUM DIPROSES
                </Badge>
            ),
        };

        return statusMap[statusid] || "Status tidak valid";
    };

    const getProsesText = (prosesid) => {
        const prosesMap = {
            1: (
                <Badge color="green" size="xs">
                    VERIFIKASI PERSYARATAN ADMINISTRASI
                </Badge>
            ),
            2: (
                <Badge color="green" size="xs">
                    VERIFIKASI FAKTUAL(SURVEI LAPANGAN)
                </Badge>
            ),
            3: (
                <Badge color="green" size="xs">
                    REKOMENDASI
                </Badge>
            ),
            4: (
                <Badge color="green" size="xs">
                    PERTIMBANGAN TAPD
                </Badge>
            ),
            5: (
                <Badge color="green" size="xs">
                    PENGANGGARAN
                </Badge>
            ),
            6: (
                <Badge color="green" size="xs">
                    PENERBITAN SK SDH DAN DOKUMEN LAINNNYA
                </Badge>
            ),
            7: (
                <Badge color="green" size="xs">
                    PENANDATANGANAN NPHD, PAKTA INTEGRITAS, PERNYATAAN TANGGUNG
                    JAWAB, DLL
                </Badge>
            ),
            8: (
                <Badge color="green" size="xs">
                    PENCAIRAN DANA BANTUAN HIBAH
                </Badge>
            ),
            9: (
                <Badge color="green" size="xs">
                    LAPORAN PERTANGGUNGJAWABAN PENGGUNAAN DANA BANTUAN HIBAH"
                </Badge>
            ),
            10: (
                <Badge color="blue" size="xs">
                    BELUM DIPROSES
                </Badge>
            ),
            11: (
                <Badge color="red" size="xs">
                    DITOLAK
                </Badge>
            ),
        };

        return prosesMap[prosesid] || "Proses tidak valid";
    };

    const textCenter = {
        textAlign: "center",
    };

    const rowsList = persetujuanListState?.map((item, index) => (
        <Table.Tr key={item?.index}>
            <Table.Td>
                <Text size="xs" ta="center">
                    {index + 1}
                </Text>
            </Table.Td>
            <Table.Td ta="center">
                <Tooltip label="Edit">
                    <ActionIcon
                        component={Anchor}
                        href={`/dashboard/admin/persetujuan/detail/${item?.id}`}
                        // to={`/dashboard/admin/persetujuan/${item?.id}`}
                        color="red"
                        variant="subtle"
                    >
                        <IconPencil size={14} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Table.Td>
            <Popover width={250} position="bottom" withArrow shadow="md">
                <Popover.Target style={{ cursor: "pointer" }}>
                    <Table.Td>
                        <Text size="xs">{item?.keagamaanid}</Text>
                    </Table.Td>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="xs">Nama Masjid: {item?.Keagamaan?.nama}</Text>
                    <Text size="xs">Kab/Kota: {item?.Keagamaan?.wilayah}</Text>
                    <Text size="xs">Alamat: {item?.Keagamaan?.alamat}</Text>
                </Popover.Dropdown>
            </Popover>
            <Table.Td>
                <Text size="xs" ta="center">
                    {item?.userid}
                </Text>
            </Table.Td>
            <Table.Td>{getStatusText(item?.statusid)}</Table.Td>
            <Table.Td>{getProsesText(item?.prosesid)}</Table.Td>
            <Table.Td>
                <Text size="xs">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(item?.pengajuandana)}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text size="xs">{item?.tujuan}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="xs">{item?.norek}</Text>
            </Table.Td>
            <Table.Td style={textCenter}>
                <Text size="xs">
                    <DateFormatter date={item?.createdAt} />
                </Text>
            </Table.Td>

            <Table.Td style={textCenter}>
                {item?.skid && <IconCheck size={16} />}
            </Table.Td>
            <Table.Td style={textCenter}>
                {item?.ktpid && <IconCheck size={16} />}
            </Table.Td>
            <Table.Td style={textCenter}>
                {item?.suratpermohonanid && <IconCheck size={16} />}
            </Table.Td>
            <Table.Td style={textCenter}>
                {item?.asetrekomid && <IconCheck size={16} />}
            </Table.Td>
        </Table.Tr>
    ));

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    const columns = useMemo(
        () => [
            {
                id: "id",
                header: "Edit",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                size: 80,
                Cell: ({ row }) => (
                    <Tooltip label="Edit">
                        <ActionIcon
                            component={Anchor}
                            href={`/dashboard/admin/persetujuan/detail/${row.original?.id}`}
                            color="red"
                            variant="subtle"
                        >
                            <IconPencil size={14} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                ),
            },
            {
                id: "masjid",
                header: "Masjid",
                columns: [
                    {
                        accessorKey: "keagamaanid",
                        header: "No. SIMAS/NSPP/NSM",
                        enableClickToCopy: true,
                    },
                    {
                        accessorKey: "Keagamaan.nama",
                        header: "Nama",
                    },
                    {
                        accessorKey: "Keagamaan.alamat",
                        header: "Alamat",
                    },
                    {
                        accessorKey: "Keagamaan.wilayah",
                        header: "Kabupaten/Kota",
                    },
                    {
                        accessorKey: "Keagamaan.Kategori.nama",
                        header: "Kategori",
                        Cell: ({ cell, row }) => (
                            <Badge
                                color={
                                    row.original?.Keagamaan?.Kategori?.id === 1
                                        ? "green"
                                        : "blue"
                                }
                            >
                                {row.original?.Keagamaan?.Kategori?.id === 2
                                    ? "RUMAH IBADAH"
                                    : "LEMBAGA PENDIDIKAN KEAGAMAAN"}
                            </Badge>
                        ),
                    },
                ],
            },
            {
                id: "user",
                header: "User",
                columns: [
                    {
                        accessorKey: "userid",
                        header: "User ID",
                        Cell: ({ row }) => (
                            <Popover
                                width={250}
                                position="bottom"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target style={{ cursor: "pointer" }}>
                                    <Text size="xs">
                                        {row?.original?.userid}
                                    </Text>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="xs">
                                        Nama: {row?.original?.User?.nama}
                                    </Text>
                                    <Text size="xs">
                                        No. HP: {row?.original?.User?.notelpon}
                                    </Text>
                                </Popover.Dropdown>
                            </Popover>
                        ),
                    },
                ],
            },
            {
                accessorFn: (row) => {
                    const sDay = new Date(row.createdAt);
                    sDay.setHours(0, 0, 0, 0);
                    return sDay;
                },
                id: "createdAt",
                header: "Dibuat",
                filterVariant: "date-range",
                sortingFn: "datetime",
                // enableColumnFilter: false,
                enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
                Cell: ({ cell }) =>
                    cell.getValue()?.toLocaleDateString("id-ID"), //render Date as a string
            },
        ],
        []
    );

    const data = persetujuanListState;

    const table = useMantineReactTable({
        layoutMode: "grid",
        enableColumnResizing: true,
        columns,
        data,
        // enableRowSelection: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
        enableRowNumbers: true,
        rowNumberMode: "original",
        // columnFilterDisplayMode: "popover",
        initialState: {
            density: "xs",
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "20"],
            // withEdges: false,
            // withControls: false,
        },
        enableGrouping: true,
        // initialState: {
        //     grouping: ["nik"],
        //     // expanded: true,
        // },
        paginationDisplayMode: "pages",
        enableFullScreenToggle: false,
        // enableDensityToggle: false,
        // enableRowActions: true,
        renderRowActions: ({ row }) => (
            <Box style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
                <ActionIcon
                    color="red"
                    size={18}
                    onClick={() => {
                        table.setEditingRow(row);
                    }}
                >
                    <IconEdit />
                </ActionIcon>
            </Box>
        ),
        mantineSearchTextInputProps: {
            placeholder: "Cari",
        },
    });

    return (
        <>
            <Container size="xl" pos="relative">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                />
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                {/* <Paper withBorder shadow="xl" p="md" style={{ minHeight: 500 }}> */}
                <MantineReactTable table={table} enableStickyHeader />
                {/* </Paper> */}

                {/* <Paper withBorder shadow="sm" p="xl" style={{ minHeight: 500 }}>
                    <Group>
                        <LoadingOverlay
                            visible={load}
                            zIndex={1000}
                            overlayProps={{ radius: "sm", blur: 1 }}
                        />
                        <TextInput
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchData();
                                }
                            }}
                            value={query}
                            onChange={handleTextInput}
                            radius="md"
                            size="sm"
                            placeholder="Cari ID Rumah Ibadah"
                            leftSection={
                                <IconSearch
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            rightSection={
                                <ActionIcon
                                    size={28}
                                    radius="xl"
                                    variant="filled"
                                    onClick={searchData}
                                    disabled={!query}
                                >
                                    <IconArrowRight
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                            }
                        />

                        {query && (
                            <ActionIcon
                                onClick={resetData}
                                disabled={!query}
                                variant="subtle"
                                color="red"
                                ml={-10}
                            >
                                <IconX size={14} />
                            </ActionIcon>
                        )}
                    </Group>

                    <Space h="lg" />

                    <Table.ScrollContainer minWidth={500}>
                        <Table
                            withColumnBorders
                            withTableBorder
                            horizontalSpacing="sm"
                            verticalSpacing="sm"
                            striped
                            highlightOnHover
                            fz="xs"
                        >
                            <Table.Thead>
                                <Table.Tr key={pages}>
                                    <Table.Th rowSpan={2}>No.</Table.Th>
                                    <Table.Th rowSpan={2}>Aksi</Table.Th>
                                    <Table.Th key={pages} rowSpan={2}>
                                        ID Rumah Ibadah
                                    </Table.Th>
                                    <Table.Th rowSpan={2}>User ID</Table.Th>
                                    <Table.Th rowSpan={2}>Status</Table.Th>
                                    <Table.Th rowSpan={2}>Proses</Table.Th>
                                    <Table.Th rowSpan={2}>
                                        Pengajuan Dana
                                    </Table.Th>
                                    <Table.Th rowSpan={2}>Tujuan</Table.Th>
                                    <Table.Th rowSpan={2}>
                                        No. Rekening
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                        rowSpan={2}
                                    >
                                        Dibuat
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                        colSpan={8}
                                    >
                                        Persyaratan Administrasi
                                    </Table.Th>
                                </Table.Tr>
                                <Table.Tr key={pages}>
                                    <Table.Th>SK Pengurus</Table.Th>
                                    <Table.Th>KTP</Table.Th>
                                    <Table.Th>Surat Permohonan</Table.Th>
                                    <Table.Th>Aset Rekomendasi</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {persetujuanListState.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={14}>
                                            <Text fw={500} ta="center">
                                                Data Tidak Ditemukan
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    rowsList
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    <Space h="sm" />

                    <Text size="sm">
                        Halaman {pages} dari {totalPage} total : {totalItems}{" "}
                        data
                    </Text>

                    <Space h="lg" />

                    <Center>
                        <Pagination
                            onChange={handlePageChange}
                            total={totalPage}
                            // total={Math.min(2, totalPage)}
                            withControls
                            withEdges
                        />
                    </Center>
                </Paper> */}
            </Container>
        </>
    );
};

export default Persetujuan;
