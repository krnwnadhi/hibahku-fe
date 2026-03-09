import "dayjs/locale/id";

import {
    Anchor,
    Button,
    Center,
    Container,
    Fieldset,
    FileInput,
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
} from "@mantine/core";
import { IconCaretUpDown, IconFileTypePdf } from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { createPermohonan } from "../../../redux/slices/permohonan/permohonanSlices";
import dayjs from "dayjs";
import { nprogress } from "@mantine/nprogress";
import { useToggle } from "@mantine/hooks";

export default function UserPermohonan() {
    const dispatch = useDispatch();

    const permohonan = useSelector((state) => state?.permohonan);
    const { loading, appError, permohonanCreated } = permohonan;

    const [type, toggle] = useToggle(["masjid", "lembaga"]);

    const [show, setShow] = useState(false);

    const exceptThisSymbols = ["e", "E", "+", "-", ".", ","];

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
            file_sk: null,
            file_proposal: null,
            file_suratpermohonan: null,
            file_asetrekom: null,
            file_izinoperasional: null,
            file_aktapendirian: null,
            file_pengesahankemenkumham: null,
            file_npwp: null,
            file_suratdomisili: null,
            file_suratpernyataankeabsahan: null,
            file_suratpernyataantidakhibah: null,
            file_suratrekomkemenag: null,
            file_norekening: null,
        },

        validate: {
            keagamaanid: hasLength(
                { min: 10, max: 20 },
                "ID SIMAS Min. 10 angka",
            ),
            tujuan: hasLength({ min: 5, max: 50 }, "Tujuan minimal 5 karakter"),

            norek: hasLength({ min: 8, max: 10 }, "Min. 8 karakter"),
            file_ktp: isNotEmpty(
                "Tidak Boleh Kosong. Silahkan Upload File KTP.",
            ),
            file_rab: isNotEmpty(
                "Tidak Boleh Kosong. Silahkan Upload File RAB",
            ),
            file_sk: isNotEmpty("Tidak Boleh Kosong"),
            file_proposal: isNotEmpty("Tidak Boleh Kosong"),
            file_suratpermohonan: isNotEmpty("Tidak Boleh Kosong"),
            file_suratdomisili: isNotEmpty("Tidak Boleh Kosong"),
            file_suratpernyataankeabsahan: isNotEmpty("Tidak Boleh Kosong"),
            file_suratpernyataantidakhibah: isNotEmpty("Tidak Boleh Kosong"),
            file_suratrekomkemenag: isNotEmpty("Tidak Boleh Kosong"),
            // file_asetrekom: isNotEmpty("Tidak Boleh Kosong"),
            file_norekening: isNotEmpty("Tidak Boleh Kosong"),
        },
    });

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(createPermohonan(values));
    });

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
            <Text ta="center" size="sm">
                Permohonan Anda DITERIMA
            </Text>
            <Text ta="center" size="sm">
                ({today})
            </Text>

            <Space h="md" />

            <Text ta="center" size="sm">
                Selanjutnya, untuk mengetahui perkembangan permohonan anda,
                silahkan klik fitur
                <Anchor href={`/dashboard/user/beranda`}>
                    <Text c="blue" fs="italic">
                        "PROGRES HIBAHKU"
                    </Text>{" "}
                </Anchor>
            </Text>

            <Space h="xl" />

            <Text ta="center" size="sm">
                Terima Kasih
            </Text>
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
            <Container size="lg">
                <Paper
                    h="90vh"
                    p="xl"
                    withBorder
                    style={{
                        backgroundColor:
                            "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                    }}
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
                                                            .value,
                                                    )
                                                }
                                                error={
                                                    form.errors.keagamaanid &&
                                                    "ID SIMAS wajib terdiri dari 15 Angka & Tanpa TITIK"
                                                }
                                                onKeyDown={(e) =>
                                                    exceptThisSymbols.includes(
                                                        e.key,
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
                                                            .value,
                                                    )
                                                }
                                                error={
                                                    form.errors.keagamaanid &&
                                                    "No. NSPP/NSM Min. 12 Angka"
                                                }
                                                onKeyDown={(e) =>
                                                    exceptThisSymbols.includes(
                                                        e.key,
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
                                                    event.currentTarget.value,
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
                                                    event,
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
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.norek &&
                                                "Min. 8 karakter"
                                            }
                                            maxLength={10}
                                        />

                                        <FileInput
                                            label="1. Surat Permohonan Bantuan Hibah"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_suratpermohonan",
                                            )}
                                        />

                                        <FileInput
                                            label="2. Proposal"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_proposal",
                                            )}
                                        />

                                        <FileInput
                                            label="3. Rencana Anggaran Biaya (RAB)"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps("file_rab")}
                                        />

                                        {type === "masjid" && (
                                            <FileInput
                                                label="4. SK Pengurus Rumah Ibadah terbaru(masih berlaku)"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_sk",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="4. SK Pengurus Yayasan/Lembaga terbaru(masih berlaku)"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_sk",
                                                )}
                                            />
                                        )}

                                        {type === "masjid" && (
                                            <FileInput
                                                label="5. KTP Ketua Pengurus Rumah Ibadah"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_ktp",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="5. KTP Ketua Pengurus Yayasan/Lembaga"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_ktp",
                                                )}
                                            />
                                        )}

                                        {type === "masjid" && (
                                            <FileInput
                                                label="6. Surat Pernyataan Keabsahan dokumen dari Ketua Pengurus Rumah Ibadah"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_suratpernyataankeabsahan",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="6. Surat Pernyataan Keabsahan dokumen dari Ketua Pengurus Yayasan/Lembaga"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_suratpernyataankeabsahan",
                                                )}
                                            />
                                        )}

                                        <FileInput
                                            label="7. Surat Pernyataan Tidak sedang menerima hibah sejenis dari APBD pada tahun anggaran yang sama"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_suratpernyataantidakhibah",
                                            )}
                                        />

                                        <FileInput
                                            label="8. Surat Rekomendasi dari Kementerian Agama Kabupaten/Kota"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_suratrekomkemenag",
                                            )}
                                        />

                                        <FileInput
                                            label="9. Surat Keterangan Domisili dari pemerintah setempat"
                                            description="Hanya PDF & Ukuran File Maksimal 5MB."
                                            accept="application/pdf"
                                            clearable
                                            leftSection={icon}
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps(
                                                "file_suratdomisili",
                                            )}
                                        />

                                        {type === "masjid" && (
                                            <FileInput
                                                label="10. Surat Keterangan terdaftar ID Rumah Ibadah dalam Sistem Informasi di Kementerian Agama Republik Indonesia"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_asetrekom",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="10. Izin Operasional yang masih aktif dari Kementerian Agama Republik Indonesia"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_izinoperasional",
                                                )}
                                            />
                                        )}

                                        {type === "masjid" && (
                                            <FileInput
                                                label="11. Rekening Bank Jambi atas nama Yayasan/Lembaga yang masih Aktif;"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_norekening",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="11. Akta Notaris Pendirian (*Khusus Yayasan)"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_aktapendirian",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="12. Pengesahan pendirian badan hukum dari Kementerian Hukum Republik Indonesia"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_pengesahankemenkumham",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="13. NPWP Yayasan/Lembaga"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_npwp",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="14. NSPP/NSM dari Kementerian Agama Republik Indonesia"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_suket",
                                                )}
                                            />
                                        )}

                                        {type === "lembaga" && (
                                            <FileInput
                                                label="15. Rekening Bank Jambi atas nama Yayasan/Lembaga yang masih Aktif;"
                                                description="Hanya PDF & Ukuran File Maksimal 5MB."
                                                accept="application/pdf"
                                                clearable
                                                leftSection={icon}
                                                valueComponent={ValueComponent}
                                                {...form.getInputProps(
                                                    "file_norekening",
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
                    ) : null}

                    {/* {serverError ? (
                        <Text ta="center" inherit>
                            <div>Terjadi Kesalahan!</div> Silahkan refresh
                            halaman & harap untuk mengulang upload file
                            permohonan anda.
                            <Text ta="center" c="red" inherit>
                                <Text>
                                    <div>Pesan: </div>
                                    {serverError}{" "}
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
                    ) : null} */}
                </Modal>
            </Container>
        </>
    );
}
