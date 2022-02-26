import { useForm } from "@mantine/hooks";
import { useState } from "react";
import {
    LoadingOverlay,
    TextInput,
    PasswordInput,
    Box,
    Text,
} from "@mantine/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveNewUser } from "../../pages/api/firebase_auth";
import { nitelyteDark } from "../../styles/constants";
import { SubmitButton } from "../Buttons";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    // phone error is handled externally
    const [phone, setPhone] = useState("");

    const form = useForm({
        // form object is in charge of everything except for phone
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationRules: {
            name: (value) => value.trim().length <= 100,
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => value.trim().length >= 8,
            confirmPassword: (value, values) => value === values.password,
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        //TODO: dont forget to incorporate phone in here
        try {
            const creds = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            saveNewUser({
                ...creds.user,
                name: values.name,
                phone: phone,
            });
        } catch (error) {
            console.error(error);
            setServerError(error.message);
            form.setFieldError("email", true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: "relative" }}
        >
            <LoadingOverlay visible={loading} />
            <TextInput
                required
                label="Full Name"
                placeholder="EggsBenedict Cucumberbatch"
                error={
                    form.errors.name &&
                    (serverError || "Is your name really that long? 🤣")
                }
                value={form.values.name}
                onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                }
                onFocus={() => {
                    setServerError(null);
                    form.setFieldError("email", false);
                }}
                mt={5}
            />

            <TextInput
                required
                label="Email"
                placeholder="your@email.com"
                error={
                    form.errors.email &&
                    (serverError || "Please specify a valid email.")
                }
                value={form.values.email}
                onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                }
                onFocus={() => {
                    setServerError(null);
                    form.setFieldError("email", false);
                }}
                mt={5}
            />

            <Box mt={5}>
                <Text
                    variant="text"
                    weight="500"
                    style={{ "font-size": "16px", color: "#acaebf" }}
                >
                    Phone Number{" "}
                    <Text inherit component="span" color="red">
                        *
                    </Text>
                </Text>
                <PhoneInput
                    country={"au"}
                    onlyCountries={["au"]}
                    value={form.values.phone}
                    onChange={setPhone}
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
                    dropdownClass="phoneInputDropdown"
                />
            </Box>

            <PasswordInput
                required
                label="Password"
                placeholder="Put 'password'. I dare you."
                error={
                    form.errors.password &&
                    (serverError || "Password is less than 8 characters long.")
                }
                value={form.values.password}
                onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                }
                onFocus={() => {
                    setServerError(null);
                    form.setFieldError("password", false);
                }}
                mt={5}
            />

            <PasswordInput
                required
                label="Confirm Password"
                placeholder="Put 'password' again. I double dare you."
                error={
                    form.errors.confirmPassword &&
                    (serverError ||
                        "Make sure confirm password and password match.")
                }
                value={form.values.confirmPassword}
                onChange={(event) =>
                    form.setFieldValue(
                        "confirmPassword",
                        event.currentTarget.value
                    )
                }
                onFocus={() => {
                    setServerError(null);
                    form.setFieldError("password", false);
                }}
                mt={5}
            />

            <br></br>
            <SubmitButton type="submit" text="Sign Up" />
        </form>
    );
}
