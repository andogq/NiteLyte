import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { LoadingOverlay, TextInput, PasswordInput } from "@mantine/core";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../context";
import { SubmitButton } from "../Buttons";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const { user, setUser } = useContext(UserContext);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => value.trim().length >= 8,
        },
        errorMessages: {
            email: "Please recheck your credentials.",
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const creds = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            setUser(creds.user);
        } catch (error) {
            setServerError(error.message);
            form.setFieldError("email", true);
            form.setFieldError("password", true);
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

            <PasswordInput
                required
                label="Password"
                placeholder="Do you remember?"
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
            <br></br>
            <SubmitButton type="submit" text="Login" />
        </form>
    );
}
