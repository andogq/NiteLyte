import { Button } from "@mantine/core";

const OptionButton = ({ text, href }) => {
    return (
        <div>
            <Button variant="light" size="lg" fullWidth>
                <a href={href}>{text}</a>
            </Button>
        </div>
    );
};

export default OptionButton;
