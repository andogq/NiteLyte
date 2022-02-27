import { useState, useContext, useEffect } from "react";
import { Box, Button, Text, Modal, Loader } from "@mantine/core";
import { httpsCallable } from "firebase/functions";
import { functions } from "../lib/firebase";
import { UserContext } from "../context";
import Login from "./login";
import { ShieldAlert } from "lucide-react";

const sos = httpsCallable(functions, "sos");

export default function SOS() {
    const { user } = useContext(UserContext);
    const [emergency_contact, set_emergency_contact] = useState(null);
    const [error, set_error] = useState(null);
    const [loading, set_loading] = useState(false);

    const on_click = async () => {
        set_error(null);
        set_loading(true);

        let { data } = await sos();

        if (data.ok) set_emergency_contact({
            name: data.name,
            phone: data.phone
        });
        else set_error(data.message);

        set_loading(false);
    };

    const renderSos = () => (
        <>
            <Modal opened={emergency_contact !== null} onClose={() => set_emergency_contact(null)}>
                <Text size="sm" weight={500}>
                    A text message with your current location has been sent to {emergency_contact?.name} ({emergency_contact?.phone})
                </Text>
            </Modal>
            <Box>
                <Text
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        textAlign: "center",
                        fontSize: 20,
                    }}
                >
                    Press the 'Emergency SOS' button to alert your emergency
                    contacts with a text message
                </Text>
                {error && (
                    <Text
                        sx={theme => ({
                            color: theme.colors.red[5],
                            marginTop: 20,
                            marginBottom: 20
                        })}
                    >
                        {error}
                    </Text>
                )}
                <Button
                    variant="filled"
                    fullWidth
                    style={{ fontSize: 30, height: 50 }}
                    onClick={on_click}
                    leftIcon={loading ? <Loader color="white" size={30}/> : <ShieldAlert size={30} />}
                    sx={theme => ({
                        backgroundColor: theme.colors.red[6]
                    })}
                    disabled={loading}
                >
                    Emergency SOS
                </Button>
            </Box>
        </>
    );

    const renderScreen = () => {
        return user ? renderSos() : <Login />;
    };

    return <Box>{renderScreen()}</Box>;
}
