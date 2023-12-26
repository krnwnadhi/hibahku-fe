import {
    Button,
    Container,
    Paper,
    Space,
    TextInput,
    Title,
    rem,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
    createPeriode,
    getPeriode,
} from "../../redux/slices/periode/periodeSlices";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import axios from "axios";
import { basePeriodeURL } from "../../utils/baseURL";
import dayjs from "dayjs";

const Periode = () => {
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
            // mulai: isNotEmpty("Harus Di Isi"),
            // selesai: isNotEmpty("Harus Di Isi"),
            mulai: matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Tidak sesuai format YYYY-MM-DD"
            ),
            selesai: matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Tidak sesuai format YYYY-MM-DD"
            ),
        },
    });

    useEffect(() => {
        dispatch(getPeriode());
    }, [dispatch]);

    const periode = useSelector((state) => state?.periode?.getPeriode);
    // console.log(periode);
    const mulaiPeriode = periode?.map((x) => x.mulai);
    const mulaiPeriodeFormat = dayjs(mulaiPeriode).format("DD-MM-YYYY");
    console.log(mulaiPeriodeFormat);

    const selesaiPeriode = periode?.map((x) => x.selesai);
    const selesaiPeriodeFormat = dayjs(selesaiPeriode).format("DD-MM-YYYY");
    console.log(selesaiPeriodeFormat);

    // const { loading, appError, serverError, getPeriode } = periode;

    const formOnSubmit = form.onSubmit((values) => {
        console.log(values);
        dispatch(createPeriode(values));
        form.reset();
        form.clearErrors();
        alert("Periode berhasil diperbaharui: " + JSON.stringify(values));
        window.location.reload();
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

    console.log(dayjs().format("YYYY-MM-DD"));

    return (
        <>
            <Container size="xl">
                <Title order={3} ta="center">
                    TUTUP: {mulaiPeriodeFormat} - BUKA KEMBALI :{" "}
                    {selesaiPeriodeFormat}
                </Title>
                <Paper radius="md" shadow="md" p="xl">
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
                            label="Tutup Periode HIBAHKU"
                            description="YYYY-MM-DD"
                            placeholder="Cth. 2024-11-30"
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
                            label="Buka Kembali Periode HIBAHKU"
                            description="YYYY-MM-DD"
                            placeholder="Cth. 2024-12-31"
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
                            // variant="subtle"
                            fullWidth
                            radius="md"
                            mt="md"
                            disabled={!form.isValid()}
                            // onSubmit={onSubmitButton}
                            // onClick={postData}
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
