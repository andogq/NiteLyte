import { Box } from "@mantine/core";

import Map from "./Map";
import NavigationBar from "./NavigationBar";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function Layout({ children }) {
    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Map />

            <BottomSheet
                open
                blocking={false}
                header={<NavigationBar />}
                snapPoints={(state) => [
                    state.headerHeight,
                    state.maxHeight * 0.75,
                    state.maxHeight,
                ]}
                defaultSnap={() => 0}
            >
                <Box sx={theme => ({ padding: theme.spacing.md })}>
                    {/* Bottom sheet, app will go here */}
                    {children}
                </Box>
            </BottomSheet>
        </Box>
    );
}
