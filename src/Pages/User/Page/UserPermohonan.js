import {
    Button,
    Center,
    Container,
    Group,
    Paper,
    Stack,
    TextInput,
    useComputedColorScheme,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

import DarkButton from "../components/DarkButton/DarkButton";
import { IconArrowLeft } from "@tabler/icons-react";
import MenuMantine from "../../../components/Menu/MenuMantine";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToggle } from "@mantine/hooks";

export default function UserPermohonan() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const navigate = useNavigate();
    // const focusTrapRef = useFocusTrap();

    // const [opened, { open, close }] = useDisclosure(false);
    const [type, toggle] = useToggle(["masjid", "pesantren"]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

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
        console.log(values);
        // dispatch(cekStatusRumahIbadahAction(values));
        // form.clearErrors();
    });

    return (
        <>
            <Container size="xs" mt={-15} mb={-65}>
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
                        <form onSubmit={formOnSubmit}>
                            <Stack gap="lg">
                                <TextInput
                                    label="id"
                                    value={form.values.id}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "id",
                                            event.currentTarget.value
                                        )
                                    }
                                />
                            </Stack>
                            <Center my={20}>
                                <Button fullWidth type="submit" radius="md">
                                    Submit
                                </Button>
                            </Center>
                        </form>
                    </Paper>
                </Paper>
            </Container>
        </>
    );
}
