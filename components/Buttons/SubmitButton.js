import { Button } from "@mantine/core";

const SubmitButton = ({ text, onClick }) => (
    <Button onClick={onClick} size="lg" fullWidth>
        {text}
    </Button>
);

export default SubmitButton;
