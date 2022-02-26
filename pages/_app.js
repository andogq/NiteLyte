import "../styles/globals.css";
import { MantineProvider } from '@mantine/core';
import { useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context";

function MyApp({ Component, pageProps }) {

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user,setUser}}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: 'dark' }}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MantineProvider>
        </UserContext.Provider>
    );
}

export default MyApp;
