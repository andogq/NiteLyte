import { Title, SimpleGrid, Divider } from "@mantine/core";
import { OptionButton, SubmitButton } from "../components/Buttons";

export default function Settings() {
    return (
        <div>
            <Title order={2}>Settings</Title>
            <br></br>
            <SimpleGrid cols={1} spacing="xl">
                <OptionButton text="Theme" />
                <OptionButton text="App Language" />
                <OptionButton text="Accessibility" />
                <OptionButton text="Change Password" />
                <Divider />
                <SubmitButton text="Back" href="/profile" />
            </SimpleGrid>
        </div>
    );
}
