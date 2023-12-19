import {
    Button,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure, useFocusTrap } from "@mantine/hooks";

import DarkButton from "../components/DarkButton/DarkButton";
import { IconArrowLeft } from "@tabler/icons-react";
import MenuMantine from "../../../components/Menu/MenuMantine";
import { useState } from "react";

export default function UserPermohonan() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const navigate = useNavigate();
    const focusTrapRef = useFocusTrap();

    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState(false);

    const [value, setValue] = useState("dokumen");

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
                {/* <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                /> */}
                <Paper
                    p="lg"
                    withBorder
                    bg={
                        computedColorScheme === "dark"
                            ? "var(--mantine-color-gray-9)"
                            : "var(--mantine-color-blueGray-light)"
                    }
                >
                    <Group justify="space-between" gap="xl">
                        <Button
                            variant="subtle"
                            leftSection={<IconArrowLeft size={14} />}
                            onClick={() => navigate(-1)}
                        >
                            Kembali
                        </Button>
                        <Group gap="xs">
                            <DarkButton />
                            <MenuMantine />
                        </Group>
                    </Group>
                </Paper>

                <Paper
                    bg="var(--mantine-color-blueGray-light)"
                    style={{ minHeight: "calc(110vh - 90px)" }}
                    p="xl"
                    withBorder
                >
                    <Paper radius="md" p="md" bg="var(--mantine-color-body)">
                        <Stack gap="lg">
                            <TextInput label="Nama" />
                            <TextInput label="Alamat" />
                        </Stack>
                    </Paper>
                </Paper>
            </Container>
        </>
    );
}
