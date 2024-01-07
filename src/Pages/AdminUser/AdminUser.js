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
    Space,
    Table,
    Text,
    TextInput,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconArrowRight,
    IconEdit,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/DateFormatter";
import { MRT_Localization_ID } from "mantine-react-table/locales/id";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { useSearchParams } from "react-router-dom";

const AdminUser = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    // const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const users = useSelector((state) => state?.users);
    const { loading, usersList = [] } = users;
    // console.log(usersList);

    const [usersListState, setUsersListState] = useState([usersList]);
    // console.log(usersListState);

    const [load, setLoad] = useState(false);

    const [pages, setPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    const getUsersList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${baseUserURL}/getusers?nama=${keyword}&page=${pages}&limit=${limit}`,
                config
            );
            const result = response?.data?.result;
            console.log(result);

            setUsersListState(result);
            setTotalItems(response.data.totalItems);
            setTotalPage(response.data.totalPage);
            setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsersList();
        window.scrollTo(0, 0);
    }, [pages, keyword]);

    const handlePageChange = async (event) => {
        setPages(event);
    };

    const searchData = (e) => {
        setLoad(true);
        setTimeout(() => {
            setPages(1);
            setKeyword(query);
            setLoad(false);
        }, 1000);
        searchParams.set("nama", query);
        setSearchParams(searchParams);
    };

    const resetData = (e) => {
        e.preventDefault();
        setKeyword("");
        setQuery("");
        setSearchParams("");
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

    const rowsList = usersListState?.map((item, index) => (
        <Table.Tr key={item?.id}>
            <Table.Td>
                <Text size="xs" ta="center">
                    {index + 1}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text size="xs">{item?.nik}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="xs">{item?.nama}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="xs">
                    {item?.notelpon === null ? "Tidak Ada" : item?.notelpon}
                </Text>
            </Table.Td>
            <Table.Td
                style={{
                    textAlign: "center",
                }}
            >
                {item?.roleid === 1 ? (
                    <Badge color="green" size="xs">
                        Admin
                    </Badge>
                ) : (
                    <Badge color="blue" size="xs">
                        User
                    </Badge>
                )}
            </Table.Td>
            <Table.Td
                style={{
                    textAlign: "center",
                }}
            >
                <Text size="xs">
                    <DateFormatter date={item?.createdAt} />
                </Text>
            </Table.Td>
        </Table.Tr>
    ));

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
                    // <Box
                    //     style={(theme) => ({
                    //         backgroundColor:
                    //             cell.getValue === "Admin" ? "red" : "green",
                    //         borderRadius: "4px",
                    //         maxWidth: "9ch",
                    //         padding: "4px",
                    //     })}
                    // >
                    //     {cell.getValue()}
                    // </Box>
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

                // Edit: ({ cell }) => cell.getValue().toLocaleDateString(),
            },
        ],
        []
    );

    const data = usersListState;

    const table = useMantineReactTable({
        columns,
        data,
        // enableRowSelection: true,
        enableColumnOrdering: true,
        enableRowNumbers: true,
        rowNumberMode: "original",
        // columnFilterDisplayMode: "popover",
        state: {
            showProgressBars: loading,
            isLoading: loading,
            density: "lg",
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
        enableDensityToggle: false,
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
    });

    return (
        <>
            <Container size="xl" pos="relative">
                {/* <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                /> */}
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>
                {/* <Paper withBorder shadow="sm" p="xl" style={{ minHeight: 500 }}>
                    <Group>
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
                            placeholder="Cari Berdasarkan Nama"
                            // rightSectionWidth={40}
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
                                    // color={theme.primaryColor}
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
                            horizontalSpacing="lg"
                            verticalSpacing="md"
                            striped
                            highlightOnHover
                        >
                            <Table.Thead>
                                <Table.Tr key={pages}>
                                    <Table.Th
                                        style={{ width: "5%" }}
                                        key={pages}
                                    >
                                        No.
                                    </Table.Th>
                                    <Table.Th key={pages}>NIK</Table.Th>
                                    <Table.Th>Nama</Table.Th>
                                    <Table.Th>No. HP</Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Role
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Dibuat
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {usersListState.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={6}>
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

                    <Space h="xl" />

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
                <MantineReactTable tabb table={table} enableStickyHeader />
            </Container>
        </>
    );
};

export default AdminUser;
