import "../styles/globals.css";
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context";
import { nitelyteDark } from "../styles/constants";
import { auth } from "../lib/firebase";
import { retrieveUserDetails } from "./api/firebase_auth";

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);
    const theme = useMantineTheme();

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(
                    await retrieveUserDetails(user.uid)
                        .then(u => ({ ...u, uid: user.uid }))
                        .catch(() => null)
                );
            } else setUser(null);
        });
    }, []);

    return (
        <UserContext.Provider value={{user,setUser}}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ 
                    colorScheme: 'dark' ,
                    colors: {
                        brand: theme.colors.violet,
                        dark: nitelyteDark, 
                    },
                    primaryColor: 'brand',
                    
                }}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MantineProvider>
        </UserContext.Provider>
    );
}

export default MyApp;
