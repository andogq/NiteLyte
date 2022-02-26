import "../styles/globals.css";
import { MantineProvider, theme, useMantineTheme } from '@mantine/core';
import { useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context";
import { nitelyteDark } from "../styles/constants";

function MyApp({ Component, pageProps }) {

    const [user, setUser] = useState(null);

    const theme = useMantineTheme();
    
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
