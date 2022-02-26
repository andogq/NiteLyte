import { Button } from "@mantine/core";

const OptionButton = ({ text, href }) => {
    if (href === "") {
        return (
            <div>
                <Button variant="light" size="lg" fullWidth>
                    {text}
                </Button>
            </div>
        );
    }
    return (
        <div>
            <Button variant="light" size="lg" fullWidth>
                <a href={href}>{text}</a>
            </Button>
        </div>
    );
};

export default OptionButton;
