import {
    Anchor,
    BackgroundImage,
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
    useComputedColorScheme,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import DarkButton from "../../User/components/DarkButton/DarkButton";
import backgroundSvg from "../../../assets/wave-signin.svg";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { registerUserAction } from "../../../redux/slices/auth/authSlices";
import { useEffect } from "react";

export default function Register(props) {
    const navigate = useNavigate();
    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nik: "",
            nama: "",
            password: "",
            notelpon: "",
        },

        validate: {
            nik: hasLength(
                16,
                "Nik berupa angka yang terdiri dari 16 Karakter"
            ),
            nama: isNotEmpty("Nama tidak boleh kosong"),
            password: hasLength({ min: 8 }, "Password minimal 8 karakter"),
            notelpon: hasLength(
                { min: 6, max: 14 },
                "No Handphone Min. 6 Angka & Maks. 14 Angka"
            ),
        },
    });

    //dispatch
    const dispatch = useDispatch();

    //select state from store
    const storeData = useSelector((store) => store?.auth);
    const { loading, appError, serverError, registered } = storeData;

    useEffect(() => {
        if (appError || serverError) {
            modals.openConfirmModal({
                title: serverError,
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
        }
    }, [appError, serverError, registered, loading]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    //redirect
    if (registered) {
        modals.openConfirmModal({
            title: registered.message,
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
                <Text size="sm">
                    Silahkan kembali ke halaman login dan login menggunakan NIK
                    & Password yang telah terdaftar!"
                </Text>
            ),
            labels: { confirm: "Ke Halaman Login", cancel: "Kembali" },
            onCancel: () => window.location.reload(),
            onConfirm: () => {
                navigate("/signin");
                window.location.reload();
            },
        });
    }

    return (
        <>
            <BackgroundImage h="100vh" src={backgroundSvg}>
                <Container size={450} pt={50}>
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
                    <Paper
                        radius="md"
                        mt={20}
                        p="xl"
                        withBorder
                        shadow="lg"
                        {...props}
                    >
                        <form
                            onSubmit={form.onSubmit((values) => {
                                dispatch(registerUserAction(values));
                            })}
                        >
                            <Stack>
                                <TextInput
                                    type="number"
                                    label="NIK Ketua/Pengurus/Pimpinan"
                                    placeholder="NIK yang terdiri dari 16 angka"
                                    value={form.values.nik}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "nik",
                                            event.currentTarget.value
                                        )
                                    }
                                    error={
                                        form.errors.nik &&
                                        "NIK minimal 16 Angka"
                                    }
                                    radius="md"
                                />

                                <TextInput
                                    label="Nama Ketua/Pengurus/Pimpinan"
                                    placeholder="Nama Lengkap"
                                    value={form.values.nama}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "nama",
                                            event.currentTarget.value
                                        )
                                    }
                                    error={
                                        form.errors.nama &&
                                        "Nama tidak boleh kosong"
                                    }
                                    radius="md"
                                />

                                <TextInput
                                    label="No. Handphone Ketua/Pengurus/Pimpinan"
                                    type="number"
                                    placeholder="08xxxxxxxx"
                                    value={form.values.notelpon}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "notelpon",
                                            event.currentTarget.value
                                        )
                                    }
                                    error={
                                        form.errors.notelpon &&
                                        "No Handphone Min. 6 Angka & Maks. 14 Angka"
                                    }
                                    radius="md"
                                />

                                <PasswordInput
                                    label="Password"
                                    placeholder="Your password"
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
                                    to="/signin"
                                    size="xs"
                                >
                                    NIK Sudah Terdaftar? Login disini.
                                </Anchor>

                                <DarkButton />
                            </Group>

                            <Space h="md" />

                            {loading ? (
                                <Button radius="md" disabled={loading}>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    fullWidth
                                    type="submit"
                                    radius="md"
                                    disabled={!form.isValid()}
                                >
                                    Daftar
                                </Button>
                            )}
                        </form>
                    </Paper>

                    <Space h="md" />

                    <Text size="sm" align="center">
                        Copyright © 2023{" "}
                        <Anchor
                            component={Link}
                            type="button"
                            to="https://kesra.jambiprov.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            ta="center"
                            c="dark"
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
                            c="dark"
                        >
                            Diskominfo Provinsi Jambi
                        </Anchor>{" "}
                    </Text>
                </Container>
            </BackgroundImage>
        </>
    );
}
