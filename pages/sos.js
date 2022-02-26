import { Box, Button } from "@mantine/core";
import { httpsCallable } from "firebase/functions";
import { functions } from "../lib/firebase";

const send_message = httpsCallable(functions, "send_message");

export default function SOS() {
    const on_click = () => {
        console.log("Sending message");
        send_message();
    }
    
    return (
        <Box>
            <Button onClick={on_click}>Send</Button>
        </Box>
    )
}