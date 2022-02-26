import { Button } from "@mantine/core";

const OptionButton = ({ text }) => {
    return (
        <div>
            <Button variant="light" size="lg" fullWidth>
                {text}
            </Button>
        </div>
    );
};

export default OptionButton;
