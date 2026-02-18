import {
    Anchor,
    Avatar,
    Breadcrumbs,
    Button,
    Center,
    Container,
    Group,
    Image,
    Loader,
    Modal,
    Paper,
    ScrollArea,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IconCaretUpDown } from "@tabler/icons-react";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import dayjs from "dayjs";
import { getAllPersetujuanAction } from "../../../redux/slices/persetujuan/persetujuanSlices";
import { getPeriode } from "../../../redux/slices/periode/periodeSlices";
import { nprogress } from "@mantine/nprogress";
import { useToggle } from "@mantine/hooks";

export default function UserPage() {
    const dispatch = useDispatch();
    const [type, toggle] = useToggle(["masjid", "lembaga"]);

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [show, setShow] = useState(false);

    const [value, setValue] = useState("home");

    const exceptThisSymbols = ["e", "E", "+", "-", ".", ","];

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    // const persetujuan = useSelector((state) => state?.persetujuan);
    // const { persetujuanList } = persetujuan;

    const user = useSelector((state) => state?.auth?.userAuth);
    // const { nik } = user;

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading, cekStatus, appError } = rumahIbadah;

    // const filteredResult = persetujuanList?.result?.filter((item) => {
    //     return nik === item?.userid;
    // });

    // const persetujuanId =
    //     filteredResult?.length > 0 ? filteredResult[0].id : null;

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    const periode = useSelector((state) => state?.periode);

    const { loading: loadingPeriode } = periode;

    const mulaiPeriode = periode?.getPeriode?.map((x) => x.mulai);
    const mulaiPeriodeFormat = dayjs(mulaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const selesaiPeriode = periode?.getPeriode?.map((x) => x.selesai);
    const selesaiPeriodeFormat = dayjs(selesaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            id: "",
        },

        validate: {
            id: hasLength(
                { min: 12, max: 15 },
                "Min. 12 Angka & Maks. 15 Angka",
            ),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(cekStatusRumahIbadahAction(values));
        form.clearErrors();
    });

    const items = [{ title: "Beranda", href: "/dashboard" }].map(
        (item, index) => (
            <Anchor href={item.href} key={index} size="sm" truncate="end">
                {item.title}
            </Anchor>
        ),
    );

    // const dataSegmentedControl = [
    //     {
    //         value: "home",
    //         label: (
    //             <Link
    //                 to={"/dashboard/user/beranda"}
    //                 style={{
    //                     textDecoration: "none",
    //                     color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
    //                 }}
    //             >
    //                 <Text>Beranda</Text>
    //             </Link>
    //         ),
    //     },
    //     {
    //         value: "progres",
    //         label: (
    //             <Link
    //                 to={`/dashboard/user/progres/${persetujuanId}`}
    //                 style={{
    //                     textDecoration: "none",
    //                     color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
    //                 }}
    //             >
    //                 <Text>Progres</Text>
    //             </Link>
    //         ),
    //     },
    // ];

    const hibahkuSuccessModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
            />

            <Space h="md" />

            <Title ta="center" order={4}>
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="md" />

            <Text ta="center" c="green" inherit>
                SELAMAT
            </Text>
            <Text ta="center">Permohonan Anda DAPAT DILANJUTKAN</Text>

            <Space h="md" />

            <Text ta="center">
                Selanjutnya silahkan klik link dokumen berikut:{" "}
                <Anchor href="/dashboard/user/dokumen">
                    <Text c="blue" fs="italic">
                        "DOKUMEN"
                    </Text>{" "}
                </Anchor>
                untuk melengkapi dan meng-
                <Text span fs="italic">
                    upload
                </Text>{" "}
                dokumen administrasi persyaratan.
            </Text>

            <Space h="xl" />

            <Text ta="center">Terima Kasih</Text>
        </>
    );

    const hibahkuFailedModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
                fallbackSrc="https://placehold.co/800?text=Logo+Jambi&font=roboto"
            />

            <Space h="md" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="md" />

            <Text ta="center" c="red" fw={700}>
                MAAF
            </Text>
            <Text ta="center">
                Permohonan Anda{" "}
                <Text span c="red" fw={700}>
                    {" "}
                    TIDAK DAPAT DILANJUTKAN{" "}
                </Text>
                karena:
            </Text>

            <Space h="sm" />

            <Text ta="center">
                1. Periodesasi pengusulan permohonan bantuan hibah tahun ini{" "}
                <Text span c="red" fw={700}>
                    TELAH DITUTUP.
                </Text>
            </Text>
            <Text ta="center">
                2. ID Rumah Ibadah/Nomor Statistik Lembaga Pendidikan Keagamaan
                yang anda usulkan{" "}
                <Text span c="red" fw={700}>
                    TELAH MENERIMA
                </Text>{" "}
                bantuan hibah serupa pada tahun sebelumnya.
            </Text>

            <Space h="md" />

            <Text ta="center">{appError && appError}</Text>

            {/* <Space h="md" /> */}

            <Text ta="center">Terima Kasih</Text>

            <Space h="md" />

            <Button onClick={handleClose} fullWidth>
                Saya Mengerti
            </Button>
        </>
    );

    const hibahkuNotFoundModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
                fallbackSrc="https://placehold.co/800?text=Logo+Jambi&font=roboto"
            />

            <Space h="md" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="sm" />

            <Text ta="center" c="red" inherit fw={700}>
                MAAF
            </Text>

            <Text ta="center">
                <Text c="red" inherit fw={700}>
                    DATA TIDAK DITEMUKAN!
                </Text>{" "}
                <Space h="sm" />
                Silahkan cek kembali ID SIMAS/NSPP/NSM yang ingin menerima
                bantuan HIBAH & Harap mendaftarkan Rumah Ibadah / Lembaga
                Pendidikan Keagamaan terlebih dahulu.
            </Text>

            <Space h="md" />

            <Space h="md" />

            <Text ta="center">Terima Kasih</Text>

            <Space h="md" />

            <Button onClick={handleClose} fullWidth>
                Saya Mengerti
            </Button>
        </>
    );

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const UserInfo = () => {
        return (
            <Paper
                radius="md"
                shadow="md"
                withBorder
                p="lg"
                style={{
                    backgroundColor:
                        "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
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
                    Selamat Datang, {user?.nama}
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

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Stack gap="md">
                    <UserInfo />

                    {/* <Group grow>
                        <Paper
                            radius="md"
                            shadow="sm"
                            p="lg"
                            withBorder
                            style={{
                                backgroundColor:
                                    "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                            }}
                        >
                            <Text ta="center" fz="md" fw={700}>
                                TUTUP PERIODE
                            </Text>
                            {loadingPeriode ? (
                                <Center>
                                    <Loader size="xs" />
                                </Center>
                            ) : (
                                <Text ta="center" c="red" fz="sm">
                                    {mulaiPeriodeFormat
                                        ? mulaiPeriodeFormat
                                        : "Tidak Ada Data"}
                                </Text>
                            )}
                        </Paper>
                        <Paper
                            radius="md"
                            shadow="sm"
                            p="lg"
                            withBorder
                            style={{
                                backgroundColor:
                                    "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                            }}
                        >
                            <Text ta="center" fz="md" fw={700}>
                                BUKA KEMBALI
                            </Text>
                            {loadingPeriode ? (
                                <Center>
                                    <Loader size="xs" />
                                </Center>
                            ) : (
                                <Text ta="center" c="green" fz="sm">
                                    {selesaiPeriodeFormat
                                        ? selesaiPeriodeFormat
                                        : "Tidak Ada Data"}
                                </Text>
                            )}
                        </Paper>
                    </Group> */}

                    <form onSubmit={formOnSubmit}>
                        <Paper
                            radius="md"
                            p="xl"
                            withBorder
                            shadow="md"
                            style={{
                                backgroundColor:
                                    "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                            }}
                        >
                            <Text ta="center" c="dimmed" size="xs">
                                Silahkan mengisi data ID SIMAS/NSPP/NSM yang
                                akan menerima bantuan HIBAH dibawah ini terlebih
                                dahulu:
                            </Text>

                            <Space h="md" />

                            <Button
                                onClick={() => toggle()}
                                variant="light"
                                radius="lg"
                                fullWidth
                                rightSection={<IconCaretUpDown size={14} />}
                            >
                                {type === "lembaga"
                                    ? "LEMBAGA KEAGAMAAN"
                                    : "RUMAH IBADAH"}
                            </Button>

                            <Stack gap="xs">
                                {type === "masjid" && (
                                    <TextInput
                                        mt={15}
                                        type="number"
                                        label="ID Rumah Ibadah"
                                        description="ID SIMAS Min. 15 angka & Tanpa TITIK"
                                        placeholder="Contoh: 011051001000000"
                                        value={form.values.id}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "id",
                                                event.currentTarget.value,
                                            )
                                        }
                                        error={
                                            form.errors.id &&
                                            "ID SIMAS wajib terdiri dari 15 Angka & Tanpa TITIK"
                                        }
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        radius="md"
                                        disabled={loading}
                                    />
                                )}

                                {type === "lembaga" && (
                                    <TextInput
                                        mt={15}
                                        type="number"
                                        label="No. NSPP/NSM"
                                        description="No. NSPP/NSM Min. 12 angka "
                                        placeholder="Contoh : 500015020000"
                                        value={form.values.id}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "id",
                                                event.currentTarget.value,
                                            )
                                        }
                                        error={
                                            form.errors.id &&
                                            "No. NSPP/NSM Min. 12 Angka"
                                        }
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        radius="md"
                                        disabled={loading}
                                    />
                                )}
                            </Stack>

                            <Button
                                type="submit"
                                variant="subtle"
                                fullWidth
                                radius="md"
                                mt="md"
                                loading={loading}
                                onClick={handleShow}
                                disabled={!form.isValid()}
                            >
                                Cek Status
                            </Button>
                        </Paper>
                    </form>
                </Stack>

                {/* MODAL */}
                <Modal
                    opened={show}
                    closeOnEscape={false}
                    closeOnClickOutside={false}
                    withCloseButton={false}
                    centered
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    yOffset="15vh"
                    xOffset={0}
                    scrollAreaComponent={ScrollArea.Autosize}
                >
                    {appError
                        ? hibahkuFailedModalNotification
                        : cekStatus?.isUpload === true
                          ? hibahkuSuccessModalNotification
                          : hibahkuNotFoundModalNotification}
                </Modal>

                {/* <Center>
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        classNames={classes}
                        value={value}
                        onChange={setValue}
                        data={dataSegmentedControl}
                    />
                </Center> */}
            </Container>
        </>
    );
}
