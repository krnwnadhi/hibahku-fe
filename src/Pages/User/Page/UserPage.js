import {
    Anchor,
    Avatar,
    BackgroundImage,
    Blockquote,
    Button,
    Center,
    Container,
    Group,
    Image,
    LoadingOverlay,
    Modal,
    Paper,
    ScrollArea,
    SegmentedControl,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkButton from "../components/DarkButton/DarkButton";
import { IconInfoCircle } from "@tabler/icons-react";
import MenuMantine from "../../../components/Menu/MenuMantine";
import UserInfo from "../components/UserInfo/UserInfo";
import backgroundSvg from "../../../assets/circle-scatter-haikei2.svg";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import classes from "./UserPage.module.css";
import { getAllPersetujuanAction } from "../../../redux/slices/persetujuan/persetujuanSlices";

export default function UserPage() {
    const dispatch = useDispatch();
    const focusTrapRef = useFocusTrap();

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState(false);

    const [value, setValue] = useState("home");

    const navigate = useNavigate();
    const { tabValue } = useParams();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { persetujuanList } = persetujuan;

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user;
    // console.log(nik);

    // const userId = persetujuanList?.result?.map((item) => item?.userid);
    // console.log(userId);

    // const idPersetujuan = persetujuanList?.result?.map((item) =>
    //     userId === nik ? item?.id : null
    // );
    // console.log(idPersetujuan);

    // const id = nik === userId ? "Ya" : "Tidak";
    // console.log(id);

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading, cekStatus, appError } = rumahIbadah;

    //
    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });
    console.log(filteredResult);

    const persetujuanId =
        filteredResult?.length > 0 ? filteredResult[0].id : null;
    console.log(persetujuanId);

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            id: "",
        },

        validate: {
            id: hasLength({ min: 10, max: 20 }, "ID SIMAS berupa angka yang"),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        // console.log(values);
        dispatch(cekStatusRumahIbadahAction(values));
        // form.reset()
        form.clearErrors();
    });

    const dataSegmentedControl = [
        {
            value: "home",
            label: (
                <Link
                    to={"/dashboard/user/beranda"}
                    style={{
                        textDecoration: "none",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                    }}
                >
                    <Text>Beranda</Text>
                </Link>
            ),
        },
        {
            value: "progres",
            label: (
                <Link
                    to={`/dashboard/user/progres/${persetujuanId}`}
                    style={{
                        textDecoration: "none",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                    }}
                >
                    <Text>Progres</Text>
                </Link>
            ),
        },
    ];

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

            <Space h="md" />

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
                Silahkan cek kembali ID SIMAS/NSPP yang ingin menerima bantuan
                HIBAH & Harap mendaftarkan Rumah Ibadah / Lembaga Pendidikan
                Keagamaan terlebih dahulu.
            </Text>

            <Space h="md" />

            <Text ta="center">
                Klik link dibawah ini untuk mendaftarkan Rumah Ibadah / Lembaga
                Pendidikan Keagamaan{" "}
            </Text>

            <Text ta="center" fs="italic">
                <Anchor href="/dashboard/rumah-ibadah/user/create">
                    "KLIK DISINI"
                </Anchor>
            </Text>

            <Space h="md" />

            <Text ta="center">Terima Kasih</Text>

            <Space h="md" />

            <Button onClick={handleClose} fullWidth>
                Saya Mengerti
            </Button>
        </>
    );

    return (
        <>
            <BackgroundImage h="100vh" src={backgroundSvg} radius="md">
                <Container size="xs" mt={-15} mb={-65}>
                    <Paper
                        bg={
                            computedColorScheme === "dark"
                                ? "var(--mantine-color-gray-9)"
                                : "var(--mantine-color-blueGray-light)"
                        }
                        p="md"
                        withBorder
                    >
                        <Group justify="space-between" gap="xl">
                            {computedColorScheme === "light" ? (
                                <Image
                                    loading="lazy"
                                    radius="md"
                                    w={200}
                                    fit="contain"
                                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                                    fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                                />
                            ) : (
                                <Image
                                    loading="lazy"
                                    radius="md"
                                    w={200}
                                    fit="contain"
                                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                    fallbackSrc="https://placehold.co/500x100/1A1B1E/FFFFFF/png?text=HIBAHKU+LOGO"
                                />
                            )}
                            <Group gap="xs">
                                <DarkButton />
                                <MenuMantine />
                            </Group>
                        </Group>
                    </Paper>

                    <Paper
                        bg="var(--mantine-color-blueGray-light)"
                        p="xl"
                        withBorder
                    >
                        <UserInfo />

                        <Space h="md" />

                        <form onSubmit={formOnSubmit}>
                            <Paper
                                radius="md"
                                p="xl"
                                bg="var(--mantine-color-body)"
                                withBorder
                                shadow="md"
                            >
                                <Text ta="center" c="dimmed" size="xs">
                                    Silahkan mengisi data ID SIMAS/NSPP yang
                                    akan menerima bantuan HIBAH dibawah ini
                                    terlebih dahulu:
                                </Text>

                                <Space h="md" />

                                <Stack>
                                    <TextInput
                                        ref={focusTrapRef}
                                        type="number"
                                        label="ID/NSPP"
                                        description="ID SIMAS/No. NSPP Lembaga Pendidikan Keagamaan"
                                        placeholder="ID/NSPP Min. 10 angka"
                                        value={form.values.id}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "id",
                                                event.currentTarget.value
                                            )
                                        }
                                        error={
                                            form.errors.id && "Min. 10 Karakter"
                                        }
                                        radius="md"
                                        disabled={loading}
                                    />
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

                        <Space h="md" />

                        <Paper
                            radius="md"
                            p="xl"
                            bg="var(--mantine-color-body)"
                            withBorder
                        >
                            <Blockquote
                                color="blue"
                                cite="– Admin"
                                icon={<IconInfoCircle />}
                                // mt="xl"
                            >
                                <Text fs="italic" size="sm">
                                    Contoh File/Dokumen dapat anda download pada
                                    link berikut:
                                    <Anchor
                                        href="https://www.google.com/"
                                        target="_blank"
                                    >
                                        <Text c="blue" fs="italic">
                                            "CONTOH DOKUMEN"
                                        </Text>
                                    </Anchor>
                                </Text>
                            </Blockquote>
                        </Paper>
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
                            {/* <Group mt="xl"> */}
                            {/* <Button mt="xl" fullWidth onClick={handleClose}>
                            Saya Mengerti
                        </Button> */}
                            {/* </Group> */}
                        </Modal>
                    </Paper>

                    <Center>
                        <SegmentedControl
                            radius="xl"
                            size="md"
                            classNames={classes}
                            value={value}
                            onChange={setValue}
                            data={dataSegmentedControl}
                        />
                    </Center>
                </Container>
            </BackgroundImage>
        </>
    );
}
