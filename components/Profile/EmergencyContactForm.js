import { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { nitelyteDark } from "../../styles/constants";
import { LoadingOverlay, TextInput, Box, Title, Text, Button } from "@mantine/core";
import { UserContext } from "../../context";
import { updateUser } from "../../pages/api/firebase_auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

export default function EmergencyContactForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({
        name: "",
        relationship: "",
        phone: "",
    });

    const { user } = useContext(UserContext);

    useState(() => user !== null && setContact({
        name: user.emergency_contact_name,
        phone: user.emergency_contact_phone,
        relationship: user.emergency_contact_relationship
    }), [user]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setContact((contact) => ({
            ...contact,
            [name]: value,
        }));
    };

    const handlePhoneChange = value => {
        setContact((contact) => ({
            ...contact,
            phone: value,
        }));
    };

    const handleSubmit = () => {
        setLoading(true);

        try {
            updateUser(auth.currentUser, {
                emergency_contact_name: contact.name,
                emergency_contact_relationship: contact.relationship,
                emergency_contact_phone: contact.phone,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            router.push("/profile");
        }
    };

    return (
        <div>
            <Title order={2}>Emergency Contacts</Title>

            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
                <LoadingOverlay visible={loading} />
                <Title order={4}>Emergency Contact</Title>
                <TextInput
                    required
                    label="Full Name"
                    name="name"
                    value={contact.name}
                    onChange={handleInputChange}
                    mt={5}
                    pattern="^[A-Za-z ,.'-]+$"
                    title="Please enter a valid name."
                />
                <TextInput
                    required
                    label="Relationship to Contact"
                    name="relationship"
                    value={contact.relationship}
                    onChange={handleInputChange}
                    mt={5}
                    pattern="^[A-Za-z '-]+$"
                    title="Please enter a valid relationship."
                />
                <Box mt={5}>
                    <Text
                        variant="text"
                        weight="500"
                        style={{
                            fontSize: "16px",
                            color: "#acaebf",
                        }}
                    >
                        Phone Number{" "}
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
                        value={contact.phone}
                        onChange={handlePhoneChange}
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

                <Text
                    size="sm"
                    style={{
                        color: "#acaebf",
                        paddingTop: 20
                    }}
                >
                    Multiple emergency contacts coming soon...
                </Text>

                <br />
                <Button size="lg" fullWidth onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    );
}
