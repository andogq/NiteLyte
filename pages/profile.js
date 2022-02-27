import { Box } from "@mantine/core";
import { auth } from "../lib/firebase";
import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { SimpleGrid } from "@mantine/core";
import { UserContext } from "../context";
import { ProfilePage } from "../components/Profile";
import { SubmitButton } from "../components/Buttons";

export default function Profile() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => user === null && router.push("/login"), [user]);

    const _handleSignOut = () => signOut(auth);

    return (
        <Box>
            {user && (
                <>
                    <ProfilePage user={user} />
                    <br />
                    <SimpleGrid cols={1} spacing="xl">
                        <SubmitButton
                            onClick={_handleSignOut}
                            text="Sign Out"
                        />
                    </SimpleGrid>
                </>
            )}
        </Box>
    );
}
