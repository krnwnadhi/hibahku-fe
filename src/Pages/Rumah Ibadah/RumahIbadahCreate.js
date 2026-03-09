import {
    Button,
    Center,
    CloseButton,
    Combobox,
    Container,
    Fieldset,
    Group,
    Image,
    Input,
    InputBase,
    Modal,
    Paper,
    ScrollArea,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
    useCombobox,
    useComputedColorScheme,
} from "@mantine/core";
import { IconArrowLeft, IconCaretUpDown } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import DarkButton from "../User/components/DarkButton/DarkButton";
import MenuMantine from "../../components/Menu/MenuMantine";
import { createRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { nprogress } from "@mantine/nprogress";
import { useToggle } from "@mantine/hooks";

const RumahIbadahCreate = () => {
    const navigate = useNavigate();

    const [type, toggle] = useToggle(["masjid", "lembaga"]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 2500);
    };

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            id: "",
            nama: "",
            alamat: "",
            wilayah: "",
            kategoriid: null,
        },

        validate: {
            id: hasLength(
                { min: 12, max: 15 },
                "Nomor ID SIMAS Rumah Ibadah/ No. NSPP/ No. NSM berupa angka yang terdiri dari 15-16 Karakter",
            ),
            nama: hasLength({ min: 3, max: 50 }, "Nama minimal 3 karakter"),
            alamat: hasLength(
                { min: 5, max: 100 },
                "Alamat minimal 5 karakter",
            ),
            wilayah: isNotEmpty("Pilih Kabupaten/Kota"),
            kategoriid: isNotEmpty("Pilih Kategori"),
        },
    });

    // KATEGORI COMBOBOX START
    const kategori = [
        {
            value: 1,
            description: "Lembaga Pendidikan Keagamaan",
        },
        {
            value: 2,
            description: "Rumah Ibadah (Masjid/Musholla)",
        },
    ];

    function SelectOption({ value, description }) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {value}. {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState(null);
    const selectedOption = kategori.find((item) => item.value === value);

    const options = kategori.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <SelectOption {...item} />
        </Combobox.Option>
    ));
    // KATEGORI COMBOBOX END

    // WILAYAH COMBOBOX START
    const wilayah = [
        {
            value: 1,
            description: "Kab. Batanghari",
        },
        {
            value: 2,
            description: "Kab. Bungo",
        },
        {
            value: 3,
            description: "Kab. Kerinci",
        },
        {
            value: 4,
            description: "Kab. Merangin",
        },
        {
            value: 5,
            description: "Kab. Muaro Jambi",
        },
        {
            value: 6,
            description: "Kab. Sarolangun",
        },
        {
            value: 7,
            description: "Kab. Tanjung Jabung Barat",
        },
        {
            value: 8,
            description: "Kab. Tanjung Jabung Timur",
        },
        {
            value: 9,
            description: "Kab. Tebo",
        },
        {
            value: 10,
            description: "Kota Jambi",
        },
        {
            value: 11,
            description: "Kota Sungai Penuh",
        },
    ];

    function SelectOptionWilayah({ value, description }) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {value}. {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const comboboxWilayah = useCombobox({
        onDropdownClose: () => comboboxWilayah.resetSelectedOption(),
    });

    const [valueWilayah, setValueWilayah] = useState(null);
    const selectedOptionWilayah = wilayah.find(
        (item) => item.description === valueWilayah,
    );

    const optionsWilayah = wilayah.map((item) => (
        <Combobox.Option value={item.description} key={item.value}>
            <SelectOptionWilayah {...item} />
        </Combobox.Option>
    ));

    // WILAYAH COMBOBOX END

    const dispatch = useDispatch();

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { appError, loading, createRumahIbadah } = rumahIbadah;

    const formOnSubmit = form.onSubmit(async (values) => {
        try {
            dispatch(createRumahIbadahAction(values));
            form.reset();
            form.clearErrors();
            setValueWilayah(null);
            setValue(null);
        } catch (error) {
            throw new Error(error);
        }
    });

    const hibahkuErrorModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
                fallbackSrc="https://placehold.co/800?text=Logo+Jambi&font=roboto"
            />

            <Space h="md" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="md" />

            <Text ta="center" c="red" fw={700}>
                MAAF
            </Text>

            <Space h="md" />

            <Text ta="center">{appError && appError}</Text>

            <Space h="md" />

            <Text ta="center">
                Silahkan menggunakan ID SIMAS/NSPP lainnya yang belum terdaftar
                di database kami.
            </Text>

            <Space h="xl" />

            <Button fullWidth onClick={handleClose}>
                Saya Mengerti
            </Button>
        </>
    );

    const hibahkuSuccessModalNotification = (
        <>
            <Image
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1703043173/Coat_of_arms_of_Jambi.svg_iultjk.png"
                h={60}
                w="auto"
                fit="contain"
                mx="auto"
                fallbackSrc="https://placehold.co/800?text=Logo+Jambi&font=roboto"
            />

            <Space h="md" />

            <Title order={4} ta="center">
                BIRO KESRA SETDA PROVINSI JAMBI
            </Title>

            <Space h="md" />

            <Text ta="center" c="green" fw={700}>
                SELAMAT
            </Text>

            <Space h="md" />

            <Text ta="center">{createRumahIbadah?.message}</Text>

            <Space h="md" />

            <Text ta="center" size="sm">
                Selanjutnya, silahkan kembali ke beranda dan silahkan input
                kembali ID SIMAS/NSM/NSPP yang telah terdaftar untuk cek status
                dan melanjutkan permohonan.
            </Text>

            <Space h="xl" />

            <Button component={Link} to="/dashboard/user/beranda" fullWidth>
                Ke Beranda
            </Button>
        </>
    );

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    return (
        <>
            <Container size="lg">
                <Paper
                    p="xl"
                    withBorder
                    shadow="md"
                    radius="md"
                    style={{
                        backgroundColor:
                            "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-9))",
                    }}
                >
                    <Paper radius="md" p="md" bg="var(--mantine-color-body)">
                        <form onSubmit={formOnSubmit}>
                            <Fieldset
                                legend="Tambah Data"
                                radius="md"
                                p="xl"
                                disabled={loading}
                            >
                                <Stack gap="lg">
                                    <Button
                                        onClick={() => toggle()}
                                        variant="light"
                                        radius="lg"
                                        fullWidth
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
                                            type="number"
                                            label="ID SIMAS"
                                            description="ID SIMAS Min. 15 angka & Tanpa TITIK"
                                            value={form.values.id}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "id",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.id &&
                                                "ID SIMAS wajib terdiri dari 15 Angka & Tanpa TITIK"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {type === "lembaga" && (
                                        <TextInput
                                            type="number"
                                            label="No. NSPP/NSM"
                                            description="No. NSPP/NSM Lembaga Pendidikan Keagamaan"
                                            value={form.values.id}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "id",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.id &&
                                                "Min. 15 Angka"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {type === "masjid" && (
                                        <TextInput
                                            label="Nama"
                                            description="Nama Rumah Ibadah (Masjid/Musholla)"
                                            placeholder="Min. 3 Karakter"
                                            value={form.values.nama}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "nama",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.nama &&
                                                "Minimal 3 Karakter"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {type === "lembaga" && (
                                        <TextInput
                                            label="Nama"
                                            description="Nama Lembaga Pendidikan Keagamaan"
                                            placeholder="Min. 3 Karakter"
                                            value={form.values.nama}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "nama",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.nama &&
                                                "Mininmal 3 Karakter"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {type === "masjid" && (
                                        <TextInput
                                            label="Alamat Lengkap"
                                            description="Alamat Lengkap Rumah Ibadah (Masjid/Musholla)"
                                            placeholder="Jalan.. No.. RT.. RW.. Kel.. Kec.."
                                            value={form.values.alamat}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "alamat",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.alamat &&
                                                "Min. 5 Karakter"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {type === "lembaga" && (
                                        <TextInput
                                            label="Alamat Lengkap"
                                            description="Alamat Lengkap Lembaga Pendidikan Keagamaan"
                                            placeholder="Jalan, RT, RW, Kel, Kec"
                                            value={form.values.alamat}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "alamat",
                                                    event.currentTarget.value,
                                                )
                                            }
                                            error={
                                                form.errors.alamat &&
                                                "Min. 5 Karakter"
                                            }
                                            radius="md"
                                        />
                                    )}

                                    {/* Wilayah Kabupaten/Kota */}
                                    <Combobox
                                        store={comboboxWilayah}
                                        withinPortal={false}
                                        onOptionSubmit={(value) => {
                                            setValueWilayah(value);
                                            form.setFieldValue(
                                                "wilayah",
                                                value,
                                            );
                                            comboboxWilayah.closeDropdown();
                                        }}
                                        transitionProps={{
                                            duration: 200,
                                            transition: "pop",
                                        }}
                                    >
                                        <Combobox.Target>
                                            <InputBase
                                                label="Kabupaten/Kota"
                                                component="button"
                                                type="button"
                                                pointer
                                                onClick={() =>
                                                    comboboxWilayah.toggleDropdown()
                                                }
                                                rightSectionPointerEvents={
                                                    valueWilayah === null
                                                        ? "none"
                                                        : "all"
                                                }
                                                rightSection={
                                                    valueWilayah !== null ? (
                                                        <CloseButton
                                                            size="sm"
                                                            onMouseDown={(
                                                                event,
                                                            ) =>
                                                                event.preventDefault()
                                                            }
                                                            onClick={() =>
                                                                setValueWilayah(
                                                                    null,
                                                                )
                                                            }
                                                            aria-label="Clear value"
                                                        />
                                                    ) : (
                                                        <Combobox.Chevron />
                                                    )
                                                }
                                                multiline
                                                error={
                                                    form.errors.wilayah &&
                                                    "Silahkan Pilih Kabupaten/Kota"
                                                }
                                            >
                                                {selectedOptionWilayah ? (
                                                    <SelectOptionWilayah
                                                        {...selectedOptionWilayah}
                                                    />
                                                ) : (
                                                    <Input.Placeholder>
                                                        Pilih kabupaten/Kota
                                                    </Input.Placeholder>
                                                )}
                                            </InputBase>
                                        </Combobox.Target>

                                        <Combobox.Dropdown>
                                            <Combobox.Options
                                                mah={200}
                                                type="scroll"
                                                style={{
                                                    overflowY: "auto",
                                                }}
                                            >
                                                {optionsWilayah}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>

                                    {/* Kategori */}
                                    <Combobox
                                        store={combobox}
                                        withinPortal={false}
                                        onOptionSubmit={(value) => {
                                            setValue(value);
                                            form.setFieldValue(
                                                "kategoriid",
                                                value,
                                            );
                                            combobox.closeDropdown();
                                        }}
                                        transitionProps={{
                                            duration: 200,
                                            transition: "pop",
                                        }}
                                    >
                                        <Combobox.Target>
                                            <InputBase
                                                label="Kategori"
                                                component="button"
                                                type="button"
                                                pointer
                                                rightSectionPointerEvents={
                                                    value === null
                                                        ? "none"
                                                        : "all"
                                                }
                                                rightSection={
                                                    value !== null ? (
                                                        <CloseButton
                                                            size="sm"
                                                            onMouseDown={(
                                                                event,
                                                            ) =>
                                                                event.preventDefault()
                                                            }
                                                            onClick={() =>
                                                                setValue(null)
                                                            }
                                                            aria-label="Clear value"
                                                        />
                                                    ) : (
                                                        <Combobox.Chevron />
                                                    )
                                                }
                                                onClick={() =>
                                                    combobox.toggleDropdown()
                                                }
                                                multiline
                                                error={
                                                    form.errors.kategoriid &&
                                                    "Silahkan Pilih Kategori"
                                                }
                                            >
                                                {selectedOption ? (
                                                    <SelectOption
                                                        {...selectedOption}
                                                    />
                                                ) : (
                                                    <Input.Placeholder>
                                                        Pilih Kategori
                                                    </Input.Placeholder>
                                                )}
                                            </InputBase>
                                        </Combobox.Target>

                                        <Combobox.Dropdown>
                                            <Combobox.Options>
                                                {options}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>
                                </Stack>
                            </Fieldset>

                            <Center my={20}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    radius="md"
                                    loading={loading}
                                    disabled={!form.isValid()}
                                    onClick={handleShow}
                                >
                                    Submit
                                </Button>
                            </Center>
                        </form>
                    </Paper>
                </Paper>
            </Container>

            {/* MODAL */}
            <Modal
                opened={show}
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                yOffset="15vh"
                xOffset={0}
                scrollAreaComponent={ScrollArea.Autosize}
                closeOnEscape={false}
                closeOnClickOutside={false}
                withCloseButton={false}
            >
                {appError
                    ? hibahkuErrorModalNotification
                    : hibahkuSuccessModalNotification}
            </Modal>
        </>
    );
};

export default RumahIbadahCreate;
