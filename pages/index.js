import { Box, Button, Text } from "@mantine/core";
import { Title } from "@mantine/core";

import Link from "next/link";

export default function Home() {
    return (
        <Box>
            <Title order={2}>We are NiteLyte.</Title>

            <Text my={20}>
                Nitelyte helps you navigate your way through the night safely
                by dodging low-light areas, dodgy alleyways, or risky happenings in the city.
            </Text>

            <Link href="/login" passHref>
                <Button component="a">Take me to the app!</Button>
            </Link>

        </Box>
    );
}
