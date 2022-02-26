import { useForm } from "@mantine/hooks";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  LoadingOverlay,
  TextInput,
  Box,
  Button,
  Title,
  Text,
} from "@mantine/core";

export default function EmergencyContactForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [phone, setPhone] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      relationship: "",
      phone: "",
    },
    validationRules: {
      name: (value) => /^[a-z ,.'-]+$/i.test(value),
      relationship: (value) => /^[a-z '-]+$/i.test(value),
    },
  });

  const handleSubmit = (values) => {
    values.phone = phone;
    console.log(values);
    // TODO: connect to firebase
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ position: "relative" }}
    >
      <LoadingOverlay visible={loading} />

      <Title order={3}>Emergency Contact</Title>

      <TextInput
        required
        label="Full Name"
        error={
          form.errors.name && (serverError || "Please enter a valid name.")
        }
        value={form.values.name}
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        onFocus={() => {
          setServerError(null);
          form.setFieldError("name", false);
        }}
        mt={5}
      />

      <TextInput
        required
        label="Relationship to Contact"
        error={
          form.errors.relationship &&
          (serverError || "Please enter a valid relationship.")
        }
        value={form.values.relationship}
        onChange={(event) =>
          form.setFieldValue("relationship", event.currentTarget.value)
        }
        onFocus={() => {
          setServerError(null);
          form.setFieldError("relationship", false);
        }}
        mt={5}
      />

      <Box mt={5}>
        <Text variant="text" size="sm" weight="500">
          Phone Number{" "}
          <Text inherit component="span" color="red">
            *
          </Text>
        </Text>
        <PhoneInput
          country={"au"}
          value={form.values.phone}
          onChange={(value) => {
            console.log(value);
            setPhone(value);
          }}
        />
      </Box>

      <Button type="submit" mt={20}>
        Login
      </Button>
    </form>
  );
}
