import {
    ActionIcon,
    Anchor,
    Badge,
    Breadcrumbs,
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
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import axios from "axios";
import { baseRumahIbadahURL } from "../../utils/baseURL";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";

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
        // e.preventDefault();
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
        // console.log(e.target.value);
        setQuery(e.target.value);
    };

    const rowsList = rumahIbadahState?.map((item) => (
        <Table.Tr key={item?.id}>
            <Table.Td>{item?.id}</Table.Td>
            <Table.Td>{item?.nama}</Table.Td>
            <Table.Td>{item?.alamat}</Table.Td>
            <Table.Td>{item?.wilayah}</Table.Td>
            <Table.Td
            // style={{
            //     textAlign: "center",
            // }}
            >
                {item?.kategoriid === 1 ? (
                    <Badge color="blue">Masjid</Badge>
                ) : (
                    <Badge color="green">Lembaga Pendidikan Keagamaan</Badge>
                )}
            </Table.Td>
        </Table.Tr>
    ));

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

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Paper withBorder shadow="sm" p="xl" style={{ minHeight: 500 }}>
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
                                    <Table.Th key={pages}>ID</Table.Th>
                                    <Table.Th>Nama</Table.Th>
                                    <Table.Th>Alamat</Table.Th>
                                    <Table.Th>Kabupaten/Kota</Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Kategori
                                    </Table.Th>
                                    {/* <Table.Th>Dibuat</Table.Th> */}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rumahIbadahState.length === 0 ? (
                                    <Text p="lg" ta="right" fw={700}>
                                        Data tidak ditemukan
                                    </Text>
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
