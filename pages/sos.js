import { useState } from "react";
import { Box, Button, Text, Modal } from "@mantine/core";
import { httpsCallable } from "firebase/functions";
import { functions } from "../lib/firebase";

const send_message = httpsCallable(functions, "send_message");

export default function SOS() {

    const [opened, setOpened] = useState(false);

    const on_click = () => {
        console.log("Sending message");
        send_message();
        setOpened(true);
    }
    
    return (
        <Box>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                Message has been sent to the authorities and your emergency contacts! 
                </Text>
            </Modal>
            <Text>Press the button to alert the authorities and your emergency contacts</Text>
            <Button onClick={on_click}>Send Help</Button>
        </Box>

    )
}