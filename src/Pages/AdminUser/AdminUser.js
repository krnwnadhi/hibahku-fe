import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Container,
    Group,
    useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { nprogress } from "@mantine/nprogress";

const AdminUser = () => {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const users = useSelector((state) => state?.users);
    const { loading, usersList = [] } = users;

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

            setUsersListState(result);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getUsersList();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    const items = [
        { title: "Beranda", href: "/dashboard" },
        { title: "List User", href: "/dashboard/admin/list" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const columns = useMemo(
        () => [
            {
                header: "No",
                id: "id",
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
                Cell: ({ cell }) =>
                    cell.getValue() === null
                        ? "Tidak Ada Data"
                        : cell.getValue(),
            },
            {
                accessorKey: "Role.nama",
                header: "Role",
                Cell: ({ cell }) => (
                    <Badge
                        size="sm"
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
                enableGrouping: false,
                id: "createdAt",
                header: "Dibuat",
                filterVariant: "date-range",
                sortingFn: "datetime",
                enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
                Cell: ({ cell }) =>
                    cell.getValue()?.toLocaleDateString("id-ID"), //render Date as a string
            },
        ],
        []
    );

    const data = usersListState;

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
        enableRowSelection: true,
        enableColumnResizing: true,
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
};

export default AdminUser;
