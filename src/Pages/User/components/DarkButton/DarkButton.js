import {
    ActionIcon,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import React from "react";

const DarkButton = () => {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    return (
        <>
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="subtle"
                aria-label="Toggle color scheme"
            >
                {computedColorScheme === "light" ? (
                    <Tooltip
                        label="Mode Gelap"
                        withArrow
                        transitionProps={{ transition: "pop", duration: 500 }}
                    >
                        <IconMoon stroke={1.5} size={18} />
                    </Tooltip>
                ) : (
                    <Tooltip
                        label="Mode Terang"
                        withArrow
                        transitionProps={{ transition: "pop", duration: 500 }}
                    >
                        <IconSun stroke={1.5} size={18} />
                    </Tooltip>
                )}
            </ActionIcon>
        </>
    );
};

export default DarkButton;
