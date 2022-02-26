import { Box } from "@mantine/core";
import { useState } from "react";
import { EmergencyContactForm } from "../components/Profile";

export default function AddEmergencyContact() {
    return (
      <Box m={10}>
        <EmergencyContactForm />
      </Box>
    );
}
