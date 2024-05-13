import {
    Anchor,
    AppShell,
    Burger,
    Code,
    Group,
    Image,
    ScrollArea,
    Title,
    em,
    useComputedColorScheme,
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
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });
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
            footer={{ height: 60 }}
            // navbar={{
            //     width: isMobile ? 50 : 300,
            //     breakpoint: "sm",
            //     collapsed: { mobile: !opened },
            // }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Burger
                        opened={desktopOpened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="sm"
                    />
                    <Group h="100%" px="md" justify="space-between">
                        <DarkButton />
                        <MenuMantine />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Group justify="space-between">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    {computedColorScheme === "light" ? (
                        <Anchor href="/dashboard">
                            <Image
                                loading="lazy"
                                radius="md"
                                w={125}
                                fit="contain"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/y1rm0hmh9kjhotng6nfh.png"
                                fallbackSrc="https://placehold.co/500x100/FFFFFF/000000/png?text=HIBAHKU+LOGO"
                            />
                        </Anchor>
                    ) : (
                        <Anchor href="/dashboard">
                            <Image
                                loading="lazy"
                                radius="md"
                                w={125}
                                fit="contain"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1705283295/exer0f4xop5yo13nj4c8.png"
                                fallbackSrc="https://placehold.co/500x100/1A1B1E/FFFFFF/png?text=HIBAHKU+LOGO"
                            />
                        </Anchor>
                    )}
                    <Code fw={500}>v1.0.0</Code>
                </Group>

                <AppShell.Section component={ScrollArea} grow>
                    <SideNav />
                </AppShell.Section>
                <AppShell.Section>
                    {" "}
                    <Title order={5}>Selamat Datang, {user?.nama}!</Title>
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
