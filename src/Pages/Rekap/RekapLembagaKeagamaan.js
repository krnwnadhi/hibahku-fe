import { Button, Group, Menu, rem, useMantineTheme } from "@mantine/core";
import {
    IconCheck,
    IconChevronDown,
    IconFileExport,
    IconFileTypePdf,
    IconX,
} from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { useDispatch, useSelector } from "react-redux";

import autoTable from "jspdf-autotable";
import axios from "axios";
import { basePersetujuanURL } from "../../utils/baseURL";
import dayjs from "dayjs";
import { getAllPersetujuanAction } from "../../redux/slices/persetujuan/persetujuanSlices";
import jsPDF from "jspdf";
import { nprogress } from "@mantine/nprogress";

const RekapLembagaKeagamaan = () => {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();
    const theme = useMantineTheme();

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
                        item?.Keagamaan?.Kategori?.nama ===
                            "LEMBAGA KEAGAMAAN" &&
                        item?.Status?.nama === "DISETUJUI"
                    );
                })
                .map((item) => {
                    return item;
                });

            setPersetujuanListState(filteredLembagaKeagamaan);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
        getPersetujuanList();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [dispatch]);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

    const citiesList = [
        "Kab. Batanghari",
        "Kab. Bungo",
        "Kab. Kerinci",
        "Kab. Merangin",
        "Kab. Muaro Jambi",
        "Kab. Sarolangun",
        "Kab. Tanjung Jabung Barat",
        "Kab. Tanjung Jabung Timur",
        "Kab. Tebo",
        "Kota Jambi",
        "Kota Sungai Penuh",
    ];

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
                id: "no",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 55,
                Cell: ({ row }) => {
                    return <> {row.index + 1} </>;
                },
            },
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
                minSize: 200,
                maxSize: 250,
                size: 225,
            },
            {
                accessorKey: "User.nama",
                header: "Pimpinan/Pengurus",
                minSize: 200,
                maxSize: 250,
                size: 225,
            },
            {
                accessorKey: "User.notelpon",
                header: "No. Kontak",
                minSize: 175,
                maxSize: 225,
                size: 200,
            },
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
                minSize: 125,
                maxSize: 175,
                size: 150,
                Cell: ({ row }) =>
                    row?.original?.Rab?.namafile ? <IconCheck /> : <IconX />,
            },
            {
                accessorKey: "Sk.namafile",
                header: "SK Pengurus",
                minSize: 175,
                maxSize: 225,
                size: 200,
                Cell: ({ row }) =>
                    row?.original?.Sk?.namafile ? <IconCheck /> : <IconX />,
            },
            {
                accessorKey: "Ktp.namafile",
                header: "KTP Ketua Pengurus",
                minSize: 200,
                maxSize: 250,
                size: 225,
                Cell: ({ row }) =>
                    row?.original?.Ktp?.namafile ? <IconCheck /> : <IconX />,
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
                header: "Akta Operasional",
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
                minSize: 200,
                maxSize: 250,
                size: 225,
                Cell: ({ row }) =>
                    row?.original?.norek ? <IconCheck /> : <IconX />,
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
                minSize: 200,
                maxSize: 250,
                size: 225,
            },
            {
                accessorKey: "Keagamaan.wilayah",
                header: "Kabupaten/Kota",
                minSize: 200,
                maxSize: 250,
                size: 225,
                filterVariant: "select",
                mantineFilterSelectProps: {
                    data: citiesList,
                },
            },
        ],
        []
    );

    // Handle PDF
    const handleExportRowsPDF = (rows) => {
        const doc = new jsPDF({
            orientation: "landscape",
            compress: true,
            format: "a3",
        });

        const tableData = rows.map((row) => {
            const {
                Keagamaan,
                keagamaanid,
                User,
                Suratpermohonan,
                Proposal,
                Rab,
                Sk,
                Ktp,
                Izinoperasional,
                Aktapendirian,
                Pengesahankemenkumham,
                norek,
                pengajuandana,
                tujuan,
            } = row.original;
            return [
                row.index + 1,
                Keagamaan.nama,
                Keagamaan.alamat,
                keagamaanid,
                User.nama,
                User.notelpon,
                Suratpermohonan.namafile !== null ? "V" : "X",
                Proposal.namafile !== null ? "V" : "X",
                Rab.namafile !== null ? "V" : "X",
                Sk.namafile !== null ? "V" : "X",
                Ktp.namafile !== null ? "V" : "X",
                Izinoperasional.namafile !== null ? "V" : "X",
                Aktapendirian.namafile !== null ? "V" : "X",
                Pengesahankemenkumham.namafile !== null ? "V" : "X",
                norek !== null ? "V" : "X",
                formatCurrency(pengajuandana),
                tujuan,
            ];
        });

        autoTable(doc, {
            rowPageBreak: "auto",
            startY: 40,
            head: [
                [
                    { content: "No", rowSpan: 2 },
                    {
                        content: "Nama Lembaga",
                        rowSpan: 2,
                    },
                    {
                        content: "Alamat",
                        rowSpan: 2,
                    },
                    {
                        content: "No. NSPP/NSM",
                        rowSpan: 2,
                    },
                    {
                        content: "Pimpinan/ Pengurus",
                        rowSpan: 2,
                    },
                    {
                        content: "No. Kontak",
                        rowSpan: 2,
                    },
                    { content: "Persyaratan Administrasi", colSpan: 9 },
                    { content: "Usulan Dana", rowSpan: 2 },
                    { content: "Peruntukkan Dana", rowSpan: 2 },
                ],
                [
                    { content: "Surat Permohonan" },
                    { content: "Proposal" },
                    { content: "RAB" },
                    { content: "SK Pengurus" },
                    { content: "KTP Pengurus" },
                    { content: "Izin Operasional" },
                    { content: "Akta Pendirian" },
                    { content: "Pengesahan Kemenkumham" },
                    { content: "Rekening Bank Jambi" },
                    { content: "" },
                    { content: "" },
                ],
            ],
            body: tableData,
            styles: {
                fontSize: 10,
            },
            margin: { bottom: 60 },
            headStyles: {
                fillColor: "white",
                textColor: "black",
                lineWidth: 0.1,
                lineColor: "black",
                halign: "center",
            },
            bodyStyles: {
                fillColor: "white",
                textColor: "black",
                lineWidth: 0.1,
                lineColor: "black",
                valign: "top",
            },
            columnStyles: {
                0: {
                    halign: "center",
                },
                6: {
                    halign: "center",
                    cellWidth: "auto",
                },
                7: {
                    halign: "center",
                    cellWidth: "auto",
                },
                8: {
                    halign: "center",
                    cellWidth: 15,
                },
                9: {
                    halign: "center",
                    cellWidth: "auto",
                },
                10: {
                    halign: "center",
                    cellWidth: "auto",
                },
                11: {
                    halign: "center",
                    cellWidth: "auto",
                },
                12: {
                    halign: "center",
                    cellWidth: "auto",
                },
                13: {
                    halign: "center",
                    cellWidth: "auto",
                },
                14: {
                    halign: "center",
                    cellWidth: "auto",
                },
                15: {
                    cellWidth: "wrap",
                },
            },
            theme: "grid",
            allSectionHooks: true,
            willDrawPage: () => {
                doc.setFontSize(12);
                doc.setFont("times", "bold");
                doc.text(
                    "DAFTAR REKAPITULASI PERMOHONAN BANTUAN HIBAH LEMBAGA KEAGAMAAN",
                    220,
                    22,
                    "center"
                );
                doc.setFontSize(12);
                doc.text("PEMERINTAH PROVINSI JAMBI", 220, 27, "center");
                doc.setFontSize(12);
                doc.text(
                    `TAHUN ${new Date().getFullYear()}`,
                    220,
                    32,
                    "center"
                );
            },
        });
        var finalY = doc.lastAutoTable.finalY;

        autoTable(doc, {
            startY: finalY + 30,
            didDrawPage: () => {
                doc.setFontSize(10);
                doc.setFont("times", "");
                doc.text(
                    `Jambi,        ${dayjs()
                        .locale("id")
                        .format("MMMM")} ${dayjs().format("YYYY")}`,
                    355,
                    250
                );
                doc.setFontSize(10);
                doc.text("KEPALA BIRO KESRA", 355, 254);
                doc.setFontSize(10);
                doc.text("H. SULAIMAN, S.Ag", 355, 275);
                doc.setFontSize(10);
                doc.text("Pembina Tk. I", 355, 279);
                doc.setFontSize(10);
                doc.text("NIP. 19721001 200012 1 002", 355, 284);
            },
        });

        doc.save(
            `Rekap-Lembaga-Keagamaan-${dayjs()
                .locale("id")
                .format("DD-MMM-YYYY HH:mm")}`
        );
    };

    // handle excel
    const csvConfig = mkConfig({
        filename: `Rekap-Lembaga-Keagamaan-${dayjs()
            .locale("id")
            .format("DD-MMM-YYYY HH:mm:ss")}`,
        fieldSeparator: ";",
        decimalSeparator: ",",
        useBom: true,
        showColumnHeaders: true,
        columnHeaders: [
            "No.",
            "Nama Lembaga Keagamaan",
            "Alamat",
            "No. NSPP/NSM",
            "Pimpinan/Pengurus",
            "No. Kontak",
            "Surat Permohonan",
            "Proposal",
            "RAB",
            "SK Pengurus",
            "KTP Pengurus",
            "IZIN OPERASIONAL",
            "AKTA PENDIRIAN",
            "PENGESAHAN KEMENKUMHAM",
            "REKENING BANK JAMBI",
            "USULAN DANA",
            "PERUNTUKKAN DANA",
        ],
    });

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => ({
            "No.": row.index + 1,
            "Nama Lembaga Keagamaan": row.original.Keagamaan.nama,
            Alamat: row.original.Keagamaan.alamat,
            "No. NSPP/NSM": row.original.keagamaanid,
            "Pimpinan/Pengurus": row.original.User.nama,
            "No. Kontak": row.original.User.notelpon,
            "Surat Permohonan":
                row.original.Suratpermohonan.namafile !== null ? "V" : "X",
            Proposal: row.original.Proposal.namafile !== null ? "V" : "X",
            RAB: row.original.Rab.namafile !== null ? "V" : "X",
            "SK Pengurus": row.original.Sk.namafile !== null ? "V" : "X",
            "KTP Pengurus": row.original.Ktp.namafile !== null ? "V" : "X",
            "IZIN OPERASIONAL":
                row.original.Izinoperasional.namafile !== null ? "V" : "X",
            "AKTA PENDIRIAN":
                row.original.Aktapendirian.namafile !== null ? "V" : "X",
            "PENGESAHAN KEMENKUMHAM":
                row.original.Pengesahankemenkumham.namafile !== null
                    ? "V"
                    : "X",
            "REKENING BANK JAMBI": row.original.norek !== null ? "V" : "X",
            "USULAN DANA": row.original.pengajuandana,
            "PERUNTUKKAN DANA": row.original.tujuan,
        }));

        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

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
        enableRowSelection: true,
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
        renderTopToolbarCustomActions: ({ table }) => (
            <>
                <Group>
                    {/* PDF START */}
                    <Menu
                        transitionProps={{ transition: "pop-top-right" }}
                        position="top-end"
                        width={220}
                        withinPortal
                        trigger="click-hover"
                        withArrow
                        arrowPosition="center"
                        openDelay={100}
                        closeDelay={400}
                    >
                        <Menu.Target>
                            <Button
                                rightSection={
                                    <IconChevronDown
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                                leftSection={
                                    <IconFileTypePdf
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                                size="xs"
                                color={theme.colors.red[7]}
                            >
                                Pdf
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.blue[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={
                                    table.getPrePaginationRowModel().rows
                                        .length === 0
                                }
                                //export all rows, including from the next page, (still respects filtering and sorting)
                                onClick={() =>
                                    handleExportRowsPDF(
                                        table.getPrePaginationRowModel().rows
                                    )
                                }
                            >
                                Export All Rows
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.pink[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={table.getRowModel().rows.length === 0}
                                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                                onClick={() =>
                                    handleExportRowsPDF(
                                        table.getRowModel().rows
                                    )
                                }
                            >
                                Export Page Rows
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.green[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={
                                    !table.getIsSomeRowsSelected() &&
                                    !table.getIsAllRowsSelected()
                                }
                                //only export selected rows
                                onClick={() =>
                                    handleExportRowsPDF(
                                        table.getSelectedRowModel().rows
                                    )
                                }
                            >
                                Export Selected Rows
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    {/* PDF END */}

                    {/* EXCEL START */}
                    <Menu
                        transitionProps={{ transition: "pop-top-right" }}
                        position="top-end"
                        width={220}
                        withinPortal
                        trigger="click-hover"
                        withArrow
                        arrowPosition="center"
                        openDelay={100}
                        closeDelay={400}
                    >
                        <Menu.Target>
                            <Button
                                rightSection={
                                    <IconChevronDown
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                                leftSection={
                                    <IconFileTypePdf
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                                size="xs"
                                color={theme.colors.green[7]}
                            >
                                Excel
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.blue[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={
                                    table.getPrePaginationRowModel().rows
                                        .length === 0
                                }
                                //export all rows, including from the next page, (still respects filtering and sorting)
                                onClick={() =>
                                    handleExportRows(
                                        table.getPrePaginationRowModel().rows
                                    )
                                }
                            >
                                Export All Rows
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.pink[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={table.getRowModel().rows.length === 0}
                                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                                onClick={() =>
                                    handleExportRows(table.getRowModel().rows)
                                }
                            >
                                Export Page Rows
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconFileExport
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        color={theme.colors.green[6]}
                                        stroke={1.5}
                                    />
                                }
                                disabled={
                                    !table.getIsSomeRowsSelected() &&
                                    !table.getIsAllRowsSelected()
                                }
                                //only export selected rows
                                onClick={() =>
                                    handleExportRows(
                                        table.getSelectedRowModel().rows
                                    )
                                }
                            >
                                Export Selected Rows
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    {/* EXCEL END */}
                </Group>
            </>
        ),
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
