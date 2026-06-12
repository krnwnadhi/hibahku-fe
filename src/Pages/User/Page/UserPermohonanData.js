// import {
//     Anchor,
//     Badge,
//     Button,
//     Divider,
//     FileInput,
//     Grid,
//     Group,
//     Loader,
//     Paper,
//     Stack,
//     Text,
//     ThemeIcon,
//     Title,
// } from "@mantine/core";
// import {
//     IconBuildingBank,
//     IconExternalLink,
//     IconFileDescription,
//     IconUpload,
// } from "@tabler/icons-react";
// import {
//     getAllPersetujuanAction,
//     getDetailUserPersetujuanAction,
// } from "../../../redux/slices/persetujuan/persetujuanSlices";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// import axios from "axios";
// import { basePersetujuanURL } from "../../../utils/baseURL";

// const UserPermohonanData = ({ permohonanId }) => {
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);
//     const [existingData, setExistingData] = useState(null);
//     const [newFiles, setNewFiles] = useState({});

//     const dispatch = useDispatch();

//     const { detailUserPersetujuan } = useSelector(
//         (state) => state?.persetujuan,
//     );
//     const detailUser = detailUserPersetujuan?.[0];

//     const user = useSelector((state) => state?.auth?.userAuth);

//     const { nik } = user || {};

//     useEffect(() => {
//         dispatch(getAllPersetujuanAction());
//         dispatch(getDetailUserPersetujuanAction(nik));
//     }, [dispatch, nik]);

//     // 1. Ambil data lama saat komponen dibuka
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 // Pastikan endpoint ini sesuai dengan route GET /:id yang kita buat sebelumnya
//                 const res = await axios.get(`/api/permohonan/${permohonanId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setExistingData(res.data.data);
//             } catch (err) {
//                 console.error("Gagal mengambil detail permohonan", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [permohonanId]);

//     const handleUpdate = async () => {
//         setSubmitting(true);
//         const formData = new FormData();

//         // Hanya masukkan file yang dipilih (tidak null)
//         Object.keys(newFiles).forEach((key) => {
//             if (newFiles[key]) {
//                 formData.append(key, newFiles[key]);
//             }
//         });

//         try {
//             const token = localStorage.getItem("token");
//             await axios.patch(`/api/permohonan/${permohonanId}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             alert("Dokumen berhasil diperbarui!");
//             // Refresh window atau update state jika perlu
//         } catch (error) {
//             alert(error.response?.data?.message || "Gagal update");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading)
//         return (
//             <Group justify="center" p="xl">
//                 <Loader size="md" />
//             </Group>
//         );

//     // Helper untuk menampilkan link file lama
//     // Asumsi: Backend mengembalikan objek file di dalam data permohonan (misal: data.Ktp.namafile)
//     const renderOldFileLink = (fileObject, label) => {
//         if (!fileObject)
//             return (
//                 <Text size="xs" color="dimmed">
//                     Belum ada file terupload
//                 </Text>
//             );

//         return (
//             <Group gap="xs" mt={4}>
//                 <Badge color="gray" variant="light" size="sm">
//                     File saat ini:
//                 </Badge>
//                 <Anchor
//                     href={`${import.meta.env.VITE_API_URL}/uploads/${fileObject.namafile}`}
//                     target="_blank"
//                     size="xs"
//                     underline="hover"
//                 >
//                     <Group gap={4}>
//                         <IconExternalLink size={12} />
//                         {fileObject.namafile}
//                     </Group>
//                 </Anchor>
//             </Group>
//         );
//     };

//     // --- Data mapping untuk File ---
//     const isRumahIbadah =
//         detailUser?.Keagamaan?.Kategori?.nama === "RUMAH IBADAH";

