import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Container,
    Popover,
    Text,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { basePersetujuanURL } from "../../utils/baseURL";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import { nprogress } from "@mantine/nprogress";

const Persetujuan = () => {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();

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
                    LAPORAN PERTANGGUNGJAWABAN PENGGUNAAN DANA BANTUAN HIBAH
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

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    const citiesList = [
        "Kab. Batanghari",
        "Kab. Bungo",
        "Kab. Kerinci",
        "Kab. Merangin",
        "Kab. Muaro Jambi",
        "Kab. Sarolangun",
        "Kab. Tanjung Jabung Barat",
        "Kab. Tanjung Jabung Timur",
        "Kab. Tebo",
        "Kota Jambi",
        "Kota Sungai Penuh",
    ];

    const categoryList = ["RUMAH IBADAH", "LEMBAGA KEAGAMAAN"];

    const columns = useMemo(
        () => [
            {
                header: "No",
                id: "no",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 55,
                Cell: ({ row }) => {
                    return <> {row.index + 1} </>;
                },
            },
            {
                id: "id",
                header: "",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 50,
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
                accessorKey: "Status.id",
                header: "Status",
                minSize: 175,
                maxSize: 225,
                size: 200,
                Cell: ({ row }) => (
                    <>{getStatusText(row?.original?.Status?.id)}</>
                ),
            },
            {
                accessorKey: "Proses.id",
                header: "Proses",
                minSize: 200,
                maxSize: 500,
                size: 325,
                Cell: ({ row }) => (
                    <>{getProsesText(row?.original?.Proses?.id)}</>
                ),
            },
            {
                accessorKey: "keagamaanid",
                header: "No. SIMAS/NSPP/NSM",
                enableClickToCopy: true,
                minSize: 250,
                maxSize: 300,
                size: 275,
            },
            {
                accessorKey: "Keagamaan.nama",
                header: "Nama Tempat",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                accessorKey: "Keagamaan.alamat",
                header: "Alamat",
                minSize: 275,
                maxSize: 450,
                size: 300,
            },
            {
                accessorKey: "Keagamaan.wilayah",
                header: "Kabupaten/Kota",
                minSize: 200,
                maxSize: 250,
                size: 225,
                filterVariant: "select",
                mantineFilterSelectProps: {
                    data: citiesList,
                },
            },
            {
                accessorKey: "Keagamaan.Kategori.nama",
                header: "Kategori",
                minSize: 175,
                maxSize: 225,
                size: 200,
                Cell: ({ row }) => (
                    <Badge
                        color={
                            row.original?.Keagamaan?.Kategori?.id === 1
                                ? "green"
                                : "blue"
                        }
                        size="xs"
                    >
                        {row.original?.Keagamaan?.Kategori?.id === 2
                            ? "RUMAH IBADAH"
                            : "LEMBAGA KEAGAMAAN"}
                    </Badge>
                ),
                filterVariant: "select",
                mantineFilterSelectProps: {
                    data: categoryList,
                },
            },
            {
                accessorKey: "pengajuandana",
                header: "Usulan Dana",
                minSize: 175,
                maxSize: 225,
                size: 200,
                Cell: ({ row }) =>
                    new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(row?.original?.pengajuandana),
            },
            {
                accessorKey: "tujuan",
                header: "Peruntukkan Dana",
                minSize: 225,
                maxSize: 275,
                size: 250,
            },
            {
                accessorFn: (row) => {
                    const sDay = new Date(row.createdAt);
                    sDay.setHours(0, 0, 0, 0);
                    return sDay;
                },
                minSize: 150,
                maxSize: 200,
                size: 175,
                enableGrouping: false,
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
        mantineTableProps: {
            withColumnBorders: true,
            highlightOnHover: false,
            style: {
                fontSize: "12px",
            },
        },
        withBorder: colorScheme === "light",
        sx: {
            "thead > tr": {
                backgroundColor: "inherit",
            },
            "thead > tr > th": {
                backgroundColor: "inherit",
            },
            "tbody > tr > td": {
                backgroundColor: "inherit",
            },
        },
        layoutMode: "grid",
        enableColumnResizing: true,
        columns,
        data,
        enableRowSelection: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
        enableColumnPinning: true,
        initialState: {
            density: "xs",
            columnPinning: {
                left: ["id"],
            },
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "20"],
        },
        enableGrouping: true,
        paginationDisplayMode: "pages",
        enableFullScreenToggle: false,
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

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    return (
        <>
            <Container size="xl" pos="relative">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <MantineReactTable
                    table={table}
                    enableStickyHeader
                    mantineTableContainerProps={{
                        style: { minHeight: 500 },
                    }}
                />
            </Container>
        </>
    );
};

export default Persetujuan;
