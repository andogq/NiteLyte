import { Button } from "@mantine/core";

const DisabledOptionButton = ({ text }) => {
    return (
        <div>
            <Button variant="outline" size="lg" fullWidth>
                {text}
            </Button>
        </div>
    );
};

export default DisabledOptionButton;
