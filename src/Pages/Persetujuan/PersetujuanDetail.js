// import {
//     Anchor,
//     Avatar,
//     Breadcrumbs,
//     Button,
//     Combobox,
//     Container,
//     Grid,
//     Group,
//     Input,
//     InputBase,
//     LoadingOverlay,
//     Paper,
//     SimpleGrid,
//     Space,
//     Stack,
//     Text,
//     TextInput,
//     Tooltip,
//     VisuallyHidden,
//     em,
//     rem,
//     useCombobox,
// } from "@mantine/core";
// import {
//     IconBuildingBank,
//     IconDownload,
//     IconFileDownload,
// } from "@tabler/icons-react";
// import { Navigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import {
//     changeStatusPersetujuanAction,
//     deleteFileAction,
//     getDetailAdminPersetujuanAction,
// } from "../../redux/slices/persetujuan/persetujuanSlices";
// import { isNotEmpty, useForm } from "@mantine/form";
// import { useDispatch, useSelector } from "react-redux";

// import { IconTrash } from "@tabler/icons-react";
// import { basePersetujuanURL } from "../../utils/baseURL";
// import { modals } from "@mantine/modals";
// import { nprogress } from "@mantine/nprogress";
// import { toast } from "react-toastify";
// import { useMediaQuery } from "@mantine/hooks";

// const PersetujuanDetail = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const isMobile = useMediaQuery(`(max-width: ${em(850)})`);
//     const [loadingFetch, setLoadingFetch] = useState(false);

//     const persetujuan = useSelector((state) => state?.persetujuan);
//     const { loading, detailAdminPersetujuan, isDeleted, changeStatus } =
//         persetujuan;

//     const namaKategori = detailAdminPersetujuan?.map(
//         (x) => x?.Keagamaan?.Kategori?.nama,
//     );

//     const form = useForm({
//         validateInputOnChange: true,
//         initialValues: {
//             id: params.id,
//             newProses: "",
//         },

//         validate: {
//             id: isNotEmpty("Harap diisi"),
//             newProses: isNotEmpty("Harap diisi"),
//         },
//     });

//     const formOnSubmit = form.onSubmit((values) => {
//         dispatch(changeStatusPersetujuanAction(values));
//     });

//     useEffect(() => {
//         loading ? nprogress.start() : nprogress.complete();

//         return () => {
//             nprogress.reset();
//         };
//     }, [loading]);

//     const cardStyles = {
//         backgroundColor: "light-dark(#FCFCFC, #1E1E1E)",
//     };

//     const statusInput = [
//         {
//             value: 1,
//             description: "DISETUJUI",
//         },
//         {
//             value: 2,
//             description: "DITOLAK",
//         },
//         {
//             value: 3,
//             description: "PROSES",
//         },
//     ];

//     const keteranganInput = [
//         {
//             value: 1,
//             description: "VERIFIKASI PERSYARATAN ADMINISTRASI",
//             keterangan: null,
//         },
//         {
//             value: 2,
//             description: "VERIFIKASI FAKTUAL(SURVEI LAPANGAN)",
//             keterangan: null,
//         },
//         {
//             value: 3,
//             description: "REKOMENDASI",
//             keterangan: null,
//         },
//         {
//             value: 4,
//             description: " PERTIMBANGAN TAPD",
//             keterangan: null,
//         },
//         {
//             value: 5,
//             description: "PENGANGGARAN",
//             keterangan: null,
//         },
//         {
//             value: 6,
//             description: " PENERBITAN SK SDH DAN DOKUMEN LAINNNYA",
//             keterangan: null,
//         },
//         {
//             value: 7,
//             description:
//                 " PENANDATANGANAN NPHD, PAKTA INTEGRITAS, PERNYATAAN TANGGUNG JAWAB, DLL",
//             keterangan: null,
//         },

//         {
//             value: 8,
//             description: "PENCAIRAN DANA BANTUAN HIBAH",
//             keterangan: null,
//         },
//         {
//             value: 9,
//             description:
//                 "LAPORAN PERTANGGUNGJAWABAN PENGGUNAAN DANA BANTUAN HIBAH",
//             keterangan: null,
//         },

//         {
//             value: 10,
//             description: "❎ BELUM DIPROSES",
//             keterangan: null,
//         },
//         {
//             value: 11,
//             description: "❌ DITOLAK",
//             keterangan: "FILE SALAH/TIDAK LENGKAP",
//         },
//     ];

