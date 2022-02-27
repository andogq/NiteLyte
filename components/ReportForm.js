import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { LoadingOverlay, Textarea } from "@mantine/core";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { Timestamp } from "firebase/firestore";
import { SubmitButton } from "./Buttons";

export default function ReportForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const form = useForm({
        // form object is in charge of everything except for phone
        initialValues: {
            description: "",
        },
        validationRules: {
            description: (value) => value.length > 0,
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);

        const timestamp = Timestamp.fromDate(new Date());
        const reportEntry = {
            description: values.description,
            timestamp: timestamp,
            location: {
                // TODO: Ando needs to rewrite these into the user's current locale
                lat: 0,
                lng: 0,
            },
        };
        //TODO: dont forget to incorporate phone in here
        try {
            await addDoc(collection(firestore, "reports"), reportEntry)
                .then(console.log("report stored!"))
                .catch((error) => console.log(error));
        } catch (error) {
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
            <Textarea
                required
                label="Description"
                placeholder="Keep it short and sweet."
                error={
                    form.errors.description &&
                    (serverError || "You need to put in something...")
                }
                value={form.values.description}
                onChange={(event) =>
                    form.setFieldValue("description", event.currentTarget.value)
                }
                onFocus={() => {
                    setServerError(null);
                    form.setFieldError("email", false);
                }}
                mt={5}
            />

            <br></br>
            <SubmitButton type="submit" text="Submit" />
        </form>
    );
}
