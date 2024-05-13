import "dayjs/locale/id";

import {
    Anchor,
    Breadcrumbs,
    Button,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    Space,
    Text,
    Title,
    rem,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
    createPeriode,
    getPeriode,
} from "../../redux/slices/periode/periodeSlices";
import { useDispatch, useSelector } from "react-redux";

import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import moment from "moment";
import { nprogress } from "@mantine/nprogress";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";

const Periode = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [loadingToast, setLoadingToast] = useState(false);

    dayjs.extend(customParseFormat);

    const todaysDate = moment().format("YYYY-MM-DD");
    console.log(todaysDate);

    const dispatch = useDispatch();

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            mulai: moment().format("YYYY-MM-DD"),
            selesai: moment().add(1, "d").format("YYYY-MM-DD"),
        },
    });

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    const periode = useSelector((state) => state?.periode);

    const { loading, appError, serverError } = periode;

    const mulaiPeriode = periode?.getPeriode?.map((x) => x.mulai);
    const mulaiPeriodeFormat = dayjs(mulaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const selesaiPeriode = periode?.getPeriode?.map((x) => x.selesai);
    const selesaiPeriodeFormat = dayjs(selesaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const formOnSubmit = form.onSubmit((values) => {
        console.log(values);
        dispatch(createPeriode(values));
        form.reset();
        form.clearErrors();
        setTimeout(() => {
            window.location.reload();
        }, 5500);
    });

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Periode", href: "/dashboard/admin/periode" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    const handleLoadingClick = () => {
        toast("Loading...", {
            isLoading: true,
            autoClose: false, // Don't auto-close for loading
        });

        // Simulate a loading process
        setLoadingToast(true);
        setTimeout(() => {
            setLoadingToast(false);
            toast.dismiss(); // Dismiss the loading toast
            toast.success(
                "Periode Berhasil Di perbarui. Halaman akan reload secara otomatis."
            );
        }, 2500);
    };

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    return (
        <>
            <Container size="xl" pos="relative">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                />

                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Space h="md" />

                <Paper radius="md" shadow="md" p="xl" withBorder mih="70vh">
                    <Group grow>
                        <Paper radius="md" shadow="sm" p="lg" withBorder>
                            <Text ta="center" fz="md" fw={700}>
                                TUTUP PERIODE
                            </Text>
                            <Text ta="center" c="red" fz="sm">
                                {mulaiPeriodeFormat
                                    ? mulaiPeriodeFormat
                                    : "Tidak Ada Data"}
                            </Text>
                        </Paper>
                        <Paper radius="md" shadow="sm" p="lg" withBorder>
                            <Text ta="center" fz="md" fw={700}>
                                BUKA KEMBALI PERIODE
                            </Text>
                            <Text ta="center" c="green" fz="sm">
                                {selesaiPeriodeFormat
                                    ? selesaiPeriodeFormat
                                    : "Tidak Ada Data"}
                            </Text>
                        </Paper>
                    </Group>
                    <form onSubmit={formOnSubmit}>
                        {/* <TextInput
                            component={MaskedInput}
                            mask={[
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                            ]}
                            guide
                            placeholder="YYYY-MM-DD"
                            label="Tutup Periode HIBAHKU"
                            description="Cth. 2024-06-01"
                            value={form.values.mulai}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "mulai",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.mulai &&
                                "Tidak sesuai format YYYY-MM-DD"
                            }
                            radius="md"
                        />

                        <Space h="md" />

                        <TextInput
                            component={MaskedInput}
                            mask={[
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                            ]}
                            guide
                            placeholder="YYYY-MM-DD"
                            label="Buka Kembali Periode HIBAHKU"
                            description="Cth. 2025-01-01"
                            value={form.values.selesai}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "selesai",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.selesai &&
                                "Tidak sesuai format YYYY-MM-DD"
                            }
                            radius="md"
                        /> */}

                        <DatePickerInput
                            mt={25}
                            valueFormat="DD MMMM YYYY"
                            label="Tutup Periode Hibahku"
                            placeholder="Pilih Tanggal"
                            minDate={new Date()}
                            leftSectionPointerEvents="none"
                            leftSection={
                                <IconCalendar
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            value={moment(form?.values?.mulai)}
                            onChange={(date) => {
                                form.setFieldValue(
                                    "mulai",
                                    moment(date).format("YYYY-MM-DD")
                                );
                            }}
                        />

                        <Space h="md" />

                        <DatePickerInput
                            valueFormat="DD MMMM YYYY"
                            label="Buka Kembali Periode Hibahku"
                            placeholder="Pilih Tanggal"
                            minDate={new Date()}
                            leftSectionPointerEvents="none"
                            leftSection={
                                <IconCalendar
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            value={moment(form?.values?.selesai)}
                            onChange={(date) => {
                                form.setFieldValue(
                                    "selesai",
                                    moment(date).format("YYYY-MM-DD")
                                );
                            }}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            radius="md"
                            mt="lg"
                            disabled={!form.isValid()}
                            onClick={handleLoadingClick}
                        >
                            Set Periode
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Periode;