//     function SelectOption({ value, description, keterangan }) {
//         return (
//             <Group>
//                 <div>
//                     {keterangan === null ? (
//                         <Text fz="sm" fw={500}>
//                             {value}. {description}
//                         </Text>
//                     ) : (
//                         <Text fz="sm" fw={500}>
//                             {value}. {description} - {keterangan}
//                         </Text>
//                     )}
//                 </div>
//             </Group>
//         );
//     }

//     // Status Start
//     const comboboxStatus = useCombobox({
//         onDropdownClose: () => comboboxStatus.resetSelectedOption(),
//     });

//     const [statusValue, setStatusValue] = useState();
//     const selectedOptionStatus = statusInput.find(
//         (item) => item?.value === statusValue,
//     );

//     const optionsStatus = statusInput.map((item) => (
//         <Combobox.Option
//             value={item?.value}
//             key={item?.value}
//             active={item === statusValue}
//         >
//             <SelectOption {...item} />
//         </Combobox.Option>
//     ));
//     // Status End

//     // Proses Start
//     const comboboxProses = useCombobox({
//         onDropdownClose: () => comboboxProses.resetSelectedOption(),
//     });

//     const [prosesValue, setProsesValue] = useState();
//     const SelectOptionProses = keteranganInput.find(
//         (item) => item?.value === prosesValue,
//     );

//     const optionsProses = keteranganInput.map((item) => (
//         <Combobox.Option
//             value={item?.value}
//             key={item?.value}
//             active={item === prosesValue}
//         >
//             <SelectOption {...item} />
//         </Combobox.Option>
//     ));
//     // Proses End

//     useEffect(() => {
//         dispatch(getDetailAdminPersetujuanAction(params?.id));
//     }, [dispatch, params]);

//     if (isDeleted || changeStatus)
//         return <Navigate to="/dashboard/admin/persetujuan" replace={true} />;

//     const openDeleteModal = () =>
//         modals.openConfirmModal({
//             title: "Hapus Persetujuan?",
//             centered: true,
//             children: (
//                 <Text size="sm">
//                     {`Apakah Anda yakin ingin menghapus persetujuan ${detailAdminPersetujuan?.map(
//                         (x) => x?.Keagamaan?.nama,
//                     )} oleh ${detailAdminPersetujuan?.map(
//                         (x) => x?.User?.nama,
//                     )}?`}
//                 </Text>
//             ),
//             labels: { confirm: "Hapus", cancel: "Batal" },
//             confirmProps: { color: "red" },
//             onCancel: () => {
//                 toast.error("Aksi dibatalkan");
//             },
//             onConfirm: () => {
//                 toast("Loading...", {
//                     id: "load-data",
//                     isLoading: true,
//                     autoClose: false, // Don't auto-close for loading
//                 });
//                 setLoadingFetch(loading);
//                 setTimeout(() => {
//                     dispatch(deleteFileAction(params?.id));
//                     setLoadingFetch(loading);
//                     toast.dismiss(); // Dismiss the loading toast
//                     toast.success("Data berhasil dihapus");
//                 }, 2000);
//             },
//         });

//     const PRIMARY_COL_HEIGHT = rem(300);

//     const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

