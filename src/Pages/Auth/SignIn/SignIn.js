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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loginUserAction } from "../../../redux/slices/auth/authSlices";
import { toast } from "react-toastify";

export default function SignIn(props) {
    // const [loadingApp, setLoadingApp] = useState(false);

    const navigate = useNavigate();

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nik: "",
            password: "",
        },

        validate: {
            nik: hasLength(
                { min: 15, max: 16 },
                "Nik berupa angka yang terdiri dari 15-16 Karakter"
            ),
            password: hasLength({ min: 8 }, "Password minimal 8 karakter"),
        },
    });

    const dispatch = useDispatch();

    //select state from store
    const storeDataLogin = useSelector((store) => store?.auth);

    // console.log(JSON.stringify(storeDataLogin, undefined, 2));

    useEffect(() => {
        console.log(storeDataLogin);
    }, [storeDataLogin]);

    const { appError, serverError, loading, userAuth } = storeDataLogin;

    useEffect(() => {
        const abortController = new AbortController();

        if (appError || serverError) {
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
        <Container size={450} pt={150}>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 1 }}
            />
            {/* <Title ta="center">HIBAHKU</Title> */}
            <Paper radius="md" mt={20} p="xl" withBorder shadow="lg" {...props}>
                <form onSubmit={formOnSubmit}>
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

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component={Link}
                            type="button"
                            c="dimmed"
                            to="/register"
                            size="xs"
                        >
                            NIK Tidak terdaftar? Register disini.
                        </Anchor>

                        {loading ? (
                            <Button
                                // loading={loading}
                                disabled={loading}
                                radius="xl"
                            >
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                disabled={!form.isValid()}
                                type="submit"
                                radius="xl"
                            >
                                Login
                            </Button>
                        )}
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
