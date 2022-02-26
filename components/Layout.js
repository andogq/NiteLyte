import { Box } from "@mantine/core";
import { useRef } from "react";

import Map from "./Map";
import NavigationBar from "./NavigationBar";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function Layout({ children }) {
    const bottom_sheet_ref = useRef(null);

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
                ref={bottom_sheet_ref}
                open
                blocking={false}
                header={<NavigationBar open={() => bottom_sheet_ref.current.snapTo(({ snapPoints }) => snapPoints[1])}/>}
                snapPoints={(state) => [
                    state.headerHeight,
                    state.maxHeight * 0.75,
                    state.maxHeight,
                ]}
                defaultSnap={({ snapPoints }) => snapPoints[1]}
            >
                <Box sx={theme => ({ padding: theme.spacing.md })}>
                    {/* Bottom sheet, app will go here */}
                    {children}
                </Box>
            </BottomSheet>
        </Box>
    );
}
