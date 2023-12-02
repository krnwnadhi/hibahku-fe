import {
    ActionIcon,
    Button,
    Center,
    Container,
    Group,
    Loader,
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
    IconPlus,
    IconSearch,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseRumahIbadahURL } from "../../utils/baseURL";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";

export default function RumahIbadah() {
    const dispatch = useDispatch();
    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllRumahIbadahAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { rumahIbadahList = [] } = rumahIbadah;

    const [rumahIbadahState, setRumahIbadahState] = useState([rumahIbadahList]);
    const [load, setLoad] = useState(false);

    const [pages, setPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState("");
    // const [msg, setMsg] = useState("");

    const [query, setQuery] = useState("");

    const getRumahIbadahList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${baseRumahIbadahURL}/list?nama=${keyword}&page=${pages}&limit=${limit}`,
                config
            );
            const result = response?.data?.result;

            setRumahIbadahState(result);
            setTotalItems(response.data.totalItems);
            setTotalPage(response.data.totalPage);
            setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRumahIbadahList();
        window.scrollTo(0, 0);
    }, [pages, keyword]);

    const handlePageChange = async (event) => {
        setPages(event);
        // if (event === 2) {
        //     setMsg(
        //         "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
        //     );
        // } else {
        //     setMsg("");
        // }
        // console.log(event);
    };

    const searchData = (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setPages(1);
            setKeyword(query);
            setLoad(false);
        }, 1000);
    };

    const resetData = (e) => {
        e.preventDefault();
        setKeyword("");
        setQuery("");
    };

    const handleTextInput = (e) => {
        // console.log(e.target.value);
        setQuery(e.target.value);
    };

    const rowsList = rumahIbadahState?.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>{item.id}</Table.Td>
            <Table.Td>{item.nama}</Table.Td>
            <Table.Td>{item.alamat}</Table.Td>
            <Table.Td>{item.wilayah}</Table.Td>
            <Table.Td>
                {item.kategoriid === 1
                    ? "Masjid"
                    : "Lembaga Pendidikan Keagamaan"}
            </Table.Td>
            {/* <Table.Td>
                <DateFormatter date={item?.createdAt} />
            </Table.Td> */}
        </Table.Tr>
    ));

    return (
        <>
            <Container size="xl">
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
                    <ActionIcon
                        component={Link}
                        to="/dashboard/rumah-ibadah/create"
                        variant="filled"
                        aria-label="Add"
                    >
                        <IconPlus
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>

                    <Space h="sm" />

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
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Nama</Table.Th>
                                    <Table.Th>Alamat</Table.Th>
                                    <Table.Th>Kabupaten/Kota</Table.Th>
                                    <Table.Th>Kategori</Table.Th>
                                    {/* <Table.Th>Dibuat</Table.Th> */}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rumahIbadahState.length === 0 ? (
                                    <Text>Data tidak ditemukan</Text>
                                ) : (
                                    rowsList
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    {/* <Text>{msg}</Text> */}

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
}
