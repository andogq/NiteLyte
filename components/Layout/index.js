import css from "./layout.module.css";

import { Box } from "@mantine/core";

import Map from "../Map";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function Layout({ children }) {
    return (
        <Box className={css.container}>
            <Map/>

            <BottomSheet
                open
                blocking={false}
                header={(
                    <Box>
                        This will be some buttons
                    </Box>
                )}
                snapPoints={state => [
                    state.headerHeight,
                    state.maxHeight * 0.75,
                    state.maxHeight
                ]}
                defaultSnap={() => 0}
            >
                {/* Bottom sheet, app will go here */}
                {children}
            </BottomSheet>
        </Box>
    );
}
