import {
    Anchor,
    Button,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { registerUserAction } from "../../../redux/slices/auth/authSlices";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Register(props) {
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nik: "",
            nama: "",
            password: "",
            notelpon: "",
            // terms: false,
        },

        validate: {
            nik: hasLength(
                { min: 15, max: 16 },
                "Nik berupa angka yang terdiri dari 16 Karakter"
            ),
            nama: isNotEmpty("Nama tidak boleh kosong"),
            password: hasLength({ min: 8 }, "Password minimal 8 karakter"),
            notelpon: hasLength(
                { min: 11, max: 13 },
                "No Handphone Min. 11 Angka & Maks. 13 Angka"
            ),
            // terms: isNotEmpty("You must accept terms of use"),
        },
    });

    //dispatch
    const dispatch = useDispatch();

    //select state from store
    const storeData = useSelector((store) => store?.auth);
    // console.log(storeData);
    const { loading, appError, serverError, registered } = storeData;

    useEffect(() => {
        if (appError || serverError) {
            toast.error(appError);
        }
    }, [appError, serverError, registered, loading]);

    //redirect
    if (registered) {
        toast.success(
            "Register berhasil, Silahkan login menggunakan NIK yang telah terdaftar"
        );
        return <Navigate to="/signin" replace={false} />;
    }

    return (
        <Container size={450} pt={150}>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 1 }}
            />
            {/* <Title ta="center">HIBAHKU</Title> */}
            <Paper radius="md" mt={20} p="xl" withBorder shadow="lg" {...props}>
                <form
                    onSubmit={form.onSubmit((values) => {
                        dispatch(registerUserAction(values));
                        form.reset();
                        form.clearErrors();
                    })}
                >
                    <Stack>
                        <TextInput
                            type="number"
                            label="NIK"
                            placeholder="NIK yang terdiri dari 16 angka"
                            value={form.values.nik}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "nik",
                                    event.currentTarget.value
                                )
                            }
                            error={form.errors.nik && "Maks. 16 Karakter"}
                            radius="md"
                        />

                        <TextInput
                            label="Nama"
                            placeholder="Nama Lengkap"
                            value={form.values.nama}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "nama",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.nama && "Nama tidak boleh kosong"
                            }
                            radius="md"
                        />

                        <TextInput
                            label="No. Handphone"
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
                                "No Handphone Min. 11 Angka & Maks. 13 Angka"
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

                        {/* <Checkbox
                            label={
                                <>
                                    I accept{" "}
                                    <Anchor
                                        href="https://diskominfo.jambiprov.go.id"
                                        target="_blank"
                                        inherit
                                    >
                                        terms and conditions
                                    </Anchor>
                                </>
                            }
                            checked={form.values.terms}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "terms",
                                    event.currentTarget.checked
                                )
                            }
                        /> */}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component={Link}
                            type="button"
                            c="dimmed"
                            to="/signin"
                            size="xs"
                        >
                            NIK Sudah Terdaftar? Login disini.
                        </Anchor>
                        {loading ? (
                            <Button radius="xl" disabled={loading}>
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                radius="xl"
                                disabled={!form.isValid()}
                            >
                                Register
                            </Button>
                        )}
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
