import {
    Center,
    Container,
    Divider,
    Group,
    Paper,
    SegmentedControl,
    Text,
    Timeline,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import {
    getAllPersetujuanAction,
    getDetailUserPersetujuanAction,
} from "../../../redux/slices/persetujuan/persetujuanSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkButton from "../components/DarkButton/DarkButton";
import MenuMantine from "../../../components/Menu/MenuMantine";
import classes from "./UserPage.module.css";
import { useDisclosure } from "@mantine/hooks";

export default function UserStatus() {
    const { id } = useParams();
    console.log(id);

    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [value, setValue] = useState("progres");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

    // const persetujuan = useSelector(state => state.persetujuan)

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDetailUserPersetujuanAction(id));
    }, [dispatch, id]);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, persetujuanList, appError, serverError } = persetujuan;
    console.log(persetujuanList?.data);

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
                    to={"/dashboard/user/progres"}
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

    return (
        <>
            <Container size="xs" mt={-15} mb={-65}>
                {!persetujuanList?.data && "Terlihat"}
                <Paper
                    // bg="#25262B"
                    // shadow="lg"
                    // radius="sm"
                    // bg="var(--mantine-color-blueGray-light)"
                    p="lg"
                    withBorder
                    bg={
                        computedColorScheme === "dark"
                            ? "var(--mantine-color-gray-9)"
                            : "var(--mantine-color-blueGray-light)"
                    }
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
                    style={{ minHeight: "calc(110vh - 90px)" }}
                    p={25}
                    withBorder
                >
                    <Paper p={50} radius="md">
                        <Title order={3} ta="center" mt="md" mb={30}>
                            Timeline Status Permohonan
                        </Title>
                        <Divider h="xl" />
                        <Timeline active={3} bulletSize={18} lineWidth={2}>
                            <Timeline.Item title="New branch">
                                <Text c="dimmed" size="sm">
                                    You&apos;ve created new branch{" "}
                                    <Text
                                        variant="link"
                                        component="span"
                                        inherit
                                    >
                                        fix-notifications
                                    </Text>{" "}
                                    from master
                                </Text>
                                <Text size="xs" mt={4}>
                                    2 hours ago
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item title="Commits">
                                <Text c="dimmed" size="sm">
                                    You&apos;ve pushed 23 commits to
                                    <Text
                                        variant="link"
                                        component="span"
                                        inherit
                                    >
                                        fix-notifications branch
                                    </Text>
                                </Text>
                                <Text size="xs" mt={4}>
                                    52 minutes ago
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                title="Pull request"
                                lineVariant="dashed"
                            >
                                <Text c="dimmed" size="sm">
                                    You&apos;ve submitted a pull request
                                    <Text
                                        variant="link"
                                        component="span"
                                        inherit
                                    >
                                        Fix incorrect notification message
                                        (#187)
                                    </Text>
                                </Text>
                                <Text size="xs" mt={4}>
                                    34 minutes ago
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item title="Code review">
                                <Text c="dimmed" size="sm">
                                    <Text
                                        variant="link"
                                        component="span"
                                        inherit
                                    >
                                        Robert Gluesticker
                                    </Text>{" "}
                                    left a code review on your pull request
                                </Text>
                                <Text size="xs" mt={4}>
                                    12 minutes ago
                                </Text>
                            </Timeline.Item>
                        </Timeline>
                    </Paper>
                </Paper>
                <Center>
                    <SegmentedControl
                        radius="xl"
                        size="md"
                        classNames={classes}
                        value={value}
                        onChange={setValue}
                        data={dataSegmentedControl}
                        fullWidth
                    />
                </Center>
            </Container>
        </>
    );
}
