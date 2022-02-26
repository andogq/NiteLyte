import { useState, useContext, useEffect } from "react";
import { Box, Button, Text, Modal } from "@mantine/core";
import { httpsCallable } from "firebase/functions";
import { functions } from "../lib/firebase";
import { UserContext } from "../context";
import Login from "./login";
import { auth } from '../lib/firebase';
import { retrieveUserDetails } from "./api/firebase_auth";
import {ShieldAlert} from "lucide-react";

const send_message = httpsCallable(functions, "send_message");

export default function SOS() {

    const {user, setUser} = useContext(UserContext);
    const [opened, setOpened] = useState(false);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            retrieveUserDetails(user.uid)
                .then(setUser(user))
                .catch((error)=>console.log(error))
            } 
        })
        // cleanup to prevent memory leaks
        return unsubscribe;
    }, [])

    const on_click = () => {
        console.log("Sending message");
        send_message();
        setOpened(true);
    }

    const renderSos =() => (
        <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
        >
            <Text size="sm" weight={500}>
            A text message with your current location has been sent to your emergency contacts! 
            </Text>
        </Modal>
        <Box>

            <Text style={{ marginTop: 20, marginBottom: 20, textAlign: 'center', fontSize: 20}}>Press the 'Emergency SOS' button to alert your emergency contacts with a text message</Text>
            <Button variant="filled" fullWidth style={{fontSize: 30, height: 50}} onClick={on_click} leftIcon={<ShieldAlert size={30}/> }>Emergency SOS</Button>
        </Box>
        </>
    )

    const renderScreen = () => {
        return (
            user ?
                renderSos():
                <Login/ >
        );
    }

    return (
        <Box>{renderScreen()}</Box>
    );
}