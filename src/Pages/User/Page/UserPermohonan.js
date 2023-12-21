import {
    Button,
    Center,
    Container,
    Fieldset,
    FileInput,
    Group,
    NumberInput,
    Paper,
    Stack,
    TextInput,
    useComputedColorScheme,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFocusTrap, useToggle } from "@mantine/hooks";

import DarkButton from "../components/DarkButton/DarkButton";
import { IconArrowLeft } from "@tabler/icons-react";
import MenuMantine from "../../../components/Menu/MenuMantine";
import axios from "axios";
import { basePermohonanURL } from "../../../utils/baseURL";
import { createPermohonan } from "../../../redux/slices/permohonan/permohonanSlices";
import { useNavigate } from "react-router-dom";

export default function UserPermohonan() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const focusTrapRef = useFocusTrap();

    const dispatch = useDispatch();

    const permohonan = useSelector((state) => state?.permohonan);
    const { loading, isCreated, appError, serverError } = permohonan;

    useEffect(() => {
        if (isCreated) {
            navigate("/dashboard/user/beranda");
        }
    }, [isCreated, navigate]);

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
            keagamaanid: "",
            tujuan: "",
            pengajuandana: "",
            norek: "",
            file_ktp: null,
            file_rab: null,
            file_suket: null,
            file_burek: null,
            file_sk: null,
            file_proposal: null,
            file_suratpermohonan: null,
            file_asetrekom: null,
        },

        validate: {
            keagamaanid: hasLength(
                { min: 10, max: 20 },
                "ID SIMAS Min. 10 angka"
            ),
            tujuan: hasLength({ min: 5, max: 50 }, "Tujuan minimal 5 karakter"),
            // pengajuandana: hasLength(
            //     { min: 3, max: 20 },
            //     "Pengajuan dana minimal 3 angka"
            // ),
            norek: hasLength({ min: 8, max: 10 }, "Min. 8 karakter"),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        console.log(values);
        dispatch(createPermohonan(values));
        // form.clearErrors();
        // form.reset();
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
                            <Fieldset
                                legend="Permohonan Bantuan Hibah"
                                radius="md"
                                p="xl"
                                disabled={loading}
                            >
                                <Stack gap="lg">
                                    <TextInput
                                        ref={focusTrapRef}
                                        type="number"
                                        label="ID SIMAS/NSPP/NSM"
                                        description="Masukkan ID SIMAS/NSPP/NSM yang akan menerima HIBAH"
                                        value={form.values.keagamaanid}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "keagamaanid",
                                                event.currentTarget.value
                                            )
                                        }
                                        error={
                                            form.errors.keagamaanid &&
                                            "10-20 Karakter"
                                        }
                                    />
                                    <TextInput
                                        label="Tujuan"
                                        description="Alasan pemohon untuk memohon HIBAH"
                                        placeholder="Contoh: Renovasi Tempat Wudhu, dll."
                                        value={form.values.tujuan}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "tujuan",
                                                event.currentTarget.value
                                            )
                                        }
                                        error={
                                            form.errors.tujuan &&
                                            "Tujuan minimal 5 karakter"
                                        }
                                    />
                                    <NumberInput
                                        allowNegative={false}
                                        allowDecimal={false}
                                        thousandSeparator=","
                                        placeholder="Rupiah"
                                        prefix="Rp. "
                                        hideControls
                                        label="Usulan Dana"
                                        description="Masukkan Jumlah Usulan Dana"
                                        value={form.values.pengajuandana}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "pengajuandana",
                                                event
                                            )
                                        }
                                        error={
                                            form.errors.pengajuandana &&
                                            "Pengajuan dana minimal 3 angka"
                                        }
                                    />
                                    <TextInput
                                        type="number"
                                        label="No. Rekening Bank Jambi"
                                        description="Masukkan No. Rekening Bank Jambi Pemohon"
                                        value={form.values.norek}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                "norek",
                                                event.currentTarget.value
                                            )
                                        }
                                        error={
                                            form.errors.norek &&
                                            "Min. 8 karakter"
                                        }
                                        maxLength={10}
                                    />
                                    <FileInput
                                        label="File KTP"
                                        description="File KTP"
                                        placeholder="File KTP"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_ktp}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_ktp",
                                        //         event.name
                                        //         // console.log(event.name)
                                        //     )
                                        // }
                                        {...form.getInputProps("file_ktp")}
                                    />
                                    <FileInput
                                        label="File RAB"
                                        description="File RAB"
                                        placeholder="File RAB"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_rab}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_rab",
                                        //         event.currentTarget.file_rab
                                        //     )
                                        // }
                                        {...form.getInputProps("file_rab")}
                                    />
                                    <FileInput
                                        label="File SUKET"
                                        description="File SUKET"
                                        placeholder="File SUKET"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_suket}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_suket",
                                        //         event.currentTarget.file_suket
                                        //     )
                                        // }
                                        {...form.getInputProps("file_suket")}
                                    />
                                    <FileInput
                                        label="File BUREK"
                                        description="File burek"
                                        placeholder="File burek"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_burek}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_burek",
                                        //         event.currentTarget.file_burek
                                        //     )
                                        // }
                                        {...form.getInputProps("file_burek")}
                                    />
                                    <FileInput
                                        label="File SK"
                                        description="File SK"
                                        placeholder="File SK"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_sk}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_sk",
                                        //         event.currentTarget.file_sk
                                        //     )
                                        // }
                                        {...form.getInputProps("file_sk")}
                                    />
                                    <FileInput
                                        label="File PROPOSAL"
                                        description="File PROPOSAL"
                                        placeholder="File PROPOSAL"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_proposal}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_proposal",
                                        //         event.currentTarget.file_proposal
                                        //     )
                                        // }
                                        {...form.getInputProps("file_proposal")}
                                    />
                                    <FileInput
                                        label="File SURAT PERMOHONAN"
                                        description="File SURAT PERMOHONAN"
                                        placeholder="File SURAT PERMOHONAN"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_suratpermohonan}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_suratpermohonan",
                                        //         event.currentTarget
                                        //             .file_suratpermohonan
                                        //     )
                                        // }
                                        {...form.getInputProps(
                                            "file_suratpermohonan"
                                        )}
                                    />
                                    <FileInput
                                        label="File ASET REKOM"
                                        description="File ASET REKOM"
                                        placeholder="File ASET REKOM"
                                        accept="application/pdf"
                                        clearable
                                        // value={form.values.file_asetrekom}
                                        // onChange={(event) =>
                                        //     form.setFieldValue(
                                        //         "file_asetrekom",
                                        //         event.currentTarget.file_asetrekom
                                        //     )
                                        // }
                                        {...form.getInputProps(
                                            "file_asetrekom"
                                        )}
                                    />
                                </Stack>
                            </Fieldset>
                            <Center my={20}>
                                <Button
                                    loading={loading}
                                    fullWidth
                                    type="submit"
                                    radius="md"
                                >
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
