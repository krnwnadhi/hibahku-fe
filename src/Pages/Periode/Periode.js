import {
    Alert,
    Anchor,
    Breadcrumbs,
    Button,
    Collapse,
    Container,
    Notification,
    Paper,
    Space,
    Text,
    TextInput,
    Title,
    rem,
} from "@mantine/core";
import { IconCalendar, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import {
    createPeriode,
    getPeriode,
} from "../../redux/slices/periode/periodeSlices";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { DatePickerInput } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import axios from "axios";
import { basePeriodeURL } from "../../utils/baseURL";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Periode = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [loadingToast, setLoadingToast] = useState(false);

    const todaysDate = new Date();
    // console.log(todaysDate);
    function convertDate(date) {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString();
        const dd = date.getDate().toString();

        const mmChars = mm.split("");
        const ddChars = dd.split("");

        return (
            yyyy +
            "-" +
            (mmChars[1] ? mm : "0" + mmChars[0]) +
            "-" +
            (ddChars[1] ? dd : "0" + ddChars[0])
        );
    }

    // console.log(convertDate(todaysDate));

    // const [mulai, setMulai] = useState();
    // const [selesai, setSelesai] = useState();

    const dispatch = useDispatch();

    // const handleDateChange = (date) => {
    //     setMulai(dayjs(date));
    // };

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            mulai: null,
            selesai: null,
        },

        validate: {
            mulai: matches(
                /^(?:20\d{2}|19\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
                "Tidak sesuai format YYYY-MM-DD"
            ),
            selesai: matches(
                /^(?:20\d{2}|19\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
                "Tidak sesuai format YYYY-MM-DD"
            ),
        },
    });

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    const periode = useSelector((state) => state?.periode);

    const { loading, appError, serverError } = periode;
    // console.log(periode);
    const mulaiPeriode = periode?.getPeriode?.map((x) => x.mulai);
    const mulaiPeriodeFormat = dayjs(mulaiPeriode).format("DD-MMM-YYYY");
    console.log(mulaiPeriodeFormat);

    const selesaiPeriode = periode?.getPeriode?.map((x) => x.selesai);
    const selesaiPeriodeFormat = dayjs(selesaiPeriode).format("DD-MMM-YYYY");
    console.log(selesaiPeriodeFormat);

    const formOnSubmit = form.onSubmit((values) => {
        console.log(values);
        dispatch(createPeriode(values));
        form.reset();
        form.clearErrors();
        setTimeout(() => {
            window.location.reload();
        }, 5500);
    });

    // const formOnSubmit = form.onSubmit(async (values, event) => {
    //     event.preventDefault();
    //     console.log(event);
    //     try {
    //         await axios.post(`${basePeriodeURL}`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });

    // const onSubmitButton = () => {
    //     console.log("ee");
    // };

    // const formattedDate = mulai.format("YYYY-MM-DD");

    // const postData = async () => {
    //     try {
    //         const response = await axios.post(basePeriodeURL, {
    //             date: formattedDate,
    //         });

    //         console.log("Data sent successfully:", response.data);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Periodisasi", href: "/dashboard/admin/periode" },
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

    // console.log(dayjs().format("YYYY-MM-DD"));

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>

                <Space h="md" />

                <Paper radius="md" shadow="md" p="xl" withBorder>
                    <Title order={3} ta="center" fw={700} mb="xl">
                        TUTUP :{" "}
                        <Text span c="red" inherit>
                            {mulaiPeriodeFormat ? mulaiPeriodeFormat : ""}
                        </Text>{" "}
                        • BUKA KEMBALI :{" "}
                        <Text span c="blue" inherit>
                            {selesaiPeriodeFormat ? selesaiPeriodeFormat : ""}
                        </Text>
                    </Title>
                    <form onSubmit={formOnSubmit}>
                        {/* <DatePickerInput
                            dropdownType="modal"
                            valueFormat="YYYY-MM-DD"
                            label="Mulai"
                            placeholder="Set Tanggal Mulai"
                            clearable
                            leftSection={
                                <IconCalendar
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5}
                                />
                            }
                            required
                            locale="id"
                            leftSectionPointerEvents="none"
                            value={mulai}
                            onChange={handleDateChange}
                            // onChange={(date) => {
                            //     console.log(date);
                            //     setMulai(date);
                            // }}
                            minDate={new Date()}
                            // {...form.getInputProps("mulai")}
                        /> */}
                        {/* <DatePickerInput
                        label="Selesai"
                        placeholder="Set Tanggal Selesai"
                        value={selesai}
                        onChange={setSelesai}
                    /> */}

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
                        />

                        <Space h="md" />

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            radius="md"
                            mt="md"
                            disabled={!form.isValid()}
                            // onSubmit={onSubmitButton}
                            // onClick={postData}
                            // onClick={() => {
                            //     setOpenAlert((prev) => !prev);
                            // }}
                            onClick={handleLoadingClick}
                        >
                            Set Periode
                        </Button>
                    </form>
                </Paper>
                {/* <p>Selected Date: {formattedDate}</p> */}
            </Container>
        </>
    );
};

export default Periode;