//     const list = detailAdminPersetujuan?.map((item, index) => (
//         <>
//             <form onSubmit={formOnSubmit}>
//                 {namaKategori.toString() === "RUMAH IBADAH" ? (
//                     // MASJID START
//                     <SimpleGrid
//                         cols={{ base: 1, sm: 2 }}
//                         spacing="lg"
//                         pos="relative"
//                     >
//                         <LoadingOverlay
//                             visible={loading}
//                             zIndex={1000}
//                             overlayProps={{ radius: "sm", blur: 1 }}
//                         />
//                         <Paper
//                             height={PRIMARY_COL_HEIGHT}
//                             withBorder
//                             radius="md"
//                             shadow="md"
//                             p="lg"
//                             style={cardStyles}
//                         >
//                             <Container>
//                                 <Stack gap="lg">
//                                     <Paper
//                                         withBorder
//                                         radius="md"
//                                         shadow="md"
//                                         p="sm"
//                                     >
//                                         <Tooltip
//                                             label={item?.User?.nama}
//                                             withArrow
//                                             transitionProps={{
//                                                 transition: "pop",
//                                                 duration: 500,
//                                             }}
//                                         >
//                                             <Avatar
//                                                 src={`https://ui-avatars.com/api/?name=${item?.User?.nama}&background=random`}
//                                                 size={40}
//                                                 radius={120}
//                                                 mx="auto"
//                                             />
//                                         </Tooltip>
//                                         <Text
//                                             ta="center"
//                                             fz="lg"
//                                             fw={500}
//                                             mt="md"
//                                         >
//                                             {item?.User?.nama}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.User?.nik} •{" "}
//                                             {item?.User?.notelpon}
//                                         </Text>
//                                     </Paper>
//                                     <Paper
//                                         withBorder
//                                         radius="md"
//                                         shadow="md"
//                                         p="lg"
//                                     >
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.nama} -{" "}
//                                             {item?.Keagamaan?.Kategori?.nama}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.wilayah}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.alamat}
//                                         </Text>
//                                     </Paper>
//                                 </Stack>
//                             </Container>
//                         </Paper>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Surat Permohonan
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpermohonan?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratpermohonan?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Proposal
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Proposal?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Proposal?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rencana Anggaran Biaya
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Rab?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Rab?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 SK Pengurus
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Sk?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Sk?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 KTP Pengurus
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Ktp?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Ktp?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>

//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 ID SIMAS
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Asetrekom?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Asetrekom?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rekening Bank Jambi
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Norekening?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Norekening?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconBuildingBank size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Rekening Bank 9
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             truncate="end"
//                                         >
//                                             {item?.norek}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>

//                         {/*  */}
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Surat Domisili
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratdomisili?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratdomisili?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>

