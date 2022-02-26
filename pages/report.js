import { Title, Text } from "@mantine/core";
import ReportForm from "../components/ReportForm";

export default function Report() {

  return (
    <>
      <Title order={2} weight={800}>Wanna warn others?</Title>
      <Text mb={40}>Report what's happening where you are...</Text>

      <ReportForm />
    </>
  )
}