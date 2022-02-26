import { Box, Button, Text } from "@mantine/core";
import { auth } from "../lib/firebase";
import { useContext, useEffect } from "react";
import Login from "./login";
import { retrieveUserDetails } from "./api/firebase_auth";
import { signOut } from "firebase/auth";
import { UserContext } from "../context";

export default function Profile() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                retrieveUserDetails(user.uid)
                    .then(setUser(user))
                    .catch((error) => console.log(error));
            }
        });
        // cleanup to prevent memory leaks
        return unsubscribe;
    }, []);

    const _handleSignOut = () => {
        signOut(auth);
        setUser(null);
    };

    const renderProfile = () => (
        <>
            <Text>{auth.currentUser.email}</Text>
            <Button onClick={_handleSignOut}>Sign Out</Button>
        </>
    );

    const renderScreen = () => {
        return (
            user ?
                renderProfile():
                <Login/ >
        );
    }

    return <Box>{renderScreen()}</Box>;
}
