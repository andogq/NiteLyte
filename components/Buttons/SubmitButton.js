import { Button } from "@mantine/core";

const SubmitButton = ({ text, onClick, href, type }) => (
    <Button onClick={onClick} size="lg" type={type} fullWidth>
        <a href={href}>{text}</a>
    </Button>
);

export default SubmitButton;