//     const fileConfigs = [
//         {
//             label: "Surat Permohonan",
//             name: detailUser?.Suratpermohonan?.namafile,
//         },
//         { label: "Proposal", name: detailUser?.Proposal?.namafile },
//         { label: "Rencana Anggaran Biaya", name: detailUser?.Rab?.namafile },
//         { label: "SK Pengurus", name: detailUser?.Sk?.namafile },
//         { label: "KTP Pengurus", name: detailUser?.Ktp?.namafile },
//         {
//             label: isRumahIbadah ? "ID SIMAS" : "NSPP/NSM",
//             name: isRumahIbadah
//                 ? detailUser?.Asetrekom?.namafile
//                 : detailUser?.Suket?.namafile,
//         },
//         {
//             label: "Rekening Bank Jambi",
//             name: detailUser?.Norekening?.namafile,
//         },
//         {
//             label: "Rekening Bank 9",
//             name: detailUser?.norek,
//             icon: IconBuildingBank,
//         },
//         { label: "Surat Domisili", name: detailUser?.Suratdomisili?.namafile },
//         {
//             label: "Rekomendasi Kemenag",
//             name: detailUser?.Suratrekomkemenag?.namafile,
//         },
//         {
//             label: "Pernyataan Tidak Hibah",
//             name: detailUser?.Suratpernyataantidakhibah?.namafile,
//         },
//         {
//             label: "Pernyataan Keabsahan",
//             name: detailUser?.Suratpernyataankeabsahan?.namafile,
//         },
//     ];

//     if (!isRumahIbadah) {
//         fileConfigs.push(
//             { label: "NPWP", name: detailUser?.Npwp?.namafile },
//             {
//                 label: "Izin Operasional",
//                 name: detailUser?.Izinoperasional?.namafile,
//             },
//             {
//                 label: "Pengesahan Kemenhum",
//                 name: detailUser?.Pengesahankemenkumham?.namafile,
//             },
//             {
//                 label: "Akta Notaris Pendirian",
//                 name: detailUser?.Aktapendirian?.namafile,
//             },
//         );
//     }

//     // --- Modern File Card Component ---
//     const FileCard = ({
//         label,
//         fileName,
//         icon: Icon = IconFileDescription,
//     }) => (
//         <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
//             <Paper
//                 withBorder
//                 radius="lg"
//                 p="md"
//                 style={{
//                     transition: "all 0.5s ease",
//                     backgroundColor: "var(--mantine-color-body)",
//                 }}
//                 className="file-card-hover"
//             >
//                 <Stack gap="sm" align="center">
//                     <ThemeIcon
//                         variant="light"
//                         size="xl"
//                         radius="md"
//                         color="blue"
//                     >
//                         <Icon size={20} stroke={1.5} />
//                     </ThemeIcon>

//                     <Stack gap={2} align="center" style={{ width: "100%" }}>
//                         <Text
//                             fz="xs"
//                             fw={700}
//                             ta="center"
//                             tt="uppercase"
//                             lts={1}
//                         >
//                             {label}
//                         </Text>
//                         <br />
//                         {label === "Rekening Bank 9" ? (
//                             <Text c="dimmed">{fileName}</Text>
//                         ) : (
//                             <Anchor
//                                 fz="xs"
//                                 ta="center"
//                                 href={
//                                     label === "Rekening Bank 9"
//                                         ? "#"
//                                         : `${basePersetujuanURL}/preview/${fileName}`
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 fw={500}
//                                 style={{ maxWidth: "100%" }}
//                             >
//                                 {fileName || "Tidak Ada"}{" "}
//                                 <IconExternalLink
//                                     size={10}
//                                     style={{ marginLeft: 4 }}
//                                 />
//                             </Anchor>
//                         )}
//                     </Stack>
//                 </Stack>
//             </Paper>
//         </Grid.Col>
//     );

//     return (
//         <Paper shadow="sm" radius="md" p="xl" withBorder>
//             <Title order={3} mb="lg">
//                 Edit Dokumen Permohonan
//             </Title>

//             <Grid gutter="md">
//                 {fileConfigs.map((file, idx) => (
//                     <FileCard
//                         key={idx}
//                         label={file.label}
//                         fileName={file.name}
//                         icon={file.icon}
//                         // isMobile={isMobile}
//                         // cardStyles={cardStyles}
//                     />
//                 ))}
//             </Grid>

