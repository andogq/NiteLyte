import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { Divider } from "@mantine/core";
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
  const [contacts, setContacts] = useState([
    {
      name: "",
      relationship: "",
      phone: "",
    },
    {
      name: "",
      relationship: "",
      phone: "",
    },
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

  const handleSubmit = (value) => {
    // setLoading(true);
    console.log(contacts);
    // TODO: connect to firebase
  };

  return (
    <div>
      <Title order={3}>Emergency Contact</Title>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ position: "relative" }}
      >
        <LoadingOverlay visible={loading} />
        {contacts.map((x, i) => {
          return (
            <>
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
                  country={"au"}
                  onlyCountries={["au"]}
                  isValid={(value) => {
                    return value.length === 12;
                  }}
                  value={x.phone}
                  onChange={(value) => handlePhoneChange(value, i)}
                  // TODO: prevent form from submitting when phone format is invalid
                  // pattern="^(\+?61|0)4\d{8}$"
                  // title="Invalid format."
                />
              </Box>
              <br></br> <Divider variant="dashed" />
            </>
          );
        })}
        <Button type="submit" mt={20}>
          Submit
        </Button>
      </form>

      <div style={{ marginTop: 20 }}>{JSON.stringify(contacts)}</div>
    </div>
  );
}
