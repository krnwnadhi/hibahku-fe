import {
    ActionIcon,
    Alert,
    Anchor,
    Avatar,
    Button,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { getAllPersetujuanAction } from "../../../redux/slices/persetujuan/persetujuanSlices";
import { getPeriode } from "../../../redux/slices/periode/periodeSlices";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useForm } from "@mantine/form";

export default function UserPage() {
    const dispatch = useDispatch();
    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading: loadRumahIbadah, cekStatus, appError } = rumahIbadah;
    const [opened, { open, close }] = useDisclosure(false);
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user ?? {};

    const { persetujuanList, loading } = useSelector(
        (state) => state?.persetujuan,
    );

    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });

    const persetujuanId =
        filteredResult?.length > 0 ? parseInt(filteredResult[0]?.id) : "";

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const UserInfo = () => {
        return (
            <Paper
                withBorder
                radius="md"
                shadow="sm"
                p="xl"
                mt="xl"
                style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    width: "100%",
                    borderBottom: `2px solid var(--mantine-color-blue-6)`,
                }}
            >
                <Avatar
                    size={50}
                    radius={120}
                    mx="auto"
                    key={user?.nama}
                    src={`https://ui-avatars.com/api/?name=${user?.nama}&background=random`}
                    color="initials"
                    alt="Admin"
                />
                <Text ta="center" fz="md" fw={700} mt="md">
                    SELAMAT DATANG, {user?.nama}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.nik}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.notelpon}
                </Text>
            </Paper>
        );
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

    // useEffect(() => {
    //     loadRumahIbadah ? nprogress.start() : nprogress.complete();
    //     return () => nprogress.reset();
    // }, [loadRumahIbadah]);

    useEffect(() => {
        if (loadRumahIbadah || (!cekStatus && !appError)) return;

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
                            <Text ta="center" size="xs">
                                ID SIMAS/NSM/NSPP anda telah terdaftar di
                                database HIBAHKU. Permohonan Hibah Anda{" "}
                                <b>DAPAT DILANJUTKAN</b>.
                            </Text>
                            <Text ta="center" size="xs">
                                Silahkan Klik link dibawah untuk melanjutkan
                                permohonan/Upload Berkas.
                            </Text>
                            <Anchor
                                href="/dashboard/user/dokumen"
                                underline="never"
                                ta="center"
                            >
                                KLIK DISINI
                            </Anchor>
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
                            <Text size="xs">
                                Pastikan ID SIMAS/NSPP/NSM benar atau sudah
                                terdaftar di sistem.
                            </Text>
                            <Text size="xs">
                                Silahkan klik link dibawah untuk mendaftarkan
                                Rumah Ibadah/Lembaga Pendidikan Keagamaan ke
                                dalam sistem database HIBAHKU.
                            </Text>
                            <Anchor
                                href="/dashboard/rumah-ibadah/user/create"
                                underline="never"
                                ta="center"
                            >
                                KLIK DISINI
                            </Anchor>
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
        <>
            <Container size="md">
                <UserInfo />

                {/* --- Check Status Section --- */}
                <Container size="md" py="xl">
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
                            border: `2px solid ${computedColorScheme === "dark" ? "#373A40" : "#d0ebff"}`,
                        }}
                    >
                        <form onSubmit={formOnSubmit}>
                            <Stack align="center" gap="md">
                                <Title order={4} ta="center">
                                    Cek Database Rumah Ibadah/Lembaga Keagamaan
                                </Title>
                                <Text size="xs" c="dimmed" ta="center">
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
                                        size="md"
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
                                        size="md"
                                        radius="md"
                                        color="blue.6"
                                        loading={loadRumahIbadah}
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
            </Container>
        </>
    );
}