//             <Stack gap="xl">
//                 {/* Input KTP */}
//                 <div>
//                     <FileInput
//                         label="Kartu Tanda Penduduk (KTP)"
//                         placeholder="Pilih file PDF baru untuk mengganti"
//                         leftSection={<IconFileDescription size={18} />}
//                         accept="application/pdf"
//                         onChange={(file) =>
//                             setNewFiles({ ...newFiles, file_ktp: file })
//                         }
//                     />
//                     {renderOldFileLink(existingData?.Ktp)}
//                 </div>

//                 <Divider variant="dashed" />

//                 {/* Input RAB */}
//                 <div>
//                     <FileInput
//                         label="Rencana Anggaran Biaya (RAB)"
//                         placeholder="Pilih file PDF baru untuk mengganti"
//                         leftSection={<IconFileDescription size={18} />}
//                         accept="application/pdf"
//                         onChange={(file) =>
//                             setNewFiles({ ...newFiles, file_rab: file })
//                         }
//                     />
//                     {renderOldFileLink(existingData?.Rab)}
//                 </div>

//                 <Divider variant="dashed" />

//                 {/* Input Proposal */}
//                 <div>
//                     <FileInput
//                         label="Proposal Pengajuan"
//                         placeholder="Pilih file PDF baru untuk mengganti"
//                         leftSection={<IconFileDescription size={18} />}
//                         accept="application/pdf"
//                         onChange={(file) =>
//                             setNewFiles({ ...newFiles, file_proposal: file })
//                         }
//                     />
//                     {renderOldFileLink(existingData?.Proposal)}
//                 </div>

//                 <Group justify="flex-end" mt="xl">
//                     <Button
//                         variant="outline"
//                         color="gray"
//                         onClick={() => window.history.back()}
//                         disabled={submitting}
//                     >
//                         Batal
//                     </Button>
//                     <Button
//                         leftSection={<IconUpload size={16} />}
//                         loading={submitting}
//                         onClick={handleUpdate}
//                     >
//                         Simpan Perubahan Dokumen
//                     </Button>
//                 </Group>
//             </Stack>
//         </Paper>
//     );
// };

// export default UserPermohonanData;

import "react-toastify/dist/ReactToastify.css"; // Pastikan CSS ini sudah ter-import di proyek Anda

