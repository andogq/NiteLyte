import { Title, SimpleGrid, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { OptionButton } from "../components/Buttons";
import { UserContext } from "../context";

export default function Settings() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => user === null && router.push("/login"), [user]);

    return (
        <Box>
            {user !== null && (
                <>
                    <Title order={2}>Settings</Title>
                    <br></br>
                    <SimpleGrid cols={1} spacing="xl">
                        <OptionButton text="Theme" />
                        <OptionButton text="App Language" />
                        <OptionButton text="Accessibility" />
                        <OptionButton text="Change Password" />
                    </SimpleGrid>
                </>
            )}
        </Box>
    );
}
