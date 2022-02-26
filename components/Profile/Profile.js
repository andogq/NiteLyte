import { Divider } from "@mantine/core";
import "react-phone-input-2/lib/style.css";
import { Title, SimpleGrid } from "@mantine/core";
import { DisabledOptionButton, OptionButton } from "../Buttons";

export default function ProfilePage() {
    return (
        <div>
            <Title order={2}>Profile</Title>
            <br></br>
            <SimpleGrid cols={1} spacing="xl">
                <DisabledOptionButton text="test123" />
                <DisabledOptionButton text="test@mail.com" />
                <DisabledOptionButton text="614186029069" />
                <OptionButton text="Emergency Contacts" />
                <OptionButton text="Settings" href="/settings" />
                <OptionButton text="Help and Feedback" />
                <Divider />
            </SimpleGrid>
        </div>
    );
}
