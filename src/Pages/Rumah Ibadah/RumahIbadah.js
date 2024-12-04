import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Container,
    useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { baseRumahIbadahURL } from "../../utils/baseURL";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { nprogress } from "@mantine/nprogress";

export default function RumahIbadah() {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();

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
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getRumahIbadahList();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const items = [
        { title: "Beranda", href: "/dashboard" },
        { title: "List Rumah Ibadah", href: "/dashboard/rumah-ibadah/list" },
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
                Cell: ({ row }) => {
                    return <> {row.index + 1} </>;
                },
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 55,
            },
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
                        size="xs"
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
        ],
        // eslint-disable-next-line
        []
    );

    const data = rumahIbadahState;

    const table = useMantineReactTable({
        mantineTableProps: {
            withColumnBorders: true,
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
        columns,
        data,
        enableColumnResizing: true,
        enableRowSelection: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
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
