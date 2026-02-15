import {
    ActionIcon,
    Anchor,
    Badge,
    Breadcrumbs,
    Container,
    Text,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
    deleteUserAction,
    getAllUsersAction,
} from "../../redux/slices/user/userSlices";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { toast } from "react-toastify";

// Import actions

const AdminUser = () => {
    const dispatch = useDispatch();
    const { colorScheme } = useMantineTheme();

    // 1. Ambil data langsung dari Redux (Single Source of Truth)
    const { loading, usersList = [] } = useSelector((state) => state?.users);

    // 2. Fungsi Fetch Data (Memoized untuk mencegah re-render loop)
    const fetchData = useCallback(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

    // 3. Efek saat komponen dimuat (Mount)
    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [fetchData]);

    // 4. Efek untuk Progress Bar (NProgress)
    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();
        return () => nprogress.reset();
    }, [loading]);

    // 5. Fungsi Hapus User
    const handleOpenDeleteModal = (row) => {
        const { id, nama, nik } = row.original;

        modals.openConfirmModal({
            title: "Hapus Pengguna?",
            centered: true,
            children: (
                <Text size="sm">
                    Apakah anda yakin ingin menghapus pengguna dengan NIK:{" "}
                    <b>{nik}</b> & Nama: <b>{nama}</b>? Aksi ini tidak bisa
                    dibatalkan.
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                try {
                    await dispatch(deleteUserAction(id)).unwrap();
                    toast.success(`User ${nama} berhasil dihapus!`);
                    fetchData(); // Refresh data tanpa reload halaman
                } catch (error) {
                    toast.error(error?.message || "Gagal menghapus user");
                }
            },
        });
    };

    // 6. Definisi Kolom Tabel (Memoized untuk Performa)
    const columns = useMemo(
        () => [
            {
                header: "No",
                id: "id",
                Cell: ({ row }) => {
                    return <> {row.index + 1} </>;
                },
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 55,
            },
            {
                accessorKey: "nik",
                header: "NIK",
                enableClickToCopy: true,
                size: 200,
            },
            {
                accessorKey: "nama",
                header: "Nama",
                size: 200,
            },
            {
                accessorKey: "notelpon",
                header: "No. HP",
                Cell: ({ cell }) => cell.getValue() || "Tidak Ada Data",
            },
            {
                accessorKey: "Role.nama",
                header: "Role",
                Cell: ({ cell }) => (
                    <Badge
                        size="sm"
                        color={cell.getValue() === "ADMIN" ? "red" : "green"}
                    >
                        {cell.getValue()}
                    </Badge>
                ),
            },
            {
                accessorKey: "createdAt",
                header: "Dibuat",
                Cell: ({ cell }) =>
                    new Date(cell.getValue()).toLocaleDateString("id-ID"),
            },
        ],
        [],
    );

    // 7. Konfigurasi Mantine React Table
    const table = useMantineReactTable({
        columns,
        data: usersList, // Menggunakan data Redux langsung (SOLUSI BUG RELOAD)
        enableEditing: true,
        enableColumnResizing: true,
        enableColumnOrdering: true,
        positionToolbarAlertBanner: "bottom",
        initialState: {
            density: "xs",
            pagination: { pageSize: 10 },
        },
        state: {
            isLoading: loading,
            showProgressBars: loading,
        },
        enableGrouping: true,
        paginationDisplayMode: "pages",
        enableFullScreenToggle: false,
        renderRowActions: ({ row }) => (
            <Tooltip label="Hapus">
                <ActionIcon
                    color="red"
                    onClick={() => handleOpenDeleteModal(row)}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Tooltip>
        ),
        mantineTableProps: {
            withColumnBorders: true,
            sx: { fontSize: "12px" },
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari",
        },
    });

    // Breadcrumbs items
    const breadcrumbItems = [
        { title: "Beranda", href: "/dashboard" },
        { title: "List User", href: "/dashboard/admin/list" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm">
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl">
            <Breadcrumbs separator="→" mt="xs" mb="lg">
                {breadcrumbItems}
            </Breadcrumbs>
            <MantineReactTable table={table} />
        </Container>
    );
};

export default AdminUser;
