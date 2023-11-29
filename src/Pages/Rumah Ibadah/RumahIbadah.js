import {
    ActionIcon,
    Button,
    Container,
    Group,
    Loader,
    Pagination,
    Space,
    Table,
    Text,
    TextInput,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { baseRumahIbadahURL } from "../../utils/baseURL";
import { getAllRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";

export default function RumahIbadah() {
    const dispatch = useDispatch();

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

    const handlePageChange = (event) => {
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
        setQuery("");
    };

    const handleTextInput = (e) => {
        // console.log(e.target.value);
        setQuery(e.target.value);
    };

    const rowsList = rumahIbadahState?.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>{item.nama}</Table.Td>
            <Table.Td>{item.alamat}</Table.Td>
            <Table.Td>{item.wilayah}</Table.Td>
            <Table.Td>
                {item.kategoriid === 1
                    ? "Masjid"
                    : "Lembaga Pendidikan Keagamaan"}
            </Table.Td>
            <Table.Td>
                <DateFormatter date={item?.createdAt} />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Container size="lg">
                <Group mb={30} position="center">
                    <TextInput
                        placeholder="Cari Berdasarkan Nama"
                        value={query}
                        onChange={handleTextInput}
                        sx={!query ? { width: "54%" } : { width: "50%" }}
                    />
                    {load ? (
                        <Button
                            loading={
                                load ? (
                                    <Loader size="md" variant="dots" />
                                ) : null
                            }
                        />
                    ) : (
                        <Button onClick={searchData}>Cari </Button>
                    )}
                    <ActionIcon
                        onClick={resetData}
                        disabled={!query}
                        variant="subtle"
                        color="red"
                        sx={!query ? { display: "none" } : null}
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>
                <Table withColumnBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Alamat</Table.Th>
                            <Table.Th>Wilayah</Table.Th>
                            <Table.Th>Kategori</Table.Th>
                            <Table.Th>Dibuat</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rowsList}</Table.Tbody>
                </Table>

                {/* <Text>{msg}</Text> */}

                <Text size="sm">
                    Halaman {pages} dari {totalPage}
                    <Space h="xs" />
                    Total : {totalItems} Item
                </Text>
                <Pagination
                    onChange={handlePageChange}
                    total={totalPage}
                    // total={Math.min(2, totalPage)}
                    withControls
                    withEdges
                />
            </Container>
        </>
    );
}
