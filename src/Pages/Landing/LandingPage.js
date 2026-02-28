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
    rem,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconBuildingMosque,
    IconChevronRight,
    IconCircleCheck,
    IconClock,
    IconCloudUpload,
    IconFileCheck,
    IconFileText,
    IconLockAccess,
    IconMoon,
    IconSchool,
    IconSettingsCheck,
    IconShieldCheck,
    IconSun,
    IconTruckDelivery,
    IconUserPlus,
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
                                title: "Transparansi Publik",
                                desc: "Pantau setiap tahap pengajuan secara terbuka dan akuntabel.",
                                icon: IconShieldCheck,
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
                                style={{
                                    borderBottom: `4px solid var(--mantine-color-${item.col}-6)`,
                                }}
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

                {/* --- Prosedur Section --- */}
                <Container size="lg" py={40}>
                    <Box mt={60}>
                        <Stack gap="xs" mb={40} align="center">
                            <Badge
                                variant="filled"
                                color="blue.1"
                                c="blue.7"
                                radius="sm"
                            >
                                PROSEDUR
                            </Badge>
                            <Title order={2} ta="center" fw={800}>
                                Tahapan Pengajuan HIBAHKU
                            </Title>
                            <Divider color="blue.5" size="xl" w={60} />
                        </Stack>

                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 4 }}
                            spacing="xl"
                        >
                            {[
                                {
                                    step: "01",
                                    title: "Registrasi Akun",
                                    desc: "Daftarkan Akun Anda sebagai Ketua Pengurus menggunakan NIK.",
                                    icon: <IconUserPlus size={24} />,
                                    color: "blue",
                                },
                                {
                                    step: "02",
                                    title: "Unggah Berkas",
                                    desc: "Isi formulir dan unggah dokumen persyaratan dalam format PDF.",
                                    icon: <IconCloudUpload size={24} />,
                                    color: "cyan",
                                },
                                {
                                    step: "03",
                                    title: "Verifikasi Data",
                                    desc: "Tim HIBAHKU melakukan validasi dokumen dan survei lapangan jika diperlukan.",
                                    icon: <IconSettingsCheck size={24} />,
                                    color: "indigo",
                                },
                                {
                                    step: "04",
                                    title: "Pencairan Dana",
                                    desc: "Dana hibah disalurkan langsung ke rekening lembaga setelah SK terbit.",
                                    icon: <IconCircleCheck size={24} />,
                                    color: "green",
                                },
                            ].map((item, index) => (
                                <Paper
                                    key={index}
                                    p="xl"
                                    radius="lg"
                                    withBorder
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        transition: "transform 0.2s ease",
                                        borderBottom: `4px solid var(--mantine-color-${item.color}-6)`,
                                    }}
                                >
                                    {/* Nomor Langkah sebagai Background */}
                                    <Text
                                        style={{
                                            position: "absolute",
                                            right: -10,
                                            top: -5,
                                            fontSize: rem(80),
                                            fontWeight: 900,
                                            opacity: 0.05,
                                            userSelect: "none",
                                        }}
                                    >
                                        {item.step}
                                    </Text>

                                    <ThemeIcon
                                        variant="light"
                                        size={48}
                                        radius="md"
                                        color={item.color}
                                        mb="lg"
                                    >
                                        {item.icon}
                                    </ThemeIcon>

                                    <Text fw={700} mb="xs" size="lg">
                                        {item.title}
                                    </Text>
                                    <Text size="sm" c="dimmed" lh={1.6}>
                                        {item.desc}
                                    </Text>
                                </Paper>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Container>

                {/* --- Persyaratan Section --- */}
                <Box
                    id="seksi-persyaratan" // ID untuk target smooth scroll
                    // py={80}
                    bg={computedColorScheme === "dark" ? "dark.9" : "gray.0"}
                >
                    <Container size="lg" py={80}>
                        <Stack align="center" mb={40}>
                            <Badge
                                variant="filled"
                                color="blue.1"
                                c="blue.7"
                                radius="sm"
                            >
                                Syarat
                            </Badge>
                            <Title order={2} ta="center" fw={800}>
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
                                <Title order={3} ta="center">
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

                {/* --- SECTION: STATUS & ALUR PROSES DETAIL --- */}
                {/* <Container size="lg" py={20}>
                    <Box
                        mt={80}
                        py={60}
                        style={{
                            borderTop: `1px solid ${computedColorScheme === "dark" ? "#373A40" : "#f1f3f5"}`,
                        }}
                    >
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
                            <Stack gap="xl">
                                <Box>
                                    <Badge variant="light" color="blue" mb="xs">
                                        INFORMASI
                                    </Badge>
                                    <Title order={3} fw={800}>
                                        Status Pengajuan
                                    </Title>
                                    <Text c="dimmed" size="sm">
                                        Memahami indikator status pada akun Anda
                                    </Text>
                                </Box>

                                <Stack gap="md">
                                    {[
                                        {
                                            label: "DISETUJUI",
                                            color: "green",
                                            desc: "Permohonan memenuhi syarat dan lanjut ke tahap penganggaran/pencairan.",
                                        },
                                        {
                                            label: "DITOLAK",
                                            color: "red",
                                            desc: "Permohonan tidak memenuhi kriteria atau dokumen tidak valid.",
                                        },
                                        {
                                            label: "BELUM DIPROSES",
                                            color: "gray",
                                            desc: "Permohonan telah diterima dan sedang dalam antrean verifikasi.",
                                        },
                                    ].map((status, i) => (
                                        <Paper
                                            key={i}
                                            p="md"
                                            radius="md"
                                            withBorder
                                            shadow="xs"
                                        >
                                            <Group wrap="nowrap">
                                                <ThemeIcon
                                                    color={status.color}
                                                    variant="light"
                                                    size="xl"
                                                >
                                                    <IconCircleCheck
                                                        size={20}
                                                    />
                                                </ThemeIcon>
                                                <Box>
                                                    <Text
                                                        fw={700}
                                                        size="sm"
                                                        c={status.color}
                                                    >
                                                        {status.label}
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        {status.desc}
                                                    </Text>
                                                </Box>
                                            </Group>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Stack>

                            <Stack gap="xl">
                                <Box>
                                    <Badge
                                        variant="light"
                                        color="indigo"
                                        mb="xs"
                                    >
                                        ALUR KERJA
                                    </Badge>
                                    <Title order={3} fw={800}>
                                        Tahapan Proses Internal
                                    </Title>
                                    <Text c="dimmed" size="sm">
                                        Rangkaian verifikasi hingga dana
                                        diterima
                                    </Text>
                                </Box>

                                <Paper
                                    withBorder
                                    p="xl"
                                    radius="lg"
                                    shadow="md"
                                >
                                    <Timeline
                                        active={-1}
                                        bulletSize={26}
                                        lineWidth={2}
                                    >
                                        {[
                                            {
                                                t: "Verifikasi Administrasi",
                                                d: "Pemeriksaan dokumen digital persyaratan.",
                                            },
                                            {
                                                t: "Verifikasi Faktual",
                                                d: "Survei lapangan oleh tim teknis ke lokasi.",
                                            },
                                            {
                                                t: "Rekomendasi",
                                                d: "Pemberian catatan kelayakan instansi.",
                                            },
                                            {
                                                t: "Pertimbangan TAPD",
                                                d: "Pembahasan anggaran oleh tim daerah.",
                                            },
                                            {
                                                t: "Penganggaran",
                                                d: "Alokasi dana ke dalam DPA Biro Kesra.",
                                            },
                                            {
                                                t: "Penerbitan SK",
                                                d: "Penerbitan SK Gubernur & dokumen lainnya.",
                                            },
                                            {
                                                t: "Penandatanganan NPHD",
                                                d: "NPHD, Pakta Integritas, & Pertanggungjawaban.",
                                            },
                                            {
                                                t: "Pencairan Dana",
                                                d: "Transfer dana hibah ke rekening lembaga.",
                                            },
                                            {
                                                t: "Laporan Pertanggungjawaban",
                                                d: "Kewajiban pelaporan penggunaan dana (LPJ).",
                                            },
                                        ].map((item, i) => (
                                            <Timeline.Item
                                                key={i}
                                                bullet={
                                                    <Text size="xs" fw={700}>
                                                        {i + 1}
                                                    </Text>
                                                }
                                                title={
                                                    <Text fw={700} size="sm">
                                                        {item.t}
                                                    </Text>
                                                }
                                            >
                                                <Text size="xs" c="dimmed">
                                                    {item.d}
                                                </Text>
                                            </Timeline.Item>
                                        ))}
                                    </Timeline>
                                </Paper>
                            </Stack>
                        </SimpleGrid>
                    </Box>
                </Container> */}

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
