import "../styles/globals.css";
import { MantineProvider } from '@mantine/core';

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: 'dark' }}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    );
}

export default MyApp;
