import {
    Anchor,
    Button,
    Container,
    Group,
    Image,
    LoadingOverlay,
    Paper,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    useComputedColorScheme,
} from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import DarkButton from "../../User/components/DarkButton/DarkButton";
import { loginUserAction } from "../../../redux/slices/auth/authSlices";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignIn(props) {
    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nik: "",
            password: "",
        },

        validate: {
            nik: hasLength(
                { min: 15, max: 18 },
                "Nik berupa angka yang terdiri dari 15-18 Karakter"
            ),
            password: hasLength({ min: 8 }, "Password minimal 8 karakter"),
        },
    });

    const dispatch = useDispatch();

    //select state from store
    const storeDataLogin = useSelector((store) => store?.auth);

    useEffect(() => {
        console.log(storeDataLogin);
    }, [storeDataLogin]);

    const { appError, serverError, loading, userAuth } = storeDataLogin;

    useEffect(() => {
        const abortController = new AbortController();

        if (appError && appError) {
            toast.error(appError);
        }

        return () => {
            abortController.abort();
        };
    }, [appError, serverError, loading, userAuth]);

    if (userAuth?.token) {
        toast.success("Sukses");
        return <Navigate to="/dashboard" replace={true} />;
    }

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(loginUserAction(values));
        form.clearErrors();
    });

    return (
        <Container size={450} pt={100}>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 1 }}
            />
            {computedColorScheme === "light" ? (
                <Image
                    loading="lazy"
                    radius="md"
                    w={400}
                    fit="contain"
                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                    fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                />
            ) : (
                <Image
                    loading="lazy"
                    radius="md"
                    w={400}
                    fit="contain"
                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                    fallbackSrc="https://placehold.co/500x100/1A1B1E/FFFFFF/png?text=HIBAHKU+LOGO"
                />
            )}
            <Paper radius="md" mt={20} p="xl" withBorder shadow="md" {...props}>
                <form onSubmit={formOnSubmit}>
                    <Stack>
                        <TextInput
                            type="number"
                            label="NIK"
                            placeholder="NIK Min. 16 angka"
                            value={form.values.nik}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "nik",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.nik && "Min 15 & Maks. 18 Karakter"
                            }
                            radius="md"
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Kata Kunci"
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "password",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.password &&
                                "Password Min. 8 Karakter"
                            }
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="md">
                        <Anchor
                            component={Link}
                            type="button"
                            // c="dimmed"
                            to="/register"
                            size="xs"
                            ta="center"
                        >
                            NIK Tidak terdaftar? Register disini.
                        </Anchor>
                        <DarkButton />
                    </Group>

                    <Space h="md" />

                    {loading ? (
                        <Button disabled={loading} radius="md" fullWidth>
                            Loading...
                        </Button>
                    ) : (
                        <Button
                            disabled={!form.isValid()}
                            type="submit"
                            radius="md"
                            fullWidth
                        >
                            Login
                        </Button>
                    )}
                </form>
            </Paper>

            <Space h="md" />

            <Text size="sm" align="center" c="dimmed">
                Copyright © 2023{" "}
                <Anchor
                    component={Link}
                    type="button"
                    to="https://kesra.jambiprov.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    ta="center"
                >
                    Biro Kesra Provinsi Jambi
                </Anchor>{" "}
                By{" "}
                <Anchor
                    component={Link}
                    type="button"
                    to="https://diskominfo.jambiprov.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    ta="center"
                >
                    Diskominfo Provinsi Jambi
                </Anchor>{" "}
            </Text>
        </Container>
    );
}
