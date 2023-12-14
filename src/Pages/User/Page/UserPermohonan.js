import {
    Button,
    Center,
    Container,
    Group,
    Modal,
    Paper,
    SegmentedControl,
    Space,
    Stack,
    TextInput,
    Title,
    VisuallyHidden,
    rem,
} from "@mantine/core";
import { IconExternalLink, IconHome, IconMailPlus } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import DarkButton from "../components/DarkButton/DarkButton";
import MenuMantine from "../../../components/Menu/MenuMantine";
import UserInfo from "../components/UserInfo/UserInfo";
import { cekStatusRumahIbadahAction } from "../../../redux/slices/rumahIbadah/rumahIbadahSlices";
import classes from "./UserPage.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function UserPermohonan() {
    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState(false);

    const [value, setValue] = useState("permohonan");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

    // const form = useForm({
    //     validateInputOnChange: true,
    //     initialValues: {
    //         id: "",
    //     },

    //     validate: {
    //         id: hasLength({ min: 10, max: 20 }, "ID SIMAS berupa angka yang"),
    //     },
    // });

    // const formOnSubmit = form.onSubmit((values) => {
    //     // console.log(values);
    //     dispatch(cekStatusRumahIbadahAction(values));
    //     // form.clearErrors();
    // });

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

                <Paper
                    bg="var(--mantine-color-blueGray-light)"
                    // radius="xl"
                    // mih="87vh"
                    style={{ minHeight: "calc(110vh - 90px)" }}
                    p={25}
                    withBorder
                >
                    <TextInput />
                </Paper>

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
            </Container>
        </>
    );
}
