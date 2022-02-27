import { Box, Tabs } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { User, UserPlus } from "lucide-react";
import { LoginForm, SignupForm } from "../components/AuthForms";
import { UserContext } from "../context";
import { useRouter } from "next/router";

export default function Login() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => user !== null && router.push("/profile"), [user]);

    const _handleTabChange = (tabKey) => {
        setActiveTab(tabKey)
    }

    return (
        <Box m={10} >
            <Tabs active={activeTab} onTabChange={_handleTabChange} grow>
                <Tabs.Tab label="Login" tabKey="login" icon={<User />}>
                    <LoginForm/>
                </Tabs.Tab>
                <Tabs.Tab label="Sign Up" tabKey="signup" icon={<UserPlus />}>
                    <SignupForm/>
                </Tabs.Tab>
            </Tabs>
            
        </Box>
    );
}
