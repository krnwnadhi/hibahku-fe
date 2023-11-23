import {
    ActionIcon,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import React from "react";

const DarkButton = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
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
                variant="filled"
                // size="xl"
                aria-label="Toggle color scheme"
            >
                {computedColorScheme === "light" ? (
                    <IconMoon stroke={1.5} size={16} />
                ) : (
                    <IconSun stroke={1.5} size={16} />
                )}
            </ActionIcon>
        </>
    );
};

export default DarkButton;
