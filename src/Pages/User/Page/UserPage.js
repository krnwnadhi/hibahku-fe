import {
    Anchor,
    Avatar,
    Blockquote,
    Button,
    Center,
    Container,
    Group,
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

import DarkButton from "../components/DarkButton/DarkButton";
import { IconInfoCircle } from "@tabler/icons-react";
import MenuMantine from "../../../components/Menu/MenuMantine";
import UserInfo from "../components/UserInfo/UserInfo";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import classes from "./UserPage.module.css";
import { useState } from "react";

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

    // useEffect(() => {
    //     dispatch(getAllUsersAction());
    // }, [dispatch]);

    // const user = useSelector((state) => state?.auth?.userAuth);
    // const { nama } = user;

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { loading, cekStatus, appError } = rumahIbadah;
    // const { message, isUpload } = cekStatus;

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
            value: "status",
            label: (
                <Link
                    to={"/dashboard/user/status"}
                    style={{
                        textDecoration: "none",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                    }}
                >
                    <Text>Status</Text>
                </Link>
            ),
        },
    ];

    const hibahkuSuccessModalNotification = (
        <>
            <Avatar
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png`}
                size={60}
                radius={120}
                mx="auto"
            />

            <Space h="xl" />

            <Title ta="center" order={4}>
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="xl" />

            <Text ta="center" c="green" inherit>
                SELAMAT
            </Text>
            <Text ta="center">Permohonan Anda DAPAT DILANJUTKAN</Text>

            <Space h="xl" />

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

            <Space h="xl" />

            {/* <Button component={Link} to="/dashboard/user/dokumen" fullWidth>
                Ke Dokumen
            </Button> */}
        </>
    );

    const hibahkuFailedModalNotification = (
        <>
            <Avatar
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png`}
                size={60}
                radius={120}
                mx="auto"
            />

            <Space h="xl" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="xl" />

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

            <Space h="xl" />

            <Text ta="center">{appError && appError}</Text>

            <Space h="xl" />

            <Text ta="center">Terima Kasih</Text>

            <Space h="xl" />

            <Button onClick={handleClose} fullWidth>
                Saya Mengerti
            </Button>
        </>
    );

    const hibahkuNotFoundModalNotification = (
        <>
            <Avatar
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png`}
                size={60}
                radius={120}
                mx="auto"
            />

            <Space h="xl" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="xl" />

            <Text ta="center" c="red" inherit fw={700}>
                MAAF
            </Text>

            <Space h="md" />

            <Text ta="center">
                <Text span c="red" inherit fw={700}>
                    Data Tidak Ditemukan!
                </Text>{" "}
                Harap mendaftarkan Rumah Ibadah / Lembaga Pendidikan Keagamaan
                terlebih dahulu.
            </Text>

            <Space h="xl" />

            <Text ta="center">
                Klik link dibawah ini untuk mendaftarkan Rumah Ibadah / Lembaga
                Pendidikan Keagamaan{" "}
            </Text>

            <Text ta="center" fs="italic">
                <Anchor href="/dashboard/rumah-ibadah/user/create">
                    "KLIK DISINI"
                </Anchor>
            </Text>

            <Space h="xl" />

            <Text ta="center">Terima Kasih</Text>

            <Space h="xl" />
        </>
    );

    return (
        <>
            <Container size="xs" mt={-15} mb={-65}>
                {/* <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                /> */}
                <Paper
                    bg={
                        computedColorScheme === "dark"
                            ? "var(--mantine-color-gray-9)"
                            : "var(--mantine-color-blueGray-light)"
                    }
                    p="lg"
                    withBorder
                >
                    <Group justify="space-between" gap="xl">
                        <Title
                            order={2}
                            size="h3"
                            // component={Link}
                            // to="/dashboard/user"
                            weight="bold"
                            // style={{ textDecoration: "none" }}
                        >
                            TITLE LOGO
                        </Title>
                        <Group gap="xs">
                            <DarkButton />
                            <MenuMantine />
                        </Group>
                    </Group>
                </Paper>

                {/* <Space h="xs" /> */}

                <Paper
                    bg="var(--mantine-color-blueGray-light)"
                    // style={{ minHeight: "calc(110vh - 90px)" }}
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
                                    error={form.errors.id && "Min. 10 Karakter"}
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
        </>
    );
}
