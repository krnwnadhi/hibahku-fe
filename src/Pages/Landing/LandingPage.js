import {
    Accordion,
    ActionIcon,
    AppShell,
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Group,
    List,
    Paper,
    SimpleGrid,
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

import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import { useState } from "react";

export default function LandingPage() {
    const { setColorScheme } = useMantineColorScheme();
    const [searchQuery, setSearchQuery] = useState("");
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
    };

    const handleCheckStatus = () => {
        // 1. Validasi awal: jika kosong, jangan lakukan apa-apa
        if (!searchQuery.trim()) return;

        const query = searchQuery.trim().toUpperCase();

        // 2. Logika Pengecekan: Pisahkan antara Error dan Sukses secara tegas
        if (query === "HB-ERROR") {
            // TAMPILAN MODAL ERROR
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
                            Maaf, nomor registrasi <b>{query}</b> tidak
                            terdaftar di sistem HIBAHKU. Pastikan kode yang Anda
                            masukkan sudah benar.
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
        } else {
            // TAMPILAN MODAL SUKSES (DATA DITEMUKAN)
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
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    color="blue.6"
                                >
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
        }
    };

    // Fungsi untuk smooth scroll ke bagian persyaratan
    const scrollToRequirements = () => {
        const element = document.getElementById("seksi-persyaratan");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const loginUrl = "http://localhost:3010/signin";

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
                        <Title order={3} fw={900} c="blue.7">
                            HIBAH
                            <Text
                                span
                                c={
                                    computedColorScheme === "dark"
                                        ? "white"
                                        : "dark"
                                }
                            >
                                KU
                            </Text>
                        </Title>

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
                                to={loginUrl}
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

                            {/* <Text
                                size="lg"
                                c={
                                    computedColorScheme === "dark"
                                        ? "dimmed"
                                        : "white"
                                }
                                fw={400}
                                maw={700}
                            >
                                Mewujudkan tata kelola bantuan hibah yang
                                transparan, akuntabel, dan tepat sasaran melalui
                                digitalisasi. <br />
                            </Text> */}

                            <Group mt="lg">
                                <Button
                                    size="lg"
                                    radius="xl"
                                    color="white"
                                    c="blue.7"
                                    component="a"
                                    href={loginUrl}
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
                <Container size="lg" pt={80}>
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
                        <Stack align="center" gap="md">
                            <Title order={3}>Cek Status Pengajuan</Title>
                            <Text size="sm" c="dimmed" ta="center">
                                Masukkan nomor registrasi untuk melihat tahap
                                bantuan Anda.
                            </Text>

                            <Group w="100%" mt="sm">
                                <TextInput
                                    placeholder="Contoh: HB-2026-XXXX"
                                    size="lg"
                                    radius="md"
                                    flex={1}
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(
                                            event.currentTarget.value,
                                        )
                                    }
                                    rightSection={
                                        searchQuery && (
                                            <ActionIcon
                                                variant="subtle"
                                                color="gray"
                                                onClick={() =>
                                                    setSearchQuery("")
                                                }
                                            >
                                                <IconX size={16} />
                                            </ActionIcon>
                                        )
                                    }
                                />
                                <Button
                                    size="lg"
                                    radius="md"
                                    color="blue.6"
                                    onClick={handleCheckStatus}
                                    disabled={!searchQuery}
                                >
                                    Cek Sekarang
                                </Button>
                            </Group>
                            <Text size="xs" c="dimmed">
                                Gunakan kode <b>HB-ERROR</b> untuk melihat
                                tampilan data tidak ditemukan.
                            </Text>
                        </Stack>
                    </Paper>
                </Container>

                {/* --- Persyaratan Section --- */}
                <Box
                    id="seksi-persyaratan" // ID untuk target smooth scroll
                    py={80}
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
                                <Title order={4}>HIBAHKU JAMBI</Title>
                                <Text
                                    size="sm"
                                    style={{ opacity: 0.7 }}
                                    maw={400}
                                >
                                    Sistem informasi pengelolaan hibah rumah
                                    ibadah Pemerintah Provinsi Jambi. Mendukung
                                    transparansi data demi pembangunan
                                    masyarakat yang religius.
                                </Text>
                            </Stack>
                            <Stack
                                align={{ base: "flex-start", sm: "flex-end" }}
                                justify="center"
                            >
                                <Text size="sm" fw={500}>
                                    Biro Kesra Setda Provinsi Jambi
                                </Text>
                                <Text size="xs" style={{ opacity: 0.6 }}>
                                    © 2026. All Rights Reserved.
                                </Text>
                            </Stack>
                        </SimpleGrid>
                    </Container>
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