import {
    Anchor,
    Button,
    FileInput,
    Grid,
    Group,
    Loader,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import {
    IconBuildingBank,
    IconExternalLink,
    IconFileDescription,
    IconUpload,
} from "@tabler/icons-react";
import { basePermohonanURL, basePersetujuanURL } from "../../../utils/baseURL";
import {
    getAllPersetujuanAction,
    getDetailUserPersetujuanAction,
} from "../../../redux/slices/persetujuan/persetujuanSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

const UserPermohonanData = () => {
    const { id } = useParams(); // Mengambil :id dari URL
    const navigate = useNavigate(); // Inisialisasi di sini
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newFiles, setNewFiles] = useState({});

    const dispatch = useDispatch();

    const { detailUserPersetujuan } = useSelector(
        (state) => state?.persetujuan,
    );
    const detailUser = detailUserPersetujuan?.[0];

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik, token } = user || {};

    useEffect(() => {
        if (nik) {
            dispatch(getAllPersetujuanAction());
            dispatch(getDetailUserPersetujuanAction(nik));
            setLoading(false); // Set loading ke false setelah data ter-dispatch
        }
    }, [dispatch, nik]);

    const handleUpdate = async () => {
        // Ambil ID dari props, jika tidak ada, ambil dari data pertama di Redux (detailUser.id)
        const activeId = id || detailUser?.id;

        if (!activeId) {
            toast.error("ID Permohonan tidak ditemukan!");
            return;
        }

        setSubmitting(true);

        // 1. Munculkan Toast Loading di awal
        const toastId = toast.loading(
            "Sedang memproses dokumen, mohon tunggu...",
        );
        const formData = new FormData();

        // Hanya masukkan file yang dipilih (tidak null/undefined)
        Object.keys(newFiles).forEach((key) => {
            if (newFiles[key]) {
                formData.append(key, newFiles[key]);
            }
        });

        try {
            // const token = localStorage.getItem("logInfo");
            await axios.patch(`${basePermohonanURL}/${activeId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            // 2. Jika sukses, ubah Toast Loading menjadi Sukses dengan jeda visual (timeout)
            setTimeout(() => {
                toast.update(toastId, {
                    render: "Berhasil! Seluruh dokumen baru sukses diperbarui. 👌",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });

                setSubmitting(false);

                // 3. Kembalikan ke halaman beranda/dashboard user setelah 1 detik
                setTimeout(() => {
                    navigate(`/dashboard/user/progres/${id}`);
                }, 1000);
            }, 1500); // Efek waktu tunggu pengunggahan berkas selama 1.5 detik
        } catch (error) {
            setSubmitting(false);

            // 4. Jika gagal, ubah Toast Loading menjadi Error
            toast.update(toastId, {
                render:
                    error.response?.data?.message ||
                    "Gagal memperbarui dokumen.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    if (loading || !detailUser)
        return (
            <Group justify="center" p="xl">
                <Loader size="md" type="dots" />
            </Group>
        );

    const isRumahIbadah =
        detailUser?.Keagamaan?.Kategori?.nama === "RUMAH IBADAH";

    // --- Definisi Konfigurasi Berkas (Menghubungkan apiKey dengan data fileLama) ---
    const fileConfigs = [
        {
            apiKey: "file_suratpermohonan",
            label: "Surat Permohonan",
            name: detailUser?.Suratpermohonan?.namafile,
        },
        {
            apiKey: "file_proposal",
            label: "Proposal",
            name: detailUser?.Proposal?.namafile,
        },
        {
            apiKey: "file_rab",
            label: "Rencana Anggaran Biaya",
            name: detailUser?.Rab?.namafile,
        },
        {
            apiKey: "file_sk",
            label: "SK Pengurus",
            name: detailUser?.Sk?.namafile,
        },
        {
            apiKey: "file_ktp",
            label: "KTP Pengurus",
            name: detailUser?.Ktp?.namafile,
        },
        {
            apiKey: isRumahIbadah ? "file_asetrekom" : "file_suket",
            label: isRumahIbadah ? "ID SIMAS" : "NSPP/NSM",
            name: isRumahIbadah
                ? detailUser?.Asetrekom?.namafile
                : detailUser?.Suket?.namafile,
        },
        {
            apiKey: "file_norekening",
            label: "Rekening Bank Jambi",
            name: detailUser?.Norekening?.namafile,
        },
        {
            apiKey: "norek",
            label: "Rekening Bank 9",
            name: detailUser?.norek,
            icon: IconBuildingBank,
            isTextOnly: true, // Menandakan field ini hanya data text (bukan file upload)
        },
        {
            apiKey: "file_suratdomisili",
            label: "Surat Domisili",
            name: detailUser?.Suratdomisili?.namafile,
        },
        {
            apiKey: "file_suratrekomkemenag",
            label: "Rekomendasi Kemenag",
            name: detailUser?.Suratrekomkemenag?.namafile,
        },
        {
            apiKey: "file_suratpernyataantidakhibah",
            label: "Pernyataan Tidak Hibah",
            name: detailUser?.Suratpernyataantidakhibah?.namafile,
        },
        {
            apiKey: "file_suratpernyataankeabsahan",
            label: "Pernyataan Keabsahan",
            name: detailUser?.Suratpernyataankeabsahan?.namafile,
        },
    ];

    if (!isRumahIbadah) {
        fileConfigs.push(
            {
                apiKey: "file_npwp",
                label: "NPWP",
                name: detailUser?.Npwp?.namafile,
            },
            {
                apiKey: "file_izinoperasional",
                label: "Izin Operasional",
                name: detailUser?.Izinoperasional?.namafile,
            },
            {
                apiKey: "file_pengesahankemenkumham",
                label: "Pengesahan Kemenhum",
                name: detailUser?.Pengesahankemenkumham?.namafile,
            },
            {
                apiKey: "file_aktapendirian",
                label: "Akta Notaris Pendirian",
                name: detailUser?.Aktapendirian?.namafile,
            },
        );
    }

    // --- Komponen Grid Card Bento Terintegrasi ---
    const FileCard = ({
        label,
        fileName,
        apiKey,
        isTextOnly,
        icon: Icon = IconFileDescription,
    }) => {
        const hasNewFile = !!newFiles[apiKey];

        return (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Paper
                    withBorder
                    radius="lg"
                    p="md"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                        backgroundColor: hasNewFile
                            ? "var(--mantine-color-blue-0)"
                            : "var(--mantine-color-body)",
                        borderColor: hasNewFile
                            ? "var(--mantine-color-blue-5)"
                            : undefined,
                    }}
                >
                    <Stack gap="xs" align="center" style={{ flexGrow: 1 }}>
                        <ThemeIcon
                            variant="light"
                            size="xl"
                            radius="md"
                            color={hasNewFile ? "blue" : "gray"}
                        >
                            <Icon size={20} stroke={1.5} />
                        </ThemeIcon>

                        <Stack gap={2} align="center" style={{ width: "100%" }}>
                            <Text
                                fz="xs"
                                fw={700}
                                ta="center"
                                tt="uppercase"
                                lts={1}
                            >
                                {label}
                            </Text>

                            <div
                                style={{
                                    marginTop: 4,
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            >
                                {isTextOnly ? (
                                    <Text fz="xs" fw={500} c="dimmed">
                                        {fileName || "Tidak Ada"}
                                    </Text>
                                ) : fileName ? (
                                    <Anchor
                                        fz="xs"
                                        ta="center"
                                        href={`${basePersetujuanURL}/preview/${fileName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        fw={500}
                                        style={{
                                            display: "block",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {/* {fileName} */}
                                        Lihat Dokumen
                                        <IconExternalLink
                                            size={10}
                                            style={{ marginLeft: 4 }}
                                        />
                                    </Anchor>
                                ) : (
                                    <Text fz="xs" c="dimmed">
                                        Belum ada berkas
                                    </Text>
                                )}
                            </div>
                        </Stack>
                    </Stack>

                    {/* Tampilkan FileInput jika berkas tersebut bisa di-upload/di-replace */}
                    {!isTextOnly && (
                        <FileInput
                            mt="sm"
                            size="xs"
                            placeholder="Ganti berkas (PDF)"
                            accept="application/pdf"
                            clearable
                            value={newFiles[apiKey] || null}
                            onChange={(file) =>
                                setNewFiles({ ...newFiles, [apiKey]: file })
                            }
                        />
                    )}
                </Paper>
            </Grid.Col>
        );
    };

    return (
        <Paper shadow="sm" radius="md" p="xl" withBorder>
            <Title order={3} mb="lg">
                Edit Dokumen Permohonan
            </Title>

            {/* Layout Bento Grid */}
            <Grid gutter="md">
                {fileConfigs.map((file, idx) => (
                    <FileCard
                        key={idx}
                        apiKey={file.apiKey}
                        label={file.label}
                        fileName={file.name}
                        icon={file.icon}
                        isTextOnly={file.isTextOnly}
                    />
                ))}
            </Grid>

            {/* Tombol Aksi Akhir */}
            <Group justify="flex-end" mt="xl">
                <Button
                    variant="outline"
                    color="gray"
                    onClick={() => window.history.back()}
                    disabled={submitting}
                >
                    Batal
                </Button>
                <Button
                    leftSection={<IconUpload size={16} />}
                    loading={submitting}
                    onClick={handleUpdate}
                >
                    Simpan Perubahan Dokumen
                </Button>
            </Group>
        </Paper>
    );
};

export default UserPermohonanData;
