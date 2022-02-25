import { Box, TextInput, Button, LoadingOverlay, PasswordInput, Tabs } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { User, UserPlus } from "lucide-react";
import { LoginForm, SignupForm } from "../components/AuthForms";

export default function Login() {

    const [activeTab, setActiveTab] = useState('');

    const _handleTabChange = (tabKey) => {
        setActiveTab(tabKey)
    }

    return (
        <Box m={10}>
            <Tabs active={activeTab} onTabChange={_handleTabChange}>
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
