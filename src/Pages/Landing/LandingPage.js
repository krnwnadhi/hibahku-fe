import {
    Accordion,
    ActionIcon,
    Anchor,
    AppShell,
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Group,
    Image,
    List,
    Paper,
    SimpleGrid,
    Space,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Timeline,
    Title,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconBuildingMosque,
    IconChevronRight,
    IconCircleCheck,
    IconClock,
    IconFileCheck,
    IconFileText,
    IconLockAccess,
    IconMoon,
    IconSchool,
    IconSun,
    IconX,
} from "@tabler/icons-react";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { cekStatusRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";

export default function LandingPage() {
    const dispatch = useDispatch();
    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading, cekStatus, appError } = rumahIbadah;

    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
    };

    const showErrorModal = (query) => {
        modals.open({
            title: (
                <Text fw={700} c="red">
                    Pencarian Gagal
                </Text>
            ),
            centered: true,
            radius: "md",
            children: (
                <Stack align="center" py="md">
                    <ThemeIcon
                        color="red"
                        size={60}
                        radius="xl"
                        variant="light"
                    >
                        <IconAlertCircle size={34} />
                    </ThemeIcon>
                    <Text fw={700} size="lg">
                        Data Tidak Ditemukan
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                        Maaf, nomor registrasi <b>{query}</b> tidak terdaftar di
                        sistem HIBAHKU. Pastikan kode yang Anda masukkan sudah
                        benar.
                    </Text>
                    <Button
                        fullWidth
                        color="red"
                        mt="md"
                        radius="md"
                        onClick={() => modals.closeAll()}
                    >
                        Coba Lagi
                    </Button>
                </Stack>
            ),
        });
    };

    const showSuccessModal = (query) => {
        modals.open({
            title: <Text fw={700}>Detail Progres Hibah</Text>,
            centered: true,
            radius: "lg",
            size: "lg",
            children: (
                <Stack gap="md">
                    <Box
                        p="md"
                        style={{
                            borderRadius: "12px",
                            backgroundColor:
                                computedColorScheme === "dark"
                                    ? "rgba(25, 113, 194, 0.1)"
                                    : "#f0f7ff",
                            border: `1px solid ${computedColorScheme === "dark" ? "#1c7ed6" : "#d0ebff"}`,
                        }}
                    >
                        <Group justify="space-between">
                            <Box>
                                <Text size="xs" c="dimmed" fw={700}>
                                    NOMOR REGISTRASI
                                </Text>
                                <Text fw={900} size="xl" c="blue.5">
                                    {query}
                                </Text>
                            </Box>
                            <Badge size="lg" variant="filled" color="blue.6">
                                Tahap Verifikasi
                            </Badge>
                        </Group>
                    </Box>

                    <Timeline
                        active={1}
                        bulletSize={30}
                        lineWidth={2}
                        color="blue"
                        mt="md"
                    >
                        <Timeline.Item
                            bullet={<IconFileText size={16} />}
                            title="Berkas Diterima"
                        >
                            <Text c="dimmed" size="xs">
                                Dokumen digital berhasil diunggah.
                            </Text>
                        </Timeline.Item>
                        <Timeline.Item
                            bullet={<IconClock size={16} />}
                            title="Verifikasi Administrasi"
                        >
                            <Text c="dimmed" size="xs">
                                Sedang diperiksa oleh tim Biro Kesra.
                            </Text>
                            <Badge
                                variant="dot"
                                color="orange"
                                size="sm"
                                mt={5}
                            >
                                Proses
                            </Badge>
                        </Timeline.Item>
                        <Timeline.Item
                            bullet={<IconCircleCheck size={16} />}
                            title="Survey Lapangan"
                        >
                            <Text c="dimmed" size="xs">
                                Menunggu jadwal peninjauan fisik.
                            </Text>
                        </Timeline.Item>
                    </Timeline>

                    <Button
                        fullWidth
                        mt="md"
                        radius="md"
                        onClick={() => modals.closeAll()}
                    >
                        Selesai
                    </Button>
                </Stack>
            ),
        });
    };

    const handleCheckStatus = (values) => {
        const query = values.id.trim().toUpperCase();
        if (!query) return;

        if (query === "123") {
            showErrorModal(query);
        } else {
            // Jalankan Aksi Redux
            dispatch(cekStatusRumahIbadahAction(values));
            // Tampilkan Modal Progres
            showSuccessModal(query);
        }
        form.reset();
    };

    // Fungsi untuk smooth scroll ke bagian persyaratan
    const scrollToRequirements = () => {
        const element = document.getElementById("seksi-persyaratan");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const exceptThisSymbols = ["e", "E", "+", "-", ".", ","];

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            id: "",
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(cekStatusRumahIbadahAction(values));
        form.clearErrors();
    });

    // --- CLEAN CODE: MODAL CONTENT HELPERS ---
    const ModalHeader = () => (
        <Stack align="center" gap="xs">
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                w={100}
                // w="auto"
                fit="contain"
            />
            <Title ta="center" order={4}>
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>
        </Stack>
    );

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();
        return () => nprogress.reset();
    }, [loading]);

    useEffect(() => {
        if (loading || (!cekStatus && !appError)) return;

        const modalConfig = {
            centered: true,
            withCloseButton: false,
            closeOnClickOutside: false,
            closeOnEscape: false,
            radius: "md",
            overlayProps: { backgroundOpacity: 0.55, blur: 3 },
        };

        if (appError || form.values.id.toUpperCase() === "123") {
            modals.open({
                ...modalConfig,
                children: (
                    <Stack gap="md" py="md">
                        <ModalHeader />
                        <Text ta="center" c="red" fw={700}>
                            MAAF
                        </Text>
                        <Text size="sm" ta="center">
                            ID SIMAS/NSM/NSPP telah terdaftar di database
                            HIBAHKU, namun telah menerima bantuan serupa
                            sebelumnya.
                        </Text>
                        {appError && (
                            <Text size="xs" c="red" ta="center" fs="italic">
                                {appError}
                            </Text>
                        )}
                        <Button
                            fullWidth
                            onClick={() => modals.closeAll()}
                            color="red"
                        >
                            Saya Mengerti
                        </Button>
                    </Stack>
                ),
            });
        } else if (cekStatus) {
            if (cekStatus.isUpload) {
                modals.open({
                    ...modalConfig,
                    size: "md",
                    children: (
                        <Stack gap="md" py="md">
                            <ModalHeader />
                            <Text ta="center" c="green" fw={700}>
                                SELAMAT
                            </Text>
                            <Text ta="center">
                                ID SIMAS/NSM/NSPP anda telah terdaftar di
                                database HIBAHKU. Permohonan Hibah Anda{" "}
                                <b>DAPAT DILANJUTKAN</b>.
                            </Text>
                            <Text ta="center" size="sm">
                                Silahkan MASUK/DAFTAR untuk membuat akun.
                            </Text>
                            <Button fullWidth onClick={() => modals.closeAll()}>
                                Selesai
                            </Button>
                        </Stack>
                    ),
                });
            } else {
                modals.open({
                    ...modalConfig,
                    children: (
                        <Stack gap="md" py="md" ta="center">
                            <ModalHeader />
                            <Text c="red" fw={700}>
                                DATA TIDAK DITEMUKAN!
                            </Text>
                            <Text size="sm">
                                Pastikan ID SIMAS/NSPP/NSM benar atau sudah
                                terdaftar di sistem. Silahkan hubungi Biro Kesra
                                setda Provinsi Jambi untuk melakukan proses
                                pendaftaran.
                            </Text>
                            <Button
                                fullWidth
                                onClick={() => modals.closeAll()}
                                color="gray"
                            >
                                Tutup
                            </Button>
                        </Stack>
                    ),
                });
            }
        }
    }, [cekStatus, appError, loading]);

    return (
        <AppShell header={{ height: 70 }}>
            {/* --- Header --- */}
            <AppShell.Header
                bg={computedColorScheme === "dark" ? "dark.7" : "white"}
                style={{
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    zIndex: 100,
                }}
            >
                <Container size="lg" h="100%">
                    <Group justify="space-between" h="100%">
                        <Group justify="space-between" h="100%">
                            <Image
                                loading="lazy"
                                radius="md"
                                w={200}
                                fit="contain"
                                src={
                                    computedColorScheme === "dark"
                                        ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                        : "https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                                }
                                fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                            />
                            <Image
                                height={80}
                                src={
                                    computedColorScheme === "dark"
                                        ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                        : "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                }
                                visibleFrom="sm"
                            />
                        </Group>
                        <Group gap="xs">
                            <ActionIcon
                                onClick={toggleColorScheme}
                                variant="subtle"
                                size="lg"
                                color="gray"
                            >
                                {computedColorScheme === "dark" ? (
                                    <IconSun size={20} />
                                ) : (
                                    <IconMoon size={20} />
                                )}
                            </ActionIcon>

                            <Button
                                component={Link}
                                to="/signin"
                                variant="filled"
                                color="blue.7"
                                radius="xl"
                                size="sm"
                                px="xl"
                            >
                                Masuk/Daftar
                            </Button>
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>

            <AppShell.Main
                bg={computedColorScheme === "dark" ? "dark.8" : "gray.0"}
            >
                {/* --- Modern Hero Section --- */}
                <Box
                    style={{
                        background:
                            computedColorScheme === "dark"
                                ? "linear-gradient(135deg, #1A1B1E 0%, #101113 100%)"
                                : "linear-gradient(135deg, #1971c2 0%, #1098ad 100%)",
                        position: "relative",
                        overflow: "hidden",
                        color: "white",
                    }}
                    py={{ base: 60, md: 100 }}
                >
                    {/* Elemen Dekoratif (Blob) */}
                    <Box
                        style={{
                            position: "absolute",
                            top: -50,
                            right: -50,
                            width: 300,
                            height: 300,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.05)",
                            zIndex: 0,
                        }}
                    />

                    <Container
                        size="lg"
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <Stack align="center" ta="center" gap="xl">
                            <Paper
                                px="md"
                                py={5}
                                radius="xl"
                                withBorder
                                bg={
                                    computedColorScheme === "dark"
                                        ? "dark.6"
                                        : "white"
                                }
                            >
                                <Text size="xs" fw={700} c="indigo">
                                    PORTAL RESMI PEMERINTAH PROVINSI JAMBI
                                </Text>
                            </Paper>

                            <Title
                                order={1}
                                size="52px"
                                fw={900}
                                style={{ lineHeight: 1.1 }}
                            >
                                Permohonan Bantuan Hibah <br />
                                {computedColorScheme === "dark" ? (
                                    <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{
                                            from: "indigo",
                                            to: "cyan",
                                            // deg: 90,
                                        }}
                                        inherit
                                    >
                                        Rumah Ibadah/Lembaga Pendidikan
                                        Keagamaan
                                    </Text>
                                ) : (
                                    <Text component="span" inherit>
                                        Rumah Ibadah/Lembaga Pendidikan
                                        Keagamaan
                                    </Text>
                                )}
                            </Title>

                            <Group mt="lg">
                                <Button
                                    size="lg"
                                    radius="xl"
                                    color="white"
                                    c="blue.7"
                                    component={Link}
                                    to="/signin"
                                    rightSection={
                                        <IconChevronRight size={18} />
                                    }
                                >
                                    Ajukan
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    radius="xl"
                                    color="white"
                                    style={{ borderWidth: 2 }}
                                    onClick={scrollToRequirements}
                                >
                                    Cek Persyaratan
                                </Button>
                            </Group>
                        </Stack>
                    </Container>
                </Box>

                {/* --- Key Points Section --- */}
                <Container
                    size="lg"
                    mt={-40}
                    style={{ position: "relative", zIndex: 5 }}
                >
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                        {[
                            {
                                title: "Pendataan Digital",
                                desc: "Sistem pencatatan rumah ibadah yang terstruktur.",
                                icon: IconBuildingMosque,
                                col: "blue",
                            },
                            {
                                title: "Verifikasi Digital",
                                desc: "Proses validasi dokumen persyaratan yang lebih cepat dan transparan secara online.",
                                icon: IconLockAccess,
                                col: "cyan",
                            },
                            {
                                title: "Status Terpadu",
                                desc: "Pantau perkembangan permohonan hibah Anda secara transparan dari tahap pengajuan hingga penyaluran.",
                                icon: IconFileCheck,
                                col: "indigo",
                            },
                        ].map((item, index) => (
                            <Paper
                                key={index}
                                p="xl"
                                radius="md"
                                withBorder
                                shadow="md"
                                bg={
                                    computedColorScheme === "dark"
                                        ? "dark.6"
                                        : "white"
                                }
                            >
                                <ThemeIcon
                                    variant="light"
                                    size={50}
                                    radius="md"
                                    color={item.col}
                                >
                                    <item.icon size={28} />
                                </ThemeIcon>
                                <Text fw={700} mt="md" size="lg">
                                    {item.title}
                                </Text>
                                <Text size="sm" c="dimmed" mt={4}>
                                    {item.desc}
                                </Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>

                {/* --- Check Status Section --- */}
                <Container size="lg" py={80}>
                    <Paper
                        p="xl"
                        radius="lg"
                        withBorder
                        bg={
                            computedColorScheme === "dark" ? "dark.7" : "blue.0"
                        }
                        style={{
                            boxShadow:
                                computedColorScheme === "dark"
                                    ? "none"
                                    : "0 10px 30px rgba(0,0,0,0.05)",
                            border: `1px solid ${computedColorScheme === "dark" ? "#373A40" : "#d0ebff"}`,
                        }}
                    >
                        <form onSubmit={formOnSubmit}>
                            <Stack align="center" gap="md">
                                <Title order={3}>
                                    Cek Database Rumah Ibadah/Lembaga Keagamaan
                                </Title>
                                <Text size="sm" c="dimmed" ta="center">
                                    Silahkan isi ID SIMAS/NSPP/NSM yang akan
                                    menerima bantuan sistem HIBAHKU. <br />
                                    Contoh:
                                    011051001000000(SIMAS)/500015020000(NSM/NSPP)
                                </Text>

                                <Group w="100%" mt="sm">
                                    <TextInput
                                        type="number"
                                        required
                                        placeholder="Hanya angka tanpa titik"
                                        size="lg"
                                        radius="md"
                                        flex={1}
                                        {...form.getInputProps("id")}
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        rightSection={
                                            form.values.id && (
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="gray"
                                                    onClick={() =>
                                                        form.setFieldValue(
                                                            "id",
                                                            "",
                                                        )
                                                    }
                                                >
                                                    <IconX size={16} />
                                                </ActionIcon>
                                            )
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        radius="md"
                                        color="blue.6"
                                        loading={loading}
                                    >
                                        Cek
                                    </Button>
                                </Group>
                                <Text size="xs" c="dimmed" ta="center">
                                    Apabila ID SIMAS/NSPP/NSM tidak ditemukan
                                    pada sistem HIBAHKU, silahkan hubungi Biro
                                    Kesra Setda Provinsi Jambi untuk
                                    mendaftarkan ID SIMAS/NSPP/NSM ke sistem
                                    HIBAHKU.
                                </Text>
                            </Stack>
                        </form>
                    </Paper>
                </Container>

                {/* --- Persyaratan Section --- */}
                <Box
                    id="seksi-persyaratan" // ID untuk target smooth scroll
                    // py={80}
                    bg={computedColorScheme === "dark" ? "dark.9" : "gray.0"}
                >
                    <Container size="lg" py={80}>
                        <Stack align="center" mb={40}>
                            <Title order={2} ta="center">
                                Persyaratan Dokumen
                            </Title>
                            <Divider color="blue.5" size="xl" w={60} />
                        </Stack>

                        <Accordion variant="separated" radius="lg">
                            {/* --- RUMAH IBADAH --- */}
                            <Accordion.Item
                                value="rumahibadah"
                                mt="md"
                                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                            >
                                <Accordion.Control
                                    icon={
                                        <IconBuildingMosque
                                            size={22}
                                            color="#1098ad"
                                        />
                                    }
                                >
                                    <Text fw={700} size="lg">
                                        Rumah Ibadah (Masjid/Musholla)
                                    </Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <List
                                        spacing="xs"
                                        size="sm"
                                        icon={
                                            <ThemeIcon
                                                color="cyan.1"
                                                c="cyan.7"
                                                size={24}
                                                radius="xl"
                                            >
                                                <IconCircleCheck size={16} />
                                            </ThemeIcon>
                                        }
                                    >
                                        <Text c="dimmed" fs="italic" size="sm">
                                            *Pastikan seluruh dokumen yang di
                                            upload dalam format .pdf dan ukuran
                                            maksimal tiap dokumen 500kb
                                        </Text>
                                        <br />
                                        <List.Item>
                                            Surat permohonan bantuan hibah
                                        </List.Item>
                                        <List.Item>Proposal</List.Item>
                                        <List.Item>
                                            SK pengurus Rumah Ibadah terbaru
                                            (Yang masih berlaku)
                                        </List.Item>
                                        <List.Item>
                                            Kartu Tanda Penduduk (KTP) Ketua
                                            Pengurus Rumah Ibadah
                                        </List.Item>
                                        <List.Item>
                                            Surat Keterangan terdaftar ID Rumah
                                            Ibadah di Kementerian Agama RI
                                            (SIMAS)
                                        </List.Item>
                                        <List.Item>
                                            Surat Rekomendasi Kementerian Agama
                                            Kab/Kota & Domisili
                                        </List.Item>
                                        <List.Item>
                                            Surat keterangan domisili dari
                                            Pemerintah setempat
                                        </List.Item>
                                        <List.Item>
                                            Rekening Bank Jambi atas nama Rumah
                                            Ibadah yang masih Aktif
                                        </List.Item>
                                        <List.Item>
                                            Rencana Anggaran Biaya (RAB)
                                        </List.Item>
                                        <List.Item>
                                            Surat Pernyataan Tidak sedang
                                            menerima bantuan hibah sejenis dari
                                            APBD pada tahun anggaran yang sama
                                        </List.Item>
                                        <List.Item>
                                            Surat pernyataan keabsahan dokumen
                                            dari Ketua Pengurus Rumah Ibadah
                                        </List.Item>
                                    </List>
                                </Accordion.Panel>
                            </Accordion.Item>
                            {/* --- LEMBAGA KEAGAMAAN --- */}
                            <Accordion.Item
                                value="pendidikan"
                                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                            >
                                <Accordion.Control
                                    icon={
                                        <IconSchool size={22} color="#1971c2" />
                                    }
                                >
                                    <Text fw={700} size="lg">
                                        Lembaga Pendidikan Keagamaan
                                    </Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <List
                                        spacing="xs"
                                        size="sm"
                                        icon={
                                            <ThemeIcon
                                                color="blue.1"
                                                c="blue.7"
                                                size={24}
                                                radius="xl"
                                            >
                                                <IconCircleCheck size={16} />
                                            </ThemeIcon>
                                        }
                                    >
                                        <Text c="dimmed" fs="italic" size="sm">
                                            *Pastikan seluruh dokumen yang di
                                            upload dalam format .pdf dan ukuran
                                            maksimal tiap dokumen 500kb
                                        </Text>
                                        <br />
                                        <List.Item>
                                            Surat permohonan bantuan hibah
                                        </List.Item>
                                        <List.Item>Proposal</List.Item>
                                        <List.Item>
                                            Akta Notaris Pendirian (Khusus
                                            Yayasan)
                                        </List.Item>
                                        <List.Item>
                                            Pengesahan pendirian badan hukum
                                            dari Kementerian Hukum RI
                                        </List.Item>
                                        <List.Item>
                                            SK Pengurus Yayasan/Lembaga yang
                                            terbaru (Masih Berlaku)
                                        </List.Item>
                                        <List.Item>
                                            KTP Ketua Pengurus Yayasan/Lembaga
                                        </List.Item>
                                        <List.Item>
                                            NPWP Yayasan/Lembaga
                                        </List.Item>
                                        <List.Item>
                                            NSPP/NSM dari Kementerian Agama RI
                                        </List.Item>
                                        <List.Item>
                                            Surat Rekomendasi dari Kementerian
                                            Agama Kab/Kota & Domisili
                                        </List.Item>
                                        <List.Item>
                                            Izin Operasional aktif dari Kemenag
                                            RI
                                        </List.Item>
                                        <List.Item>
                                            Surat keterangan domisili dari
                                            Pemerintah setempat
                                        </List.Item>
                                        <List.Item>
                                            Rekening Bank Jambi atas nama
                                            Yayasan/Lembaga yang masih Aktif
                                        </List.Item>
                                        <List.Item>
                                            Rencana Anggaran Biaya (RAB)
                                        </List.Item>
                                        <List.Item>
                                            Surat Pernyataan Tidak sedang
                                            menerima bantuan hibah sejenis dari
                                            APBD pada tahun anggaran yang sama
                                        </List.Item>
                                        <List.Item>
                                            Surat pernyataan keabsahan dokumen
                                            dari Ketua Pengurus Yayasan/Lembaga
                                        </List.Item>
                                    </List>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </Box>

                {/* --- Footer --- */}
                <Box
                    py={50}
                    bg={computedColorScheme === "dark" ? "dark.9" : "blue.9"}
                    c="white"
                >
                    <Container size="lg">
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <Stack gap="xs">
                                <Group>
                                    <Image
                                        loading="lazy"
                                        radius="md"
                                        w={200}
                                        fit="contain"
                                        src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                        fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                                    />
                                    <Image
                                        height={80}
                                        src={
                                            computedColorScheme === "dark"
                                                ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                                : "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                        }
                                        visibleFrom="sm"
                                    />
                                </Group>
                            </Stack>
                            <Stack
                                align={{ base: "flex-start", sm: "flex-end" }}
                                justify="center"
                            >
                                <Text size="sm" fw={500}>
                                    Biro Kesra Setda Provinsi Jambi
                                </Text>
                                <Text size="xs" style={{ opacity: 0.6 }}>
                                    © 2026. Diskominfo Prov Jambi. All Rights
                                    Reserved.
                                </Text>
                            </Stack>
                        </SimpleGrid>
                    </Container>
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
