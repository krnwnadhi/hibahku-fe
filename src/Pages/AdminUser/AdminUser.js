import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Container,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
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
            },
            {
                accessorKey: "nama",
                header: "Nama",
            },
            {
                accessorKey: "notelpon",
                accessorFn: (dataRow) => dataRow?.notelpon,
                id: "notelpon",
                header: "No. HP",
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

    const data = usersListState;

    const table = useMantineReactTable({
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
            // density: "lg",
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
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>
                <MantineReactTable table={table} enableStickyHeader />
            </Container>
        </>
    );
};

export default AdminUser;
