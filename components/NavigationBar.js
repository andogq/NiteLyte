import Link from "next/link";
import { Box, Grid, Center, Group, Divider } from "@mantine/core";
import { Settings, ShieldAlert, User } from "lucide-react";

const ICONS = [
    {
        icon: Settings,
        href: "/settings",
    },
    {
        icon: ShieldAlert,
        href: "/sos",
        size: 1.5,
        color: (colors) => colors.red[6],
        filled: true,
    },
    {
        icon: User,
        href: "/profile",
    },
];

function function_or_string(thing, param) {
    if (typeof thing === "function") return thing(param);
    else return thing;
}

export default function NavigationBar() {
    return (
        <>
            {/* Workaround to unstylable header::before */}
            <Grid justify='center' mb={5}>
                <Grid.Col span={3}><Divider size="xl" sx={{borderRadius: 5}}/></Grid.Col>
            </Grid>
            <Group
                position="apart"
                grow
                sx={(theme) => ({
                    padding: `${theme.spacing.xs}px 0`,
                })}
            >
                {ICONS.map((icon) => (
                    <Center key={icon.href}>
                        <Link href={icon.href}>
                            <Box
                                sx={(theme) => ({
                                    backgroundColor:
                                        icon.filled &&
                                        function_or_string(
                                            icon.color,
                                            theme.colors
                                        ),
                                    borderRadius: theme.radius.sm,

                                    display: "flex",
                                    alignItems: "center",

                                    padding: theme.spacing.md,
                                })}
                            >
                                <icon.icon
                                    color="white"
                                    size="2rem"
                                />
                            </Box>
                        </Link>
                    </Center>
                ))}
            </Group>
        </>
    );
}
