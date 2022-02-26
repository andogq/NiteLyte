import { Button } from "@mantine/core";

const SubmitButton = ({ text, onClick, href }) => (
    <Button onClick={onClick} size="lg" fullWidth>
        <a href={href}>{text}</a>
    </Button>
);

export default SubmitButton;
