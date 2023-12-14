import {
    AppShell,
    Burger,
    Group,
    ScrollArea,
    Text,
    Title,
    em,
} from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import DarkButton from "../DarkButton/DarkButton";
import Footer from "../Footer/Footer";
import MenuMantine from "../Menu/MenuMantine";
import SideNav from "../SideNav/SideNav";
import { useSelector } from "react-redux";

export default function RootLayout() {
    const [opened, { toggle }] = useDisclosure();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const user = useSelector((state) => state?.auth?.userAuth);
    // console.log(user);

    // const withouSidebarRoutess = ["/dashboard/user"];

    const { pathname } = useLocation();
    // if (withouSidebarRoutes.some((item) => pathname.includes(item)))
    //     return null;

    return (
        <AppShell
            disabled={pathname.includes("user")}
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
                    <Title order={4}>Selamat Datang, {user?.nama}!</Title>
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

                <AppShell.Section component={ScrollArea}>
                    <SideNav />
                </AppShell.Section>
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
