import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { Divider } from "@mantine/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { nitelyteDark } from "../../styles/constants";
import {
    LoadingOverlay,
    TextInput,
    Box,
    Button,
    Title,
    Text,
} from "@mantine/core";
import { SubmitButton } from "../Buttons";

export default function EmergencyContactForm() {
    const emptyContact = {
        name: "",
        relationship: "",
        phone: "",
    };
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [contacts, setContacts] = useState([
        { ...emptyContact },
        { ...emptyContact },
    ]);

    const form = useForm({
        initialValues: {},
        validationRules: {},
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...contacts];
        list[index][name] = value;
        setContacts(list);
    };

    const handlePhoneChange = (value, index) => {
        const list = [...contacts];
        list[index]["phone"] = value;
        setContacts(list);
    };

    const handleRemoveClick = (index) => {
        const list = [...contacts];
        list.splice(index, 1);
        setContacts(list);
    };

    const handleAddClick = () => {
        setContacts([...contacts, { ...emptyContact }]);
    };

    const handleSubmit = (value) => {
        // setLoading(true);
        console.log(contacts);
        // TODO: connect to firebase
    };

    return (
        <div>
            <Title order={2}>Emergency Contacts</Title>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: "relative" }}
            >
                <LoadingOverlay visible={loading} />
                {contacts.map((x, i) => {
                    return (
                        <>
                            {i == 0 && <Title order={5}>Primary Contact</Title>}
                            {i == 1 && (
                                <Title order={5}>Secondary Contact</Title>
                            )}
                            <TextInput
                                required
                                label="Full Name"
                                name="name"
                                value={x.name}
                                onChange={(e) => handleInputChange(e, i)}
                                mt={5}
                                pattern="^[A-Za-z ,.'-]+$"
                                title="Please enter a valid name."
                            />
                            <TextInput
                                required
                                label="Relationship to Contact"
                                name="relationship"
                                value={x.relationship}
                                onChange={(e) => handleInputChange(e, i)}
                                mt={5}
                                pattern="^[A-Za-z '-]+$"
                                title="Please enter a valid relationship."
                            />
                            <Box mt={5}>
                                <Text variant="text" size="sm" weight="500">
                                    Phone Number
                                    <Text inherit component="span" color="red">
                                        *
                                    </Text>
                                </Text>
                                <PhoneInput
                                    // TODO: inputProps doesnt work
                                    // inputProps={{
                                    //   required: true,
                                    // }}
                                    country={"au"}
                                    onlyCountries={["au"]}
                                    isValid={(value) => {
                                        return value.length === 12;
                                    }}
                                    value={x.phone}
                                    onChange={(value) =>
                                        handlePhoneChange(value, i)
                                    }
                                    // TODO: prevent form from submitting when phone format is invalid
                                    // pattern="^(\+?61|0)4\d{8}$"
                                    // title="Invalid format."
                                    inputStyle={{
                                        backgroundColor: nitelyteDark[5],
                                        borderWidth: 0,
                                        color: nitelyteDark[0],
                                    }}
                                    buttonStyle={{
                                        backgroundColor: nitelyteDark[5],
                                        borderColor: nitelyteDark[4],
                                    }}
                                    dropdownStyle={{
                                        color: nitelyteDark[9],
                                    }}
                                />
                            </Box>
                            {contacts.length >= 3 && i >= 2 && (
                                <Text
                                    onClick={() => handleRemoveClick(i)}
                                    color="dimmed"
                                >
                                    - Remove
                                </Text>
                            )}
                            <br></br> <Divider variant="dashed" />
                        </>
                    );
                })}
                <Text onClick={handleAddClick} color="dimmed">
                    + Add more emergency contacts
                </Text>

                <br></br>
                <SubmitButton type="submit" text="Submit" />
            </form>
        </div>
    );
}
