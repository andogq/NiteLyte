import { Box } from "@mantine/core";

export default function Layout({ children }) {
    return (
        <Box>
            <Box>
                {/* map */}
                Map stuff wow
            </Box>
            <Box>
                {/* Bottom sheet, app will go here */}
                {children}
            </Box>
        </Box>
    );
}
