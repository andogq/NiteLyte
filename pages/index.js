import { Box, Button } from "@mantine/core";
import Link from "next/link"

export default function Home() {
    return (
        <>
            <Box>General Info</Box>
            <Link href="/login" passHref>
                <Button component="a">Next link button</Button>
            </Link>
        </>
    );
}