//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rekomendasi Kemenag
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratrekomkemenag?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratrekomkemenag?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Pernyataan Tidak Hibah
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpernyataantidakhibah?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {
//                                                 item?.Suratpernyataantidakhibah
//                                                     ?.namafile
//                                             }
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconBuildingBank size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Pernyataan Keabsahan
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpernyataankeabsahan?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {
//                                                 item?.Suratpernyataankeabsahan
//                                                     ?.namafile
//                                             }
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                     </SimpleGrid>
//                 ) : (
//                     // LEMBAGA KEAGAMAAN START
//                     <SimpleGrid
//                         cols={{ base: 1, sm: 2 }}
//                         spacing="lg"
//                         pos="relative"
//                     >
//                         <LoadingOverlay
//                             visible={loading}
//                             zIndex={1000}
//                             overlayProps={{ radius: "sm", blur: 1 }}
//                         />
//                         <Paper
//                             height={PRIMARY_COL_HEIGHT}
//                             withBorder
//                             radius="md"
//                             shadow="md"
//                             p="lg"
//                             style={cardStyles}
//                         >
//                             <Container>
//                                 <Stack gap="lg">
//                                     <Paper
//                                         withBorder
//                                         radius="md"
//                                         shadow="md"
//                                         p="sm"
//                                     >
//                                         <Tooltip
//                                             label={item?.User?.nama}
//                                             withArrow
//                                             transitionProps={{
//                                                 transition: "pop",
//                                                 duration: 500,
//                                             }}
//                                         >
//                                             <Avatar
//                                                 src={`https://ui-avatars.com/api/?name=${item?.User?.nama}&background=random`}
//                                                 size={40}
//                                                 radius={120}
//                                                 mx="auto"
//                                             />
//                                         </Tooltip>
//                                         <Text
//                                             ta="center"
//                                             fz="lg"
//                                             fw={500}
//                                             mt="md"
//                                         >
//                                             {item?.User?.nama}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.User?.nik} •{" "}
//                                             {item?.User?.notelpon}
//                                         </Text>
//                                     </Paper>
//                                     <Paper
//                                         withBorder
//                                         radius="md"
//                                         shadow="md"
//                                         p="lg"
//                                     >
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.nama} -{" "}
//                                             {item?.Keagamaan?.Kategori?.nama}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.wilayah}
//                                         </Text>
//                                         <Text ta="center" c="dimmed" fz="xs">
//                                             {item?.Keagamaan?.alamat}
//                                         </Text>
//                                     </Paper>
//                                 </Stack>
//                             </Container>
//                         </Paper>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Surat Permohonan
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpermohonan?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratpermohonan?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Proposal
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Proposal?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Proposal?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rencana Anggaran Biaya
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Rab?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Rab?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 SK Pengurus
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Sk?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Sk?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 KTP Pengurus
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Ktp?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Ktp?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>

//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 NSPP/NSM
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suket?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suket?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rekening Bank Jambi
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Norekening?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Norekening?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconBuildingBank size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Rekening Bank 9
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             truncate="end"
//                                         >
//                                             {item?.norek}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>

//                         {/* Baris 4 */}
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Surat Domisili
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratdomisili?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratdomisili?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>

//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Rekomendasi Kemenag
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratrekomkemenag?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Suratrekomkemenag?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Pernyataan Tidak Hibah
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpernyataantidakhibah?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {
//                                                 item?.Suratpernyataantidakhibah
//                                                     ?.namafile
//                                             }
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconBuildingBank size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Pernyataan Keabsahan
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Suratpernyataankeabsahan?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {
//                                                 item?.Suratpernyataankeabsahan
//                                                     ?.namafile
//                                             }
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>

//                         {/* Baris 5 */}
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 NPWP
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Npwp?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Npwp?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>

//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Izin Operasional
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Izinoperasional?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Izinoperasional?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                         <Grid gutter="md">
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconDownload size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                             >
//                                                 Pengesahan Kemenhum
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Pengesahankemenkumham?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {
//                                                 item?.Pengesahankemenkumham
//                                                     ?.namafile
//                                             }
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                             <Grid.Col span={6}>
//                                 <Paper
//                                     height={SECONDARY_COL_HEIGHT}
//                                     withBorder
//                                     radius="md"
//                                     shadow="md"
//                                     p="xl"
//                                     style={cardStyles}
//                                 >
//                                     <Stack gap="xl">
//                                         <Group justify="center" gap="sm">
//                                             <IconBuildingBank size={16} />
//                                             <Text
//                                                 ta="center"
//                                                 fz={isMobile ? "xs" : "sm"}
//                                                 truncate="end"
//                                             >
//                                                 Akta Notaris Pendirian
//                                             </Text>
//                                         </Group>
//                                         <Text
//                                             ta="center"
//                                             fz="xs"
//                                             component={Anchor}
//                                             href={`${basePersetujuanURL}/preview/${item?.Aktapendirian?.namafile}`}
//                                             truncate="end"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {item?.Aktapendirian?.namafile}
//                                         </Text>
//                                     </Stack>
//                                 </Paper>
//                             </Grid.Col>
//                         </Grid>
//                     </SimpleGrid>

//                     // LEMBAGA KEAGAMAAN END
//                 )}
//                 <Space h="lg" />
//                 <Stack gap="lg">
//                     <VisuallyHidden>
//                         <TextInput disabled {...form.getInputProps("id")} />
//                     </VisuallyHidden>

//                     <Paper
//                         radius="md"
//                         shadow="md"
//                         withBorder
//                         p="lg"
//                         style={cardStyles}
//                     >
//                         {/* Status Start */}
//                         <Combobox
//                             store={comboboxStatus}
//                             withinPortal={false}
//                             onOptionSubmit={(value) => {
//                                 setStatusValue(value);
//                                 form.setFieldValue("newStatus", value);
//                                 comboboxStatus.closeDropdown();
//                             }}
//                             transitionProps={{
//                                 duration: 200,
//                                 transition: "pop",
//                             }}
//                         >
//                             <Combobox.Target>
//                                 <InputBase
//                                     label="Status"
//                                     description={`Status saat ini : ${item?.Status?.nama}`}
//                                     component="button"
//                                     type="button"
//                                     pointer
//                                     rightSectionPointerEvents="none"
//                                     rightSection={<Combobox.Chevron />}
//                                     onClick={() =>
//                                         comboboxStatus.toggleDropdown()
//                                     }
//                                     error={
//                                         form.errors.newStatus && "Harap diisi"
//                                     }
//                                     disabled
//                                 >
//                                     {selectedOptionStatus ? (
//                                         <SelectOption
//                                             {...selectedOptionStatus}
//                                         />
//                                     ) : (
//                                         <Input.Placeholder>
//                                             {item?.Status?.nama}
//                                         </Input.Placeholder>
//                                     )}
//                                 </InputBase>
//                             </Combobox.Target>

//                             <Combobox.Dropdown>
//                                 <Combobox.Options
//                                     mah={200}
//                                     type="scroll"
//                                     style={{ overflowY: "auto" }}
//                                 >
//                                     {optionsStatus}
//                                 </Combobox.Options>
//                             </Combobox.Dropdown>
//                         </Combobox>

//                         {/* Status End */}

//                         {/* Proses Start */}

//                         <Combobox
//                             store={comboboxProses}
//                             withinPortal={false}
//                             onOptionSubmit={(value) => {
//                                 setProsesValue(value);
//                                 form.setFieldValue("newProses", value);
//                                 comboboxProses.closeDropdown();
//                             }}
//                             transitionProps={{
//                                 duration: 200,
//                                 transition: "pop",
//                             }}
//                         >
//                             <Combobox.Target>
//                                 <InputBase
//                                     label="Proses"
//                                     description={`Proses saat ini : ${item?.Proses?.nama}`}
//                                     component="button"
//                                     type="button"
//                                     pointer
//                                     rightSectionPointerEvents="none"
//                                     rightSection={<Combobox.Chevron />}
//                                     onClick={() =>
//                                         comboboxProses.toggleDropdown()
//                                     }
//                                     error={
//                                         form.errors.newProses && "Harap diisi"
//                                     }
//                                     disabled={loading}
//                                 >
//                                     {SelectOptionProses ? (
//                                         <SelectOption {...SelectOptionProses} />
//                                     ) : (
//                                         <Input.Placeholder>
//                                             Pilih Proses
//                                         </Input.Placeholder>
//                                     )}
//                                 </InputBase>
//                             </Combobox.Target>

//                             <Combobox.Dropdown>
//                                 <Combobox.Options
//                                     mah={200}
//                                     type="scroll"
//                                     style={{ overflowY: "auto" }}
//                                 >
//                                     {optionsProses}
//                                 </Combobox.Options>
//                             </Combobox.Dropdown>
//                         </Combobox>

//                         {/* Proses End */}
//                     </Paper>

//                     <Group grow>
//                         <Button
//                             fullWidth
//                             leftSection={<IconFileDownload size={14} />}
//                             type="submit"
//                             disabled={!form.isValid()}
//                             loading={loading}
//                         >
//                             Simpan
//                         </Button>
//                         <Button
//                             variant="outline"
//                             color="red"
//                             leftSection={<IconTrash size={14} />}
//                             onClick={openDeleteModal}
//                             disabled={loading}
//                         >
//                             Hapus
//                         </Button>
//                     </Group>
//                 </Stack>
//             </form>
//         </>
//     ));

//     const items = [
//         { title: "Beranda", href: "/dashboard" },
//         { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
//         {
//             title: `Detail - ${params.id}`,
//             href: `/dashboard/admin/persetujuan/detail/${params.id}`,
//         },
//     ].map((item, index) => (
//         <Anchor href={item.href} key={index} size="sm" truncate="end">
//             {item.title}
//         </Anchor>
//     ));

//     return (
//         <>
//             <Container size="xl">
//                 <Breadcrumbs separator="→" mt="xs" mb="lg">
//                     {items}
//                 </Breadcrumbs>

//                 {list}
//             </Container>
//         </>
//     );
// };

// export default PersetujuanDetail;

import {
    Anchor,
    Avatar,
    Breadcrumbs,
    Button,
    Combobox,
    Container,
    Grid,
    Group,
    Input,
    InputBase,
    LoadingOverlay,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    em,
    useCombobox,
} from "@mantine/core";
import {
    IconBuildingBank,
    IconExternalLink,
    IconFileDescription,
    IconFileDownload,
    IconTrash,
} from "@tabler/icons-react";
import { Navigate, useParams } from "react-router-dom";
import {
    changeStatusPersetujuanAction,
    deleteFileAction,
    getDetailAdminPersetujuanAction,
} from "../../redux/slices/persetujuan/persetujuanSlices";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { basePersetujuanURL } from "../../utils/baseURL";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

// --- Konstanta Statis ---
const STATUS_INPUT = [
    { value: 1, description: "DISETUJUI" },
    { value: 2, description: "DITOLAK" },
    { value: 3, description: "PROSES" },
];

const KETERANGAN_INPUT = [
    {
        value: 1,
        description: "VERIFIKASI PERSYARATAN ADMINISTRASI",
        keterangan: null,
    },
    {
        value: 2,
        description: "VERIFIKASI FAKTUAL(SURVEI LAPANGAN)",
        keterangan: null,
    },
    { value: 3, description: "REKOMENDASI", keterangan: null },
    { value: 4, description: " PERTIMBANGAN TAPD", keterangan: null },
    { value: 5, description: "PENGANGGARAN", keterangan: null },
    {
        value: 6,
        description: " PENERBITAN SK SDH DAN DOKUMEN LAINNNYA",
        keterangan: null,
    },
    {
        value: 7,
        description: " PENANDATANGANAN NPHD, PAKTA INTEGRITAS, DLL",
        keterangan: null,
    },
    { value: 8, description: "PENCAIRAN DANA BANTUAN HIBAH", keterangan: null },
    { value: 9, description: "LAPORAN PERTANGGUNGJAWABAN", keterangan: null },
    { value: 10, description: "❎ BELUM DIPROSES", keterangan: null },
    {
        value: 11,
        description: "❌ DITOLAK",
        keterangan: "FILE SALAH/TIDAK LENGKAP",
    },
];

// --- Sub-Komponen Reusable ---
const SelectOptionItem = ({ value, description, keterangan }) => (
    <Group>
        <Text fz="sm" fw={500}>
            {value}. {description} {keterangan ? `- ${keterangan}` : ""}
        </Text>
    </Group>
);

// --- Modern File Card Component ---
const FileCard = ({ label, fileName, icon: Icon = IconFileDescription }) => (
    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
        <Paper
            withBorder
            radius="lg"
            p="md"
            style={{
                transition: "all 0.5s ease",
                // cursor: "pointer",
                backgroundColor: "var(--mantine-color-body)",
            }}
            className="file-card-hover"
        >
            <Stack gap="sm" align="center">
                <ThemeIcon variant="light" size="xl" radius="md" color="blue">
                    <Icon size={20} stroke={1.5} />
                </ThemeIcon>

                <Stack gap={2} align="center" style={{ width: "100%" }}>
                    <Text
                        fz="xs"
                        fw={700}
                        ta="center"
                        // c="dimmed"
                        tt="uppercase"
                        lts={1}
                    >
                        {label}
                    </Text>
                    <br />
                    {label === "Rekening Bank 9" ? (
                        <Text c="dimmed">{fileName}</Text>
                    ) : (
                        <Anchor
                            fz="xs"
                            ta="center"
                            href={
                                label === "Rekening Bank 9"
                                    ? "#"
                                    : `${basePersetujuanURL}/preview/${fileName}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            // truncate="end"
                            fw={500}
                            style={{ maxWidth: "100%" }}
                        >
                            {fileName || "Tidak Ada"}{" "}
                            <IconExternalLink
                                size={10}
                                style={{ marginLeft: 4 }}
                            />
                        </Anchor>
                    )}
                </Stack>
            </Stack>
        </Paper>
    </Grid.Col>
);

const PersetujuanDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(`(max-width: ${em(850)})`);
    const cardStyles = { backgroundColor: "light-dark(#FCFCFC, #1E1E1E)" };

    const { loading, detailAdminPersetujuan, isDeleted, changeStatus } =
        useSelector((state) => state?.persetujuan);
    const detail = detailAdminPersetujuan?.[0]; // Ambil data pertama agar tidak perlu map berulang

    const form = useForm({
        validateInputOnChange: true,
        initialValues: { id, newProses: "", newStatus: "" },
        validate: {
            id: isNotEmpty("Harap diisi"),
            newProses: isNotEmpty("Harap diisi"),
        },
    });

    // --- Combobox Logic ---
    const comboboxStatus = useCombobox({
        onDropdownClose: () => comboboxStatus.resetSelectedOption(),
    });
    const comboboxProses = useCombobox({
        onDropdownClose: () => comboboxProses.resetSelectedOption(),
    });

    const selectedOptionStatus = STATUS_INPUT.find(
        (i) => i.value === form.values.newStatus,
    );
    const selectedOptionProses = KETERANGAN_INPUT.find(
        (i) => i.value === form.values.newProses,
    );

    // --- Effects ---
    useEffect(() => {
        dispatch(getDetailAdminPersetujuanAction(id));
    }, [dispatch, id]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();
        return () => nprogress.reset();
    }, [loading]);

    if (isDeleted || changeStatus)
        return <Navigate to="/dashboard/admin/persetujuan" replace />;

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: "Hapus Persetujuan?",
            centered: true,
            children: (
                <Text size="sm">
                    Apakah Anda yakin ingin menghapus persetujuan{" "}
                    {detail?.Keagamaan?.nama} oleh {detail?.User?.nama}?
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onConfirm: () => {
                toast.info("Menghapus data...");
                dispatch(deleteFileAction(id));
            },
        });

    // --- Data mapping untuk File ---
    const isRumahIbadah = detail?.Keagamaan?.Kategori?.nama === "RUMAH IBADAH";

    const fileConfigs = [
        { label: "Surat Permohonan", name: detail?.Suratpermohonan?.namafile },
        { label: "Proposal", name: detail?.Proposal?.namafile },
        { label: "Rencana Anggaran Biaya", name: detail?.Rab?.namafile },
        { label: "SK Pengurus", name: detail?.Sk?.namafile },
        { label: "KTP Pengurus", name: detail?.Ktp?.namafile },
        {
            label: isRumahIbadah ? "ID SIMAS" : "NSPP/NSM",
            name: isRumahIbadah
                ? detail?.Asetrekom?.namafile
                : detail?.Suket?.namafile,
        },
        { label: "Rekening Bank Jambi", name: detail?.Norekening?.namafile },
        {
            label: "Rekening Bank 9",
            name: detail?.norek,
            icon: IconBuildingBank,
        },
        { label: "Surat Domisili", name: detail?.Suratdomisili?.namafile },
        {
            label: "Rekomendasi Kemenag",
            name: detail?.Suratrekomkemenag?.namafile,
        },
        {
            label: "Pernyataan Tidak Hibah",
            name: detail?.Suratpernyataantidakhibah?.namafile,
        },
        {
            label: "Pernyataan Keabsahan",
            name: detail?.Suratpernyataankeabsahan?.namafile,
        },
    ];

    if (!isRumahIbadah) {
        fileConfigs.push(
            { label: "NPWP", name: detail?.Npwp?.namafile },
            {
                label: "Izin Operasional",
                name: detail?.Izinoperasional?.namafile,
            },
            {
                label: "Pengesahan Kemenhum",
                name: detail?.Pengesahankemenkumham?.namafile,
            },
            {
                label: "Akta Notaris Pendirian",
                name: detail?.Aktapendirian?.namafile,
            },
        );
    }

    return (
        <Container size="xl" pb="xl">
            <Breadcrumbs separator="→" mt="xs" mb="lg">
                <Anchor href="/dashboard" size="sm">
                    Beranda
                </Anchor>
                <Anchor href="/dashboard/admin/persetujuan" size="sm">
                    Persetujuan
                </Anchor>
                <Text size="sm" c="dimmed">
                    Detail - {id}
                </Text>
            </Breadcrumbs>

            <form
                onSubmit={form.onSubmit((v) =>
                    dispatch(changeStatusPersetujuanAction(v)),
                )}
            >
                <Stack gap="xl" pos="relative">
                    <LoadingOverlay
                        visible={loading}
                        overlayProps={{ blur: 1 }}
                    />

                    {/* BAGIAN ATAS: PROFIL (SESUAI GAMBAR) */}
                    <Paper
                        withBorder
                        radius="md"
                        shadow="sm"
                        p="xl"
                        style={{
                            maxWidth: 800,
                            margin: "0 auto",
                            width: "100%",
                        }}
                    >
                        <Stack align="center" gap="md">
                            <Avatar
                                src={`https://ui-avatars.com/api/?name=${detail?.User?.nama}&background=random`}
                                size={60}
                                radius={120}
                                mx="auto"
                            />
                            <Stack gap={0} align="center">
                                <Text fw={700} fz="xl">
                                    {detail?.User?.nama}
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    {detail?.User?.nik} •{" "}
                                    {detail?.User?.notelpon}
                                </Text>
                            </Stack>

                            <Paper withBorder p="md" radius="md" w="100%">
                                <Stack gap={4} align="center">
                                    <Text
                                        fz="xs"
                                        fw={600}
                                        c="dimmed"
                                        ta="center"
                                    >
                                        {detail?.Keagamaan?.nama} -{" "}
                                        {detail?.Keagamaan?.Kategori?.nama}
                                    </Text>
                                    <Text fz="xs" c="dimmed" ta="center">
                                        {detail?.Keagamaan?.wilayah}
                                    </Text>
                                    <Text fz="xs" c="dimmed" ta="center">
                                        {detail?.Keagamaan?.alamat}
                                    </Text>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Paper>

                    {/* BAGIAN BAWAH: GRID FILE 4 KOLOM (SESUAI GAMBAR) */}
                    <Grid gutter="md">
                        {fileConfigs.map((file, idx) => (
                            <FileCard
                                key={idx}
                                label={file.label}
                                fileName={file.name}
                                icon={file.icon}
                                isMobile={isMobile}
                                cardStyles={cardStyles}
                            />
                        ))}
                    </Grid>

                    {/* INPUT STATUS & PROSES */}
                    <Paper radius="md" shadow="sm" withBorder p="lg">
                        <Grid>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Combobox
                                    store={comboboxStatus}
                                    onOptionSubmit={(val) => {
                                        form.setFieldValue("newStatus", val);
                                        comboboxStatus.closeDropdown();
                                    }}
                                >
                                    <Combobox.Target>
                                        <InputBase
                                            label="Status"
                                            component="button"
                                            type="button"
                                            pointer
                                            disabled
                                            description={`Status saat ini : ${detail?.Status?.nama}`}
                                            rightSection={<Combobox.Chevron />}
                                            onClick={() =>
                                                comboboxStatus.toggleDropdown()
                                            }
                                        >
                                            {selectedOptionStatus ? (
                                                <SelectOptionItem
                                                    {...selectedOptionStatus}
                                                />
                                            ) : (
                                                <Input.Placeholder>
                                                    {detail?.Status?.nama}
                                                </Input.Placeholder>
                                            )}
                                        </InputBase>
                                    </Combobox.Target>
                                    <Combobox.Dropdown>
                                        <Combobox.Options
                                            mah={200}
                                            style={{ overflowY: "auto" }}
                                        >
                                            {STATUS_INPUT.map((item) => (
                                                <Combobox.Option
                                                    value={item.value}
                                                    key={item.value}
                                                    active={
                                                        item.value ===
                                                        form.values.newStatus
                                                    }
                                                >
                                                    <SelectOptionItem
                                                        {...item}
                                                    />
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Combobox
                                    store={comboboxProses}
                                    onOptionSubmit={(val) => {
                                        form.setFieldValue("newProses", val);
                                        comboboxProses.closeDropdown();
                                    }}
                                >
                                    <Combobox.Target>
                                        <InputBase
                                            label="Proses"
                                            component="button"
                                            type="button"
                                            pointer
                                            description={`Proses saat ini : ${detail?.Proses?.nama}`}
                                            rightSection={<Combobox.Chevron />}
                                            onClick={() =>
                                                comboboxProses.toggleDropdown()
                                            }
                                            error={form.errors.newProses}
                                        >
                                            {selectedOptionProses ? (
                                                <SelectOptionItem
                                                    {...selectedOptionProses}
                                                />
                                            ) : (
                                                <Input.Placeholder>
                                                    Pilih Proses
                                                </Input.Placeholder>
                                            )}
                                        </InputBase>
                                    </Combobox.Target>
                                    <Combobox.Dropdown>
                                        <Combobox.Options
                                            mah={200}
                                            style={{ overflowY: "auto" }}
                                        >
                                            {KETERANGAN_INPUT.map((item) => (
                                                <Combobox.Option
                                                    value={item.value}
                                                    key={item.value}
                                                    active={
                                                        item.value ===
                                                        form.values.newProses
                                                    }
                                                >
                                                    <SelectOptionItem
                                                        {...item}
                                                    />
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    {/* TOMBOL AKSI */}
                    <Group grow>
                        <Button
                            leftSection={<IconFileDownload size={18} />}
                            type="submit"
                            disabled={!form.isValid()}
                            loading={loading}
                        >
                            Simpan
                        </Button>
                        <Button
                            variant="outline"
                            color="red"
                            leftSection={<IconTrash size={18} />}
                            onClick={openDeleteModal}
                            disabled={loading}
                        >
                            Hapus
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    );
};

export default PersetujuanDetail;
