import {
    ActionIcon,
    Anchor,
    Badge,
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
import { IconArrowRight, IconSearch, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/DateFormatter";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { useSearchParams } from "react-router-dom";

const AdminUser = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const users = useSelector((state) => state?.users);
    const { usersList = [] } = users;
    // console.log(usersList);

    const [usersListState, setusersListState] = useState([usersList]);
    const [load, setLoad] = useState(false);

    const [pages, setPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState("");
    // const [msg, setMsg] = useState("");

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

            setusersListState(result);
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

    const rowsList = usersListState?.map((item) => (
        <Table.Tr key={item?.id}>
            {/* <Table.Td>{item?.id}</Table.Td> */}
            <Table.Td>{item?.nik}</Table.Td>
            <Table.Td>{item?.nama}</Table.Td>
            <Table.Td>{item?.notelpon}</Table.Td>
            <Table.Td
                style={{
                    textAlign: "center",
                }}
            >
                {item?.roleid === 1 ? (
                    <Badge color="red">Admin</Badge>
                ) : (
                    <Badge color="blue">User</Badge>
                )}
            </Table.Td>
            <Table.Td
                style={{
                    textAlign: "center",
                }}
            >
                <DateFormatter date={item?.createdAt} />
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

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>
                <Paper withBorder shadow="sm" p="xs">
                    <Group
                        justify="center"
                        // bg="var(--mantine-color-blue-light)"
                        p={5}
                    >
                        <LoadingOverlay
                            visible={load}
                            zIndex={1000}
                            overlayProps={{ radius: "sm", blur: 1 }}
                        />
                        {/* <Button component={Link} to="/dashboard/admin">
                Tambah
            </Button> */}

                        <TextInput
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchData();
                                }
                            }}
                            value={query}
                            onChange={handleTextInput}
                            radius="xl"
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
                                    size={32}
                                    radius="xl"
                                    color={theme.primaryColor}
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
                </Paper>

                <Space h="sm" />

                <Paper withBorder shadow="sm" p="xl" style={{ minHeight: 500 }}>
                    <Table.ScrollContainer minWidth={500}>
                        <Table
                            withColumnBorders
                            withTableBorder
                            horizontalSpacing="md"
                            verticalSpacing="sm"
                            striped
                            highlightOnHover
                        >
                            <Table.Thead>
                                <Table.Tr key={pages}>
                                    {/* <Table.Th key={pages}>ID</Table.Th> */}
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
                                    <Text>Data tidak ditemukan</Text>
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
                </Paper>
            </Container>
        </>
    );
};

export default AdminUser;
