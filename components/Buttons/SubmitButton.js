import { Button } from "@mantine/core";
import Link from "next/link";

const SubmitButton = ({ text, onClick, href = "", type }) => (
    <Button onClick={onClick} size="lg" type={type} fullWidth>
        <Link href={href}>{text}</Link>
    </Button>
);

export default SubmitButton;
