import { Container, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { basePersetujuanURL } from "../../utils/baseURL";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";

const RekapLembagaKeagamaan = () => {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();

    const user = useSelector((state) => state?.auth?.userAuth);
    const { token } = user;

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, persetujuanList = [] } = persetujuan;

    const [persetujuanListState, setPersetujuanListState] = useState([
        persetujuanList,
    ]);

    const getPersetujuanList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const response = await axios.get(
                `${basePersetujuanURL}/list`,
                config
            );
            const result = response?.data?.result;
            const filteredLembagaKeagamaan = result
                ?.filter((item) => {
                    return (
                        item?.Keagamaan?.Kategori?.nama === "LEMBAGA KEAGAMAAN"
                    );
                })
                .map((item) => {
                    return item;
                });

            setPersetujuanListState(filteredLembagaKeagamaan);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
        getPersetujuanList();
        window.scrollTo(0, 0);
    }, [dispatch]);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

    const columns = useMemo(
        () => [
            {
                accessorKey: "Keagamaan.nama",
                header: "Nama Lembaga Keagamaan",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                accessorKey: "Keagamaan.alamat",
                header: "Alamat",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                accessorKey: "keagamaanid",
                header: "Nomor NSPP/NSM",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                accessorKey: "User.nama",
                header: "Pimpinan/Pengurus",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                accessorKey: "User.notelpon",
                header: "No. Kontak",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
            {
                id: "administrasi",
                header: "Persyaratan Administrasi",
                columns: [
                    {
                        accessorKey: "Suratpermohonan.namafile",
                        header: "Surat Permohonan",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Suratpermohonan?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Proposal.namafile",
                        header: "Proposal",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Proposal?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Rab.namafile",
                        header: "RAB",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Rab?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Sk.namafile",
                        header: "SK Pengurus",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Sk?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Ktp.namafile",
                        header: "KTP Ketua Pengurus",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Ktp?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Izinoperasional.namafile",
                        header: "Izin Operasional",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Izinoperasional?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Aktapendirian.namafile",
                        header: "Akta Pendirian",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Aktapendirian?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "Pengesahankemenkumham.namafile",
                        header: "Pengesahan Kemenkumham",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.Aktapendirian?.namafile ? (
                                <IconCheck />
                            ) : (
                                <IconX />
                            ),
                    },
                    {
                        accessorKey: "norek",
                        header: "Rekening Bank Jambi",
                        minSize: 175,
                        maxSize: 225,
                        size: 200,
                        Cell: ({ row }) =>
                            row?.original?.norek ? <IconCheck /> : <IconX />,
                    },
                ],
            },
            {
                accessorKey: "pengajuandana",
                header: "Usulan Dana",
                minSize: 175,
                maxSize: 225,
                size: 200,
                Cell: ({ row }) => formatCurrency(row?.original?.pengajuandana),
            },
            {
                accessorKey: "tujuan",
                header: "Peruntukkan Dana",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
        ],
        []
    );

    const data = persetujuanListState;

    const table = useMantineReactTable({
        columns,
        data,
        mantineTableProps: {
            withColumnBorders: true,
            highlightOnHover: false,
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
        layoutMode: "grid",
        enableColumnResizing: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
        enableRowNumbers: true,
        rowNumberMode: "original",
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
        mantineSearchTextInputProps: {
            placeholder: "Cari",
        },
    });

    return (
        <>
            <MantineReactTable
                table={table}
                enableStickyHeader
                mantineTableContainerProps={{
                    style: { minHeight: 500 },
                }}
            />
        </>
    );
};

export default RekapLembagaKeagamaan;
