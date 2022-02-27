import { Divider } from "@mantine/core";
import "react-phone-input-2/lib/style.css";
import { Title, SimpleGrid } from "@mantine/core";
import { DisabledOptionButton, OptionButton } from "../Buttons";

export default function ProfilePage({ user }) {
    return (
        <div>
            <Title order={2}>Profile</Title>
            <br />
            <SimpleGrid cols={1} spacing="xl">
                <DisabledOptionButton text={user.displayName} />
                <DisabledOptionButton text={user.email} />
                <DisabledOptionButton text={user.phoneNumber} />
                <OptionButton
                    text="Emergency Contacts"
                    href="/add_emergency_contact"
                />
                <OptionButton
                    text="Submit a Report"
                    href="/report"
                />
                <OptionButton text="Settings" href="/settings" />
                <OptionButton text="Help and Feedback" />
                <Divider />
            </SimpleGrid>
        </div>
    );
}
