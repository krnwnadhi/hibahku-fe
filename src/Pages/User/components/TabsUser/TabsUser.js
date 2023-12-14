import { Center, Portal, Tabs, rem } from "@mantine/core";
import { IconHome, IconList, IconMailPlus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import UserPermohonan from "../../Page/UserPermohonan";
import classes from "./TabsUser.module.css";

export default function TabsUser() {
    const navigate = useNavigate();
    const { tabValue } = useParams();

    const tabStyle = {
        position: "fixed",
        left: "initial",
        right: "initial",
        bottom: rem(25),
        padding: "var(--mantine-spacing-sm)",
        zIndex: 100000,
        backgroundColor: "var(--mantine-color-body)",
        borderRadius: "var(--mantine-radius-md)",
    };

    return (
        <>
            <Portal>
                <Center>
                    <Tabs
                        value={tabValue}
                        onChange={(value) =>
                            navigate(`/dashboard/user/${value}`)
                        }
                        variant="pills"
                        defaultValue="beranda"
                        style={tabStyle}
                    >
                        <Tabs.Panel value="beranda" pb="xs">
                            Chat panel
                        </Tabs.Panel>
                        <Tabs.Panel value="permohonan" pb="xs">
                            <UserPermohonan />
                        </Tabs.Panel>
                        <Tabs.Panel value="status" pb="xs">
                            Account panel
                        </Tabs.Panel>
                        <Tabs.List>
                            <Tabs.Tab
                                value="beranda"
                                leftSection={
                                    <IconHome
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                    />
                                }
                            >
                                Beranda
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="permohonan"
                                leftSection={
                                    <IconMailPlus
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                    />
                                }
                            >
                                Permohonan
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="status"
                                leftSection={
                                    <IconList
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                    />
                                }
                            >
                                Status
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Center>
            </Portal>
        </>
    );
}
