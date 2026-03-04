import {
    Anchor,
    BackgroundImage,
    Button,
    Center,
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
    useComputedColorScheme,
} from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import DarkButton from "../../User/components/DarkButton/DarkButton";
import backgroundSvg from "../../../assets/wave-signin.svg";
import { loginUserAction } from "../../../redux/slices/auth/authSlices";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
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
                "Nik berupa angka yang terdiri dari 15-18 Karakter",
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
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    useEffect(() => {
        const abortController = new AbortController();

        if (appError && appError) {
            modals.openConfirmModal({
                title: "Gagal",
                centered: true,
                closeOnEscape: false,
                closeOnClickOutside: false,
                withCloseButton: false,
                transitionProps: {
                    transition: "fade",
                    duration: 600,
                    timingFunction: "linear",
                },
                children: (
                    <Text size="sm" ta="justify">
                        {appError}
                    </Text>
                ),
                labels: { confirm: "Muat Ulang Halaman", cancel: "Kembali" },
                onCancel: () => window.location.reload(),
                onConfirm: () => window.location.reload(),
            });

            nprogress.start();
        }

        return () => {
            abortController.abort();
            nprogress.complete();
        };
    }, [appError, serverError, loading, userAuth]);

    if (userAuth?.token && userAuth?.role === 1) {
        toast.success("Sukses");
        return <Navigate to="/dashboard" replace={true} />;
    }

    if (userAuth?.token && userAuth?.role === 2) {
        return <Navigate to="/dashboard/user/beranda" replace={true} />;
    }

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(loginUserAction(values));
        form.clearErrors();
    });

    return (
        <>
            <BackgroundImage h="100vh" src={backgroundSvg}>
                <Container size={450} pt={25}>
                    <LoadingOverlay
                        visible={loading}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 1 }}
                    />
                    <Center>
                        <Group gap="xs" wrap="nowrap">
                            <Anchor href="/">
                                <Image
                                    loading="lazy"
                                    radius="md"
                                    w={{ base: 175, xs: 200, sm: 250 }}
                                    fit="contain"
                                    src={
                                        computedColorScheme === "light"
                                            ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                                            : "https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                    }
                                    fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                                />
                            </Anchor>
                            <Image
                                w={{ base: 100, xs: 115, sm: 135 }}
                                fit="contain"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                            />
                        </Group>
                    </Center>
                    <Paper radius="md" p="xl" withBorder shadow="md" {...props}>
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
                                            event.currentTarget.value,
                                        )
                                    }
                                    error={
                                        form.errors.nik &&
                                        "Min 15 & Maks. 18 Karakter"
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
                                            event.currentTarget.value,
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
                                    to="/register"
                                    size="xs"
                                    ta="center"
                                >
                                    NIK Tidak terdaftar? Daftar disini.
                                </Anchor>
                                <DarkButton />
                            </Group>

                            <Space h="md" />

                            {loading ? (
                                <Button
                                    disabled={loading}
                                    radius="md"
                                    fullWidth
                                >
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    disabled={!form.isValid()}
                                    type="submit"
                                    radius="md"
                                    fullWidth
                                >
                                    Log in
                                </Button>
                            )}
                        </form>
                    </Paper>

                    <Space h="md" />

                    <Text size="sm" align="center">
                        Copyright © 2024{" "}
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
            </BackgroundImage>
        </>
    );
}
