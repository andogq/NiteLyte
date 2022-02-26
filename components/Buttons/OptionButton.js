import { Button } from "@mantine/core";
import Link from "next/link";

const OptionButton = ({ text, href = "" }) => (
    <div>
        <Button variant="light" size="lg" fullWidth>
            <Link href={href}>{text}</Link>
        </Button>
    </div>
);

export default OptionButton;
