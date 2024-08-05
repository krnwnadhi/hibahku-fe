import { ActionIcon, Avatar, Group, Menu, Text, rem } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { logoutUserAction } from "../../redux/slices/auth/authSlices";
import { modals } from "@mantine/modals";

export default function MenuMantine() {
    const dispatch = useDispatch();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: "Logout",
            centered: true,
            children: <Text size="sm">Anda yakin ingin logout?</Text>,
            labels: { confirm: "Log Out", cancel: "Batal" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => dispatch(logoutUserAction()),
        });

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nama, nik } = user;

    return (
        <Group justify="center">
            <Menu
                trigger="hover"
                withArrow
                width={300}
                position="bottom"
                transitionProps={{ transition: "pop" }}
                withinPortal
            >
                <Menu.Target>
                    <ActionIcon variant="transparent">
                        <IconDotsVertical
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Group>
                            <Avatar
                                radius="xl"
                                src={`https://ui-avatars.com/api/?name=${nama}&background=random`}
                            />
                            <div>
                                <Text fw={500}>{nama}</Text>
                                <Text size="xs" c="dimmed">
                                    {nik}
                                </Text>
                            </div>
                        </Group>
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                        leftSection={
                            <IconLogout
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        }
                        component={Link}
                        onClick={openDeleteModal}
                        to="/signin"
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}
