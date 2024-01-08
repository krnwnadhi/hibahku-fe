import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Group,
} from "@mantine/core";
import { IconEdit, IconFileTypeCsv } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { useDispatch, useSelector } from "react-redux";

import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
import dayjs from "dayjs";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";

const AdminUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const users = useSelector((state) => state?.users);
    const { loading, usersList = [] } = users;
    // console.log(usersList);

    const [usersListState, setUsersListState] = useState([usersList]);

    const getUsersList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(`${baseUserURL}/getusers`, config);
            const result = response?.data?.result;
            console.log(result);

            setUsersListState(result);
            // setTotalItems(response.data.totalItems);
            // setTotalPage(response.data.totalPage);
            // setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsersList();
        window.scrollTo(0, 0);
    }, []);

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "List User", href: "/dashboard/admin/list" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    const columns = useMemo(
        () => [
            {
                accessorKey: "nik",
                header: "NIK",
                enableClickToCopy: true,
                minSize: 175,
                maxSize: 300,
                size: 250,
            },
            {
                accessorKey: "nama",
                header: "Nama",
                minSize: 150,
                maxSize: 275,
                size: 225,
            },
            {
                accessorKey: "notelpon",
                accessorFn: (dataRow) => dataRow?.notelpon,
                id: "notelpon",
                header: "No. HP",
                minSize: 150,
                maxSize: 275,
                size: 225,
            },
            {
                accessorKey: "Role.nama",
                header: "Role",
                Cell: ({ cell }) => (
                    <Badge
                        color={cell.getValue() === "ADMIN" ? "red" : "green"}
                    >
                        {cell.getValue()}
                    </Badge>
                ),
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

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => {
            return {
                NIK: row.original.nik,
                Nama: row.original.nama,
                NoHp: row.original.notelpon,
                Role: row.original.Role.nama,
                Dibuat: dayjs(row.original.createdAt)
                    .locale("id")
                    .format("DD-MMM-YYYY"),
            };
        });
        const csvConfig = mkConfig({
            fieldSeparator: ";",
            decimalSeparator: ".",
            useKeysAsHeaders: true,
            filename: `User-${dayjs()
                .locale("id")
                .format("DD-MMM-YYYY HH_mm_ss")}`,
        });

        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const data = usersListState;

    const table = useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableColumnResizing: true,
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
};

export default AdminUser;
