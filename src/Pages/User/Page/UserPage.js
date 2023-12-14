import {
    Button,
    Center,
    Container,
    Divider,
    Group,
    Modal,
    Paper,
    SegmentedControl,
    Space,
    Stack,
    Tabs,
    TextInput,
    Title,
    VisuallyHidden,
    rem,
} from "@mantine/core";
import {
    IconCode,
    IconExternalLink,
    IconEye,
    IconHome,
    IconMailPlus,
    IconMessageCircle,
    IconPhoto,
    IconSettings,
} from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkButton from "../components/DarkButton/DarkButton";
import MenuMantine from "../../../components/Menu/MenuMantine";
import UserInfo from "../components/UserInfo/UserInfo";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import classes from "./UserPage.module.css";
import { useDisclosure } from "@mantine/hooks";

export default function UserPage() {
    const dispatch = useDispatch();

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
    const { loading, cekStatus } = rumahIbadah;
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
        // form.clearErrors();
    });

    return (
        <>
            <Container size="xs" mt={-15} mb={-65}>
                <Paper
                    // bg="#25262B"
                    // shadow="lg"
                    // radius="sm"
                    // bg="var(--mantine-color-blueGray-light)"
                    p={25}
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
                    style={{ minHeight: "calc(110vh - 90px)" }}
                    p={25}
                    withBorder
                >
                    <UserInfo />

                    <Space h="xs" />

                    <form onSubmit={formOnSubmit}>
                        <Paper
                            radius="md"
                            withBorder
                            p="xl"
                            bg="var(--mantine-color-body)"
                        >
                            <Stack>
                                <TextInput
                                    type="number"
                                    label="ID SIMAS"
                                    placeholder="ID SIMAS Min. 16 angka"
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
                        </Paper>
                        <Button
                            type="submit"
                            variant="subtle"
                            fullWidth
                            mt="md"
                            loading={loading}
                            onClick={handleShow}
                            disabled={!form.isValid()}
                        >
                            Cek Status
                        </Button>
                    </form>
                    <Modal
                        opened={show}
                        onClose={handleClose}
                        // title="Authentication"
                        centered
                        withCloseButton={false}
                    >
                        {cekStatus?.message}
                    </Modal>
                </Paper>
                {/* <Paper
                    bg="var(--mantine-color-blueGray-light)"
                    // radius="xl"
                    // mih="87vh"
                    p={25}
                    withBorder
                > */}
                <Center>
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        classNames={classes}
                        value={value}
                        onChange={setValue}
                        data={[
                            {
                                value: "home",
                                label: (
                                    <>
                                        <Center style={{ gap: 10 }}>
                                            <Link
                                                to={"/dashboard/user/beranda"}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                                                }}
                                            >
                                                <span>Beranda</span>
                                            </Link>
                                        </Center>
                                    </>
                                ),
                            },
                            {
                                value: "permohonan",
                                label: (
                                    <>
                                        <Center style={{ gap: 10 }}>
                                            <Link
                                                to={
                                                    "/dashboard/user/permohonan"
                                                }
                                                style={{
                                                    textDecoration: "none",
                                                    color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
                                                }}
                                            >
                                                <span>Permohonan</span>
                                            </Link>
                                        </Center>
                                    </>
                                ),
                            },
                        ]}
                    />
                </Center>

                {/* <Tabs
                    value={tabValue}
                    onChange={(value) => navigate(`/dashboard/user/${value}`)}
                    classNames={classes}
                >
                    <Tabs.List>
                        <Tabs.Tab value="home">Home</Tabs.Tab>
                        <Tabs.Tab value="cek-status">Cek Status</Tabs.Tab>
                        <Tabs.Tab value="profil">Profile</Tabs.Tab>
                    </Tabs.List>
                </Tabs> */}
                {/* </Paper> */}
            </Container>
        </>
    );
}
