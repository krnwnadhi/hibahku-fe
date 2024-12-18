import "dayjs/locale/id";

import {
    Anchor,
    Breadcrumbs,
    Button,
    Center,
    Container,
    Group,
    Loader,
    LoadingOverlay,
    Paper,
    Space,
    Text,
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
    // eslint-disable-next-line no-unused-vars
    const [loadingToast, setLoadingToast] = useState(false);

    dayjs.extend(customParseFormat);

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

    const { loading } = periode;

    const mulaiPeriode = periode?.getPeriode?.map((x) => x.mulai);
    const mulaiPeriodeFormat = dayjs(mulaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const selesaiPeriode = periode?.getPeriode?.map((x) => x.selesai);
    const selesaiPeriodeFormat = dayjs(selesaiPeriode)
        .locale("id")
        .format("DD MMMM YYYY");

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(createPeriode(values));
        form.reset();
        form.clearErrors();
        setTimeout(() => {
            window.location.reload();
        }, 5500);
    });

    const items = [
        { title: "Beranda", href: "/dashboard" },
        { title: "Periode", href: "/dashboard/admin/periode" },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    const handleLoadingClick = () => {
        toast("Loading...", {
            isLoading: true,
            autoClose: false,
        });

        setLoadingToast(true);
        setTimeout(() => {
            setLoadingToast(false);
            toast.dismiss();
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
            <Container size="lg" pos="relative">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                />

                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Space h="md" />

                <Paper
                    radius="md"
                    shadow="md"
                    p="xl"
                    withBorder
                    mih="70vh"
                    style={{
                        backgroundColor:
                            "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                    }}
                >
                    <Group grow>
                        <Paper radius="md" shadow="sm" p="lg" withBorder>
                            <Text ta="center" fz="md" fw={700}>
                                AKHIR PERIODE
                            </Text>
                            {loading ? (
                                <Center>
                                    <Loader size="xs" />
                                </Center>
                            ) : (
                                <Text ta="center" c="red" fz="sm">
                                    {mulaiPeriodeFormat
                                        ? mulaiPeriodeFormat
                                        : "Tidak Ada Data"}
                                </Text>
                            )}
                        </Paper>
                        <Paper radius="md" shadow="sm" p="lg" withBorder>
                            <Text ta="center" fz="md" fw={700}>
                                AWAL PERIODE
                            </Text>
                            {loading ? (
                                <Center>
                                    <Loader size="xs" />
                                </Center>
                            ) : (
                                <Text ta="center" c="green" fz="sm">
                                    {selesaiPeriodeFormat
                                        ? selesaiPeriodeFormat
                                        : "Tidak Ada Data"}
                                </Text>
                            )}
                        </Paper>
                    </Group>

                    <form onSubmit={formOnSubmit}>
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
                                const selectedDate =
                                    moment(date).format("YYYY-MM-DD");
                                form.setFieldValue("mulai", selectedDate);
                                form.setFieldValue(
                                    "minDateSelesai",
                                    selectedDate
                                );
                            }}
                        />

                        <Space h="md" />

                        <DatePickerInput
                            valueFormat="DD MMMM YYYY"
                            label="Buka Kembali Periode Hibahku"
                            placeholder="Pilih Tanggal"
                            minDate={
                                form?.values?.minDateSelesai
                                    ? new Date(form?.values?.minDateSelesai)
                                    : new Date()
                            }
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
