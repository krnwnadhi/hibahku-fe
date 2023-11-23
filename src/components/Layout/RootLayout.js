import { AppShell, Burger, Group, Text, Title, em } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import DarkButton from "../DarkButton/DarkButton";
import Footer from "../Footer/Footer";
import MenuMantine from "../Menu/MenuMantine";
import SideNav from "../SideNav/SideNav";

export default function RootLayout() {
    const [opened, { toggle }] = useDisclosure();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const { pathname } = useLocation();

    return (
        <AppShell
            // disabled={pathname.includes("admin")}
            layout="alt"
            header={{ height: 60 }}
            footer={{ height: 50 }}
            navbar={{
                width: isMobile ? 50 : 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
            // zIndex={1}
            withBorder={false}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Title order={4}>Selamat Datang, Admin!</Title>
                    <Group h="100%" px="md" justify="space-between">
                        <DarkButton />
                        <MenuMantine />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Text>HIBAHKU</Text>
                </Group>

                {/* <AppShell.Section component={ScrollArea}> */}
                <SideNav />
                {/* </AppShell.Section> */}
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <AppShell.Footer p="md">
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}
