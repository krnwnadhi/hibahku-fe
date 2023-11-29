import { Container, Pagination, Space, Table, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
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
    const [limit, setLimit] = useState(1);
    const [keyword, setKeyword] = useState("");
    // const [query, setQuery] = useState("");

    const getRumahIbadahList = async () => {
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
    };

    useEffect(() => {
        getRumahIbadahList();
        window.scrollTo(0, 0);
    }, [pages, keyword]);

    const handlePageChange = (event) => {
        setPages(event);
        // console.log(event);
    };

    // const searchData = (e) => {
    //     e.preventDefault();
    //     setLoad(true);
    //     setTimeout(() => {
    //         setPage(0);
    //         setKeyword(query);
    //         setLoad(false);
    //     }, 1000);
    // };

    // const resetData = (e) => {
    //     e.preventDefault();
    //     setQuery("");
    // };

    // const handleTextInput = (e) => {
    //     setQuery(e.target.value);
    // };

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
            <Container>
                <Table withColumnBorders>
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

                <Text size="sm">
                    Halaman {pages} dari {totalPage}
                    <Space h="xs" />
                    Total : {totalItems} Item
                </Text>
                <Pagination
                    onChange={handlePageChange}
                    total={totalPage}
                    withControls
                    withEdges
                />
            </Container>
        </>
    );
}
