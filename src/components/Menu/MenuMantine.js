import { ActionIcon, Group, Menu, Text, rem } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUserAction } from "../../redux/slices/auth/authSlices";
import { modals } from "@mantine/modals";

export default function MenuMantine() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.auth);
    const { isLogout } = user;

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: "Logout",
            centered: true,
            children: <Text size="sm">Anda yakin ingin logout?</Text>,
            labels: { confirm: "Log Out", cancel: "Batal" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                dispatch(logoutUserAction());
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
        });

    // //redirect
    if (isLogout) {
        return <Navigate to="/signin" replace={true} />;
    }

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
                    <Menu.Item
                        leftSection={
                            <IconLogout
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        }
                        component={Link}
                        onClick={openDeleteModal}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}
