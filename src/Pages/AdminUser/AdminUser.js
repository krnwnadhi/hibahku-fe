import {
    ActionIcon,
    Anchor,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Group,
    Menu,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconChevronDown,
    IconEdit,
    IconFileExport,
    IconFileTypeCsv,
    IconFileTypePdf,
} from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { useDispatch, useSelector } from "react-redux";

import autoTable from "jspdf-autotable";
import axios from "axios";
import { baseUserURL } from "../../utils/baseURL";
import dayjs from "dayjs";
import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import jsPDF from "jspdf";

const AdminUser = () => {
    const dispatch = useDispatch();
    const theme = useMantineTheme();

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
                minSize: 175,
                maxSize: 300,
                size: 250,
            },
            {
                accessorKey: "nama",
                header: "Nama",
                minSize: 150,
                maxSize: 275,
                size: 225,
            },
            {
                accessorKey: "notelpon",
                accessorFn: (dataRow) => dataRow?.notelpon,
                id: "notelpon",
                header: "No. HP",
                minSize: 150,
                maxSize: 275,
                size: 225,
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

    // Handle Excel

    const handleExportRowsExcel = (rows) => {
        const rowData = rows.map((row) => {
            return {
                NIK: row.original.nik,
                Nama: row.original.nama,
                NoHp: row.original.notelpon,
                Role: row.original.Role.nama,
                Dibuat: dayjs(row.original.createdAt)
                    .locale("id")
                    .format("DD-MMM-YYYY"),
            };
        });
        const csvConfig = mkConfig({
            fieldSeparator: ";",
            decimalSeparator: ".",
            useKeysAsHeaders: true,
            filename: `User-${dayjs()
                .locale("id")
                .format("DD-MMM-YYYY HH_mm_ss")}`,
        });

        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    // Handle PDF
    const handleExportRowsPDF = (rows) => {
        const doc = new jsPDF({
            orientation: "landscape",
            compress: true,
        });

        const tableData = rows.map((row) => {
            const { id, nama, notelpon, Role, createdAt } = row.original;
            return [
                id,
                nama,
                notelpon,
                Role.nama,
                dayjs(createdAt).locale("id").format("DD-MMM-YYYY"),
            ];
        });

        const tableHeaders = columns.map((c) => c.header);

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
            startY: 40,
            headStyles: {
                fillColor: "white",
                textColor: "black",
                lineWidth: 0.1,
                lineColor: "black",
            },
            bodyStyles: {
                fillColor: "white",
                textColor: "black",
                lineWidth: 0.1,
                lineColor: "black",
                valign: "top",
            },
            theme: "grid",
            allSectionHooks: true,
            willDrawPage: () => {
                doc.setFontSize(12);
                doc.setFont("times", "bold");
                doc.text(
                    "DAFTAR REKAPITULASI PERMOHONAN BANTUAN HIBAH RUMAH IBADAH",
                    150,
                    22,
                    "center"
                );
                doc.setFontSize(12);
                doc.text("PEMERINTAH PROVINSI JAMBI", 150, 27, "center");
                doc.setFontSize(12);
                doc.text(
                    `TAHUN ${new Date().getFullYear()}`,
                    150,
                    32,
                    "center"
                );
            },
        });

        autoTable(doc, {
            willDrawPage: () => {
                doc.setFontSize(10);
                doc.setFont("times", "");
                doc.text(
                    `Jambi,        ${dayjs()
                        .locale("id")
                        .format("MMMM")} ${dayjs().format("YYYY")}`,
                    230,
                    175
                );
                doc.setFontSize(10);
                doc.text("KEPALA BIRO KESRA", 230, 179);
                doc.setFontSize(10);
                doc.text("H. SULAIMAN, S.Ag.", 230, 195);
                doc.setFontSize(10);
                doc.text("Pembina Tk. I", 230, 199);
                doc.setFontSize(10);
                doc.text("NIP. 19721001 200012 1 002", 230, 203);
            },
        });

        doc.save(`User-${dayjs().locale("id").format("DD-MMM-YYYY HH_mm_ss")}`);
    };

    const data = usersListState;

    const table = useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableColumnResizing: true,
        positionToolbarAlertBanner: "bottom",
        enableColumnOrdering: true,
        enableRowNumbers: true,
        rowNumberMode: "original",
        initialState: {
            density: "xs",
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "20"],
        },
        enableGrouping: true,
        mantineTableHeadCellProps: {
            style: {
                backgroundColor: "var(--mantine-color-blueGray-light)",
                border: "1px solid lightgray",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                border: "1px solid lightgray",
            },
        },
        paginationDisplayMode: "pages",
        enableFullScreenToggle: false,
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
        renderTopToolbarCustomActions: ({ table }) => (
            <Group p="md" justify="space-between">
                {/* EXCEL START */}
                <Text>{}</Text>
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
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            leftSection={
                                <IconFileTypeCsv
                                    style={{ width: rem(18), height: rem(18) }}
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
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                    stroke={1.5}
                                />
                            }
                            disabled={
                                table.getPrePaginationRowModel().rows.length ===
                                0
                            }
                            //export all rows, including from the next page, (still respects filtering and sorting)
                            onClick={() =>
                                handleExportRowsExcel(
                                    table.getPrePaginationRowModel().rows
                                )
                            }
                        >
                            Export All Rows
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconFileExport
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.pink[6]}
                                    stroke={1.5}
                                />
                            }
                            disabled={table.getRowModel().rows.length === 0}
                            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                            onClick={() =>
                                handleExportRowsExcel(table.getRowModel().rows)
                            }
                        >
                            Export Page Rows
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconFileExport
                                    style={{ width: rem(16), height: rem(16) }}
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
                                handleExportRowsExcel(
                                    table.getSelectedRowModel().rows
                                )
                            }
                        >
                            Export Selected Rows
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                {/* EXCEL START */}

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
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            leftSection={
                                <IconFileTypePdf
                                    style={{ width: rem(18), height: rem(18) }}
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
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                    stroke={1.5}
                                />
                            }
                            disabled={
                                table.getPrePaginationRowModel().rows.length ===
                                0
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
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.pink[6]}
                                    stroke={1.5}
                                />
                            }
                            disabled={table.getRowModel().rows.length === 0}
                            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                            onClick={() =>
                                handleExportRowsPDF(table.getRowModel().rows)
                            }
                        >
                            Export Page Rows
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconFileExport
                                    style={{ width: rem(16), height: rem(16) }}
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
            </Group>
        ),
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
