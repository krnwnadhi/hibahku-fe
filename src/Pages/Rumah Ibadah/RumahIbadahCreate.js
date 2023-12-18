import {
    Button,
    Center,
    Combobox,
    Container,
    Group,
    Input,
    InputBase,
    LoadingOverlay,
    Paper,
    Stack,
    Text,
    TextInput,
    useCombobox,
} from "@mantine/core";
import React, { useState } from "react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { createRumahIbadahAction } from "../../redux/slices/rumahIbadah/rumahIbadahSlices";
import { toast } from "react-toastify";

const RumahIbadahCreate = () => {
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
                { min: 15, max: 16 },
                "Nomor ID SIMAS Rumah Ibadah/ No. NSPP/ No. NSM berupa angka yang terdiri dari 15-16 Karakter"
            ),
            nama: hasLength({ min: 5, max: 50 }, "Nama minimal 5 karakter"),
            alamat: hasLength(
                { min: 5, max: 100 },
                "Alamat minimal 5 karakter"
            ),
            // wilayah: hasLength(
            //     { min: 3, max: 50 },
            //     "Kabkot minimal 3 karakter"
            // ),
            wilayah: isNotEmpty("Pilih Kabupaten/Kota"),
            kategoriid: isNotEmpty("Pilih Kategori"),
        },
    });

    const kategori = [
        {
            value: 1,
            description: "Masjid",
        },
        {
            value: 2,
            description: "Lembaga Pendidikan Keagamaan",
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

    const wilayah = [
        {
            value: 1,
            description: "Batanghari",
        },
        {
            value: 2,
            description: "Bungo",
        },
        {
            value: 3,
            description: "Kerinci",
        },
        {
            value: 4,
            description: "Merangin",
        },
        {
            value: 5,
            description: "Muaro Jambi",
        },
        {
            value: 6,
            description: "Sarolangun",
        },
        {
            value: 7,
            description: "Tanjung Jabung Barat",
        },
        {
            value: 8,
            description: "Tanjung Jabung Timur",
        },
        {
            value: 9,
            description: "Tebo",
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
        (item) => item.description === valueWilayah
    );

    const optionsWilayah = wilayah.map((item) => (
        <Combobox.Option value={item.description} key={item.value}>
            <SelectOptionWilayah {...item} />
        </Combobox.Option>
    ));

    const dispatch = useDispatch();

    const rumahIbadah = useSelector((state) => state?.rumahIbadah);
    const { appError, serverError, loading, createRumahIbadah } = rumahIbadah;

    // console.log(createRumahIbadah.message);

    const formOnSubmit = form.onSubmit(async (values) => {
        console.log(values);
        dispatch(createRumahIbadahAction(values));
        // form.clearErrors();
    });

    if (createRumahIbadah?.data) {
        toast.success(createRumahIbadah.message);
        return <Navigate to="/dashboard/rumah-ibadah/list" replace={true} />;
        // window.location.reload();
    } else {
        toast.error(appError);
    }

    return (
        <>
            <Container size="xs">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 1 }}
                />
                <Paper withBorder shadow="sm" p="xs">
                    <form onSubmit={formOnSubmit}>
                        <Stack gap="lg">
                            <TextInput
                                label="ID"
                                placeholder="ID SIMAS Rumah Ibadah/ No. NSPP/ No. NSM"
                                value={form.values.id}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "id",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.id && "15-16 Karakter"}
                                radius="md"
                            />
                            <TextInput
                                label="Nama Masjid/Lembaga Pendidikan Keagamaan"
                                placeholder="Min. 5 Karakter"
                                value={form.values.nama}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "nama",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.nama && "Min. 5 Karakter"}
                                radius="md"
                            />
                            <TextInput
                                label="Alamat Masjid/Lembaga Pendidikan Keagamaan"
                                placeholder="Alamat Lengkap(Nama jalan, RT/RW, Kelurahan, Kecamatan)"
                                value={form.values.alamat}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "alamat",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.alamat && "Min. 5 Karakter"}
                                radius="md"
                            />
                            {/* <TextInput
                                label="Kabupaten/Kota Masjid/Lembaga Pendidikan Keagamaan"
                                placeholder="Min. 5 Karakter"
                                value={form.values.wilayah}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "wilayah",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.wilayah && "Min. 5 Karakter"}
                                radius="md"
                            /> */}

                            {/* <TextInput
                            label="Kategori"
                            placeholder="Min. 5 Karakter"
                            value={form.values.kategoriid}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "kategoriid",
                                    event.currentTarget.value
                                )
                            }
                            // error={form.errors.kategoriid && "Min. 5 Karakter"}
                            radius="md"
                        /> */}

                            {/* Wilayah Kabupaten/Kota */}
                            <Combobox
                                store={comboboxWilayah}
                                withinPortal={false}
                                onOptionSubmit={(value) => {
                                    setValueWilayah(value);
                                    form.setFieldValue("wilayah", value);
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
                                        rightSection={<Combobox.Chevron />}
                                        onClick={() =>
                                            comboboxWilayah.toggleDropdown()
                                        }
                                        rightSectionPointerEvents="none"
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
                                        style={{ overflowY: "auto" }}
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
                                    form.setFieldValue("kategoriid", value);
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
                                        rightSection={<Combobox.Chevron />}
                                        onClick={() =>
                                            combobox.toggleDropdown()
                                        }
                                        rightSectionPointerEvents="none"
                                        multiline
                                        error={
                                            form.errors.kategoriid &&
                                            "Silahkan Pilih Kategori"
                                        }
                                    >
                                        {selectedOption ? (
                                            <SelectOption {...selectedOption} />
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

                        <Center my={15}>
                            <Button
                                // disabled={!form.isValid()}
                                type="submit"
                                radius="xl"
                            >
                                Submit
                            </Button>
                        </Center>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RumahIbadahCreate;
