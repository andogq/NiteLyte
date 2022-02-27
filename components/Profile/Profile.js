import { Divider } from "@mantine/core";
import "react-phone-input-2/lib/style.css";
import { Title, SimpleGrid } from "@mantine/core";
import { DisabledOptionButton, OptionButton } from "../Buttons";
import { useEffect } from "react";

export default function ProfilePage({ user }) {
    return (
        <div>
            <Title order={2}>Profile</Title>
            <br/>
            <SimpleGrid cols={1} spacing="xl">
                <DisabledOptionButton text={user.name} />
                <DisabledOptionButton text={user.email} />
                <DisabledOptionButton text={user.phone} />
                <OptionButton text="Emergency Contacts" href="/add_emergency_contact" />
                <OptionButton text="Settings" href="/settings" />
                <OptionButton text="Help and Feedback" />
                <Divider />
            </SimpleGrid>
        </div>
    );
}
