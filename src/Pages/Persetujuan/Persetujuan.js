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
} from "@mantine/core";
import {
    IconArrowRight,
    IconCheck,
    IconPencil,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/DateFormatter";
import axios from "axios";
import { basePersetujuanURL } from "../../utils/baseURL";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";

const Persetujuan = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    // const theme = useMantineTheme();

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { persetujuanList } = persetujuan;
    // console.log(persetujuanList);

    const [persetujuanListState, setPersetujuanListState] = useState([
        persetujuanList,
    ]);

    const [load, setLoad] = useState(false);

    const [pages, setPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    const getPersetujuanList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${basePersetujuanURL}/list?keagamaanid=${keyword}&page=${pages}&limit=${limit}`,
                config
            );
            const result = response?.data?.result;

            setPersetujuanListState(result);
            setTotalItems(response.data.totalItems);
            setTotalPage(response.data.totalPage);
            setPages(response.data.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPersetujuanList();
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
        searchParams.set("ID", query);
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

    const getStatusText = (statusid) => {
        const statusMap = {
            1: <Badge color="green">DISETUJUI</Badge>,
            2: <Badge color="red">DITOLAK</Badge>,
            3: <Badge color="blue">PROSES</Badge>,
        };

        return statusMap[statusid] || "Status tidak valid";
    };

    const getProsesText = (prosesid) => {
        const prosesMap = {
            1: "VERIFIKASI PERSYARATAN ADMINISTRASI",
            2: "VERIFIKASI FAKTUAL(SURVEI LAPANGAN)",
            3: "REKOMENDASI",
            4: "PERTIMBANGAN TAPD",
            5: "PENGANGGARAN",
            6: "PENERBITAN SK SDH DAN DOKUMEN LAINNNYA",
            7: "PENANDATANGANAN NPHD, PAKTA INTEGRITAS, PERNYATAAN TANGGUNG JAWAB, DLL",
            8: "PENCAIRAN DANA BANTUAN HIBAH",
            9: "LAPORAN PERTANGGUNGJAWABAN PENGGUNAAN DANA BANTUAN HIBAH",
            10: "PROSES",
        };

        return prosesMap[prosesid] || "Proses tidak valid";
    };

    const textCenter = {
        textAlign: "center",
    };

    const rowsList = persetujuanListState?.map((item, index) => (
        <Table.Tr key={item?.index}>
            <Table.Td style={textCenter}>{index + 1}</Table.Td>
            <Table.Td>
                <Group spacing={0} justify="center" position="left">
                    <ActionIcon
                        component={Link}
                        to={`/dashboard/admin/persetujuan/${item?.id}`}
                        color="blue"
                    >
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
            <Table.Td>{item?.keagamaanid}</Table.Td>
            <Table.Td>{item?.userid}</Table.Td>
            <Table.Td>{getStatusText(item?.statusid)}</Table.Td>
            <Table.Td>{getProsesText(item?.prosesid)}</Table.Td>
            <Table.Td>{item?.pengajuandana}</Table.Td>
            <Table.Td>{item?.tujuan}</Table.Td>
            <Table.Td>{item?.norek}</Table.Td>
            <Table.Td style={textCenter}>
                <DateFormatter date={item?.createdAt} />
            </Table.Td>

            <Table.Td style={textCenter}>
                {item?.skid && <IconCheck />}
            </Table.Td>
            <Table.Td>{item?.ktpid && <IconCheck />}</Table.Td>
            <Table.Td>{item?.suratpermohonanid && <IconCheck />}</Table.Td>
            <Table.Td>{item?.asetrekomid && <IconCheck />}</Table.Td>
        </Table.Tr>
    ));

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
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
                    <Group justify="center" p={5}>
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
                            radius="xl"
                            size="sm"
                            placeholder="Cari ID Rumah Ibadah"
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
                            horizontalSpacing="sm"
                            verticalSpacing="sm"
                            striped
                            highlightOnHover
                        >
                            <Table.Thead>
                                <Table.Tr key={pages}>
                                    <Table.Th rowSpan={2}>No.</Table.Th>
                                    <Table.Th rowSpan={2}>Aksi</Table.Th>
                                    <Table.Th key={pages} rowSpan={2}>
                                        ID Rumah Ibadah
                                    </Table.Th>
                                    <Table.Th rowSpan={2}>User ID</Table.Th>
                                    <Table.Th rowSpan={2}>Status</Table.Th>
                                    <Table.Th rowSpan={2}>Proses</Table.Th>
                                    <Table.Th rowSpan={2}>
                                        Pengajuan Dana
                                    </Table.Th>
                                    <Table.Th rowSpan={2}>Tujuan</Table.Th>
                                    <Table.Th rowSpan={2}>
                                        No. Rekening
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                        rowSpan={2}
                                    >
                                        Dibuat
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                        }}
                                        colSpan={8}
                                    >
                                        Persyaratan Administrasi
                                    </Table.Th>
                                </Table.Tr>
                                <Table.Tr key={pages}>
                                    <Table.Th>SK Pengurus</Table.Th>
                                    <Table.Th>KTP</Table.Th>
                                    <Table.Th>Surat Permohonan</Table.Th>
                                    <Table.Th>Aset Rekomendasi</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {persetujuanListState.length === 0 ? (
                                    <Text p="lg" ta="right" fw={700}>
                                        Data tidak ditemukan
                                    </Text>
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

export default Persetujuan;
