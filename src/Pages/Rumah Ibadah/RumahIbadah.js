import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Group,
    useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { IconDownload } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import { IconFileTypeCsv } from "@tabler/icons-react";
import axios from "axios";
import { baseRumahIbadahURL } from "../../utils/baseURL";
import dayjs from "dayjs";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { useSearchParams } from "react-router-dom";

export default function RumahIbadah() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllRumahIbadahAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading, rumahIbadahList = [] } = rumahIbadah;

    const [rumahIbadahState, setRumahIbadahState] = useState([rumahIbadahList]);

    const getRumahIbadahList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${baseRumahIbadahURL}/list`,
                config
            );
            const result = response?.data?.result;

            setRumahIbadahState(result);
            // setTotalItems(response.data.totalItems);
            // setTotalPage(response.data.totalPage);
            // setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRumahIbadahList();
        window.scrollTo(0, 0);
    }, []);

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "List Rumah Ibadah", href: "/dashboard/rumah-ibadah/list" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="sm"
            // underline={false}
            truncate="end"
        >
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
                accessorKey: "id",
                header: "ID SIMAS/NSPP/NSM",
                enableClickToCopy: true,
                minSize: 150,
                maxSize: 275,
                size: 225,
            },
            {
                accessorKey: "nama",
                header: "Nama",
                minSize: 150,
                maxSize: 250,
                size: 200,
            },
            {
                accessorKey: "alamat",
                header: "Alamat",
                minSize: 300,
                maxSize: 1000,
                size: 350,
            },
            {
                accessorKey: "wilayah",
                header: "Kabupaten/Kota",
                filterVariant: "select",
                minSize: 150,
                maxSize: 250,
                size: 225,
                mantineFilterSelectProps: {
                    data: citiesList,
                },
            },
            {
                accessorKey: "Kategori.nama",
                header: "Kategori",
                Cell: ({ cell }) => (
                    <Badge
                        color={
                            cell.getValue() === "RUMAH IBADAH"
                                ? "blue"
                                : "green"
                        }
                    >
                        {cell.getValue()}
                    </Badge>
                ),
                filterVariant: "select",
                mantineFilterSelectProps: {
                    data: categoryList,
                },
                minSize: 150,
                maxSize: 250,
                size: 200,
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
                minSize: 100,
                maxSize: 200,
                size: 150,
            },
        ],
        []
    );

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => {
            return {
                ID: row.original.id,
                Nama: row.original.nama,
                Alamat: row.original.alamat,
                Wilayah: row.original.wilayah,
                Kategori: row.original.Kategori.nama,
                Dibuat: dayjs(row.original.createdAt)
                    .locale("id")
                    .format("DD-MMM-YYYY"),
            };
        });
        const csvConfig = mkConfig({
            fieldSeparator: ";",
            decimalSeparator: ".",
            useKeysAsHeaders: true,
            filename: `Rumah-Ibadah-${dayjs()
                .locale("id")
                .format("DD-MMM-YYYY HH_mm_ss")}`,
        });

        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const data = rumahIbadahState;

    const table = useMantineReactTable({
        columns,
        data,
        enableColumnResizing: true,
        enableRowSelection: true,
        // enableRowSelection: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
        enableRowNumbers: true,
        rowNumberMode: "original",
        initialState: {
            density: "xs",
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "20"],
        },
        enableGrouping: true,
        mantineTableHeadCellProps: {
            style: {
                backgroundColor: "var(--mantine-color-blueGray-light)",
                border: "1px solid lightgray",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                border: "1px solid lightgray",
            },
        },
        paginationDisplayMode: "pages",
        enableFullScreenToggle: false,
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
        renderTopToolbarCustomActions: ({ table }) => (
            <Group p="md" justify="space-between">
                <Button
                    disabled={
                        table.getPrePaginationRowModel().rows.length === 0
                    }
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    leftSection={<IconDownload size={16} />}
                    rightSection={<IconFileTypeCsv size={16} />}
                    variant="filled"
                    size="xs"
                >
                    Export All Rows
                </Button>
                <Button
                    disabled={table.getRowModel().rows.length === 0}
                    //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    leftSection={<IconDownload size={16} />}
                    rightSection={<IconFileTypeCsv size={16} />}
                    variant="filled"
                    size="xs"
                >
                    Export Page Rows
                </Button>
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() &&
                        !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() =>
                        handleExportRows(table.getSelectedRowModel().rows)
                    }
                    leftSection={<IconDownload size={16} />}
                    rightSection={<IconFileTypeCsv size={16} />}
                    variant="filled"
                    size="xs"
                >
                    Export Selected Rows
                </Button>
            </Group>
        ),
    });

    return (
        <>
            <Container size="xl" pos="relative">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <MantineReactTable table={table} enableStickyHeader />
            </Container>
        </>
    );
}
