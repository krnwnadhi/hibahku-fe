import "dayjs/locale/id";

import {
    Anchor,
    Button,
    Center,
    Container,
    Divider,
    Fieldset,
    FileInput,
    Group,
    Image,
    Modal,
    NumberInput,
    Paper,
    Pill,
    ScrollArea,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    rem,
    useComputedColorScheme,
} from "@mantine/core";
import {
    IconArrowLeft,
    IconCaretUpDown,
    IconFileTypePdf,
} from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkButton from "../components/DarkButton/DarkButton";
import MenuMantine from "../../../components/Menu/MenuMantine";
import { createPermohonan } from "../../../redux/slices/permohonan/permohonanSlices";
import dayjs from "dayjs";
import { nprogress } from "@mantine/nprogress";
import { useNavigate } from "react-router-dom";
import { useToggle } from "@mantine/hooks";

export default function UserPermohonan() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const permohonan = useSelector((state) => state?.permohonan);
    const { loading, isCreated, appError, serverError, permohonanCreated } =
        permohonan;

    console.log(permohonanCreated);

    const [type, toggle] = useToggle(["masjid", "lembaga"]);

    const [show, setShow] = useState(false);

    const exceptThisSymbols = ["e", "E", "+", "-", ".", ","];

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    };

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { persetujuanList } = persetujuan;

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user;

    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });

    const persetujuanId =
        filteredResult?.length > 0 ? filteredResult[0].id : null;

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
            file_sk: null,
            file_proposal: null,
            file_suratpermohonan: null,
            file_asetrekom: null,
            file_izinoperasional: null,
            file_aktapendirian: null,
            file_pengesahankemenkumham: null,
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
            file_ktp: isNotEmpty(
                "Tidak Boleh Kosong. Silahkan Upload File KTP."
            ),
            file_rab: isNotEmpty(
                "Tidak Boleh Kosong. Silahkan Upload File RAB"
            ),
            file_sk: isNotEmpty("Tidak Boleh Kosong"),
            file_proposal: isNotEmpty("Tidak Boleh Kosong"),
            file_suratpermohonan: isNotEmpty("Tidak Boleh Kosong"),
            // file_suket: isNotEmpty("Tidak Boleh Kosong"),
            // file_asetrekom: isNotEmpty("Tidak Boleh Kosong"),
            // file_izinoperasional: isNotEmpty("Tidak Boleh Kosong"),
            // file_aktapendirian: isNotEmpty("Tidak Boleh Kosong"),
            // file_pengesahankemenkumham: isNotEmpty("Tidak Boleh Kosong"),
        },
    });

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const formOnSubmit = form.onSubmit((values) => {
        console.log(values);
        dispatch(createPermohonan(values));
        // form.clearErrors();
        // form.reset();
    });

    // const dates = useDatesContext();
    // console.log(dates);

    const icon = (
        <IconFileTypePdf
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
        />
    );

    const today = dayjs(new Date())
        .locale("id")
        .format("DD-MMMM-YYYY : HH:mm:ss");

    const hibahkuSuccessModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
            />

            <Space h="md" />

            <Title ta="center" order={4}>
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="md" />

            <Text ta="center" c="green" inherit>
                SELAMAT
            </Text>
            <Text ta="center">Permohonan Anda DITERIMA</Text>
            <Text ta="center">({today})</Text>

            <Space h="md" />

            <Text ta="center">
                Selanjutnya, untuk mengetahui perkembangan permohonan anda,
                silahkan klik fitur
                <Anchor href={`/dashboard/user/beranda`}>
                    <Text c="blue" fs="italic">
                        "PROGRES HIBAHKU"
                    </Text>{" "}
                </Anchor>
            </Text>

            <Space h="xl" />

            <Text ta="center">Terima Kasih</Text>
        </>
    );

    const ValueComponent = ({ value }) => {
        const formatBytes = (bytes, decimals = 2) => {
            if (!+bytes) return "0 Bytes";

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = [
                "Bytes",
                "KB",
                "MB",
                "GB",
                "TB",
                "PB",
                "EB",
                "ZB",
                "YB",
            ];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
                sizes[i]
            }`;
        };

        if (value === null) {
            return null;
        }

        if (Array.isArray(value)) {
            return (
                <Pill.Group>
                    {value.map((file, index) => (
                        <Pill key={index}>{file.name}</Pill>
                    ))}
                </Pill.Group>
            );
        }

        return (
            <Pill>
                {value.name} - {formatBytes(value.size)}
            </Pill>
        );
    };

    return (
        <>
            {/* <BackgroundImage h="100vh" src={backgroundSvg} radius="md"> */}
            <Container size="sm" mt={-15} mb={-65}>
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
                    // style={{ minHeight: "calc(110vh - 90px)" }}
                    h="90vh"
                    p="xl"
                    withBorder
                >
                    <ScrollArea h="80vh">
                        <Paper
                            radius="md"
                            p="md"
                            bg="var(--mantine-color-body)"
                        >
                            <form onSubmit={formOnSubmit}>
                                <Fieldset
                                    legend="Permohonan Bantuan Hibah"
                                    radius="md"
                                    p="xl"
                                    disabled={loading}
                                >
                                    <Stack gap="lg">
                                        <Button
                                            onClick={() => toggle()}
                                            variant="light"
                                            radius="lg"
                                            rightSection={
                                                <IconCaretUpDown size={14} />
                                            }
                                        >
                                            {type === "lembaga"
                                                ? "LEMBAGA KEAGAMAAN"
                                                : "MASJID"}
                                        </Button>

                                        {/* <TextInput
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
                                        /> */}

                                        {type === "masjid" && (
                                            <TextInput
                                                mt={15}
                                                type="number"
                                                label="ID Rumah Ibadah"
                                                description="ID SIMAS Min. 15 angka & Tanpa TITIK"
                                                placeholder="Contoh: 011051001000000"
                                                value={form.values.keagamaanid}
                                                onChange={(event) =>
                                                    form.setFieldValue(
                                                        "keagamaanid",
                                                        event.currentTarget
                                                            .value
                                                    )
                                                }
                                                error={
                                                    form.errors.keagamaanid &&
                                                    "ID SIMAS wajib terdiri dari 15 Angka & Tanpa TITIK"
                                                }
                                                onKeyDown={(e) =>
                                                    exceptThisSymbols.includes(
                                                        e.key
                                                    ) && e.preventDefault()
                                                }
                                                radius="md"
                                                disabled={loading}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <TextInput
                                                mt={15}
                                                type="number"
                                                label="No. NSPP/NSM"
                                                description="No. NSPP/NSM Min. 12 angka "
                                                placeholder="Contoh : 500015020000"
                                                value={form.values.keagamaanid}
                                                onChange={(event) =>
                                                    form.setFieldValue(
                                                        "keagamaanid",
                                                        event.currentTarget
                                                            .value
                                                    )
                                                }
                                                error={
                                                    form.errors.keagamaanid &&
                                                    "No. NSPP/NSM Min. 12 Angka"
                                                }
                                                onKeyDown={(e) =>
                                                    exceptThisSymbols.includes(
                                                        e.key
                                                    ) && e.preventDefault()
                                                }
                                                radius="md"
                                                disabled={loading}
                                            />
                                        )}

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
                                            label="1. File SURAT PERMOHONAN"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_suratpermohonan"
                                            )}
                                        />

                                        <FileInput
                                            label="2. File PROPOSAL"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_proposal"
                                            )}
                                        />

                                        <FileInput
                                            label="3. File RAB"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps("file_rab")}
                                        />

                                        <FileInput
                                            label="4. File SK Pengurus"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps("file_sk")}
                                        />

                                        <FileInput
                                            label="5. File KTP Pengurus"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps("file_ktp")}
                                        />

                                        {type === "masjid" && (
                                            <FileInput
                                                label="6. File SIMAS REKOM"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_asetrekom"
                                                )}
                                            />
                                        )}

                                        {type === "masjid" && (
                                            <FileInput
                                                label="7. File SUKET TIPOLOGI"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_suket"
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="6. File IZIN OPERASIONAL"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_izinoperasional"
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="7. File AKTA PENDIRIAN"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_aktapendirian"
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="8. File PENGESAHAN KEMENKUMHAM"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_pengesahankemenkumham"
                                                )}
                                            />
                                        )}
                                    </Stack>
                                </Fieldset>
                                <Center my={20}>
                                    <Button
                                        loading={loading}
                                        fullWidth
                                        type="submit"
                                        radius="md"
                                        onClick={handleShow}
                                        disabled={!form.isValid()}
                                    >
                                        Submit
                                    </Button>
                                </Center>
                            </form>
                        </Paper>
                    </ScrollArea>
                </Paper>
                <Modal
                    opened={show}
                    closeOnEscape={false}
                    closeOnClickOutside={false}
                    withCloseButton={false}
                    centered
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    yOffset="15vh"
                    xOffset={0}
                    scrollAreaComponent={ScrollArea.Autosize}
                    onClose={handleClose}
                >
                    {/* {permohonanCreated?.message === "Permohonan berhasil" ? (
                        hibahkuSuccessModalNotification
                    ) : (
                        <Text ta="center" inherit>
                            <div>Terjadi Kesalahan!</div> Silahkan refresh
                            halaman & harap untuk mengulang upload file
                            permohonan anda.
                            <Text ta="center" c="red" inherit>
                                {appError ? (
                                    <Text>
                                        {" "}
                                        <div>Pesan: </div>
                                        {appError}{" "}
                                    </Text>
                                ) : (
                                    <Text>
                                        <div>Pesan: </div> {serverError}
                                    </Text>
                                )}
                            </Text>
                            <Button
                                variant="subtle"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh
                            </Button>
                        </Text>
                    )} */}
                    {permohonanCreated && hibahkuSuccessModalNotification}

                    {appError ? (
                        <Text ta="center" inherit>
                            <div>Terjadi Kesalahan!</div> Silahkan refresh
                            halaman & harap untuk mengulang upload file
                            permohonan anda.
                            <Text ta="center" c="red" inherit>
                                <Text>
                                    <div>Pesan: </div>
                                    {appError}{" "}
                                </Text>
                            </Text>
                            <Button
                                variant="subtle"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh
                            </Button>
                        </Text>
                    ) : (
                        <Text ta="center" inherit>
                            <div>Terjadi Kesalahan!</div> Silahkan refresh
                            halaman & harap untuk mengulang upload file
                            permohonan anda.
                            <Text ta="center" c="red" inherit>
                                <Text>
                                    <div>Pesan: </div> {serverError}
                                </Text>
                            </Text>
                            <Button
                                variant="subtle"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh
                            </Button>
                        </Text>
                    )}
                    {/* {serverError && (
                        <Text ta="center" inherit>
                            <div>Terjadi Kesalahan!</div> Silahkan refresh
                            halaman & harap untuk mengulang upload file
                            permohonan anda.
                            <Text ta="center" c="red" inherit>
                                <Text>
                                    <div>Pesan: </div> {serverError}
                                </Text>
                            </Text>
                            <Button
                                variant="subtle"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh
                            </Button>
                        </Text>
                    )} */}
                </Modal>
            </Container>
            {/* </BackgroundImage> */}
        </>
    );
}
