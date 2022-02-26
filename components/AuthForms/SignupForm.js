import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { LoadingOverlay, TextInput, PasswordInput , Button, Box, Text} from "@mantine/core";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveNewUser } from "../../pages/api/firebase_auth";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    // phone error is handled externally 
    const [phone, setPhone] = useState('')

    const form = useForm({
    // form object is in charge of everything except for phone
    initialValues: { 
        name: '',
        email: '' ,
        password: '',
        confirmPassword: ''
    },
    validationRules: {
        name: (value) => value.trim().length <= 100,
        email: (value) => /^\S+@\S+$/.test(value),
        password: (value) => value.trim().length >= 8,
        confirmPassword: (value, values) => value === values.password,
    },
    });

    const handleSubmit = async (values) => {
        console.log("here")
        setLoading(true);
        //TODO: dont forget to incorporate phone in here
        try {
            const creds = await createUserWithEmailAndPassword(auth, values.email, values.password)
            saveNewUser({
                ...creds.user,
                name: values.name,
                phone: phone,
            })
        } catch (error) {
            console.log(error)
            setServerError(error.message);
            form.setFieldError('email', true)
        } finally {
            setLoading(false)
        }
    }
  
  
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <TextInput
            required
            label="Full Name"
            placeholder="EggsBenedict Cucumberbatch"
            error={form.errors.name && (serverError || 'Is your name really that long? 🤣')}
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            onFocus={() => {
                setServerError(null);
                form.setFieldError('email', false);
            }}
            mt={5}
        />

        <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            error={form.errors.email && (serverError || 'Please specify a valid email.')}
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            onFocus={() => {
                setServerError(null);
                form.setFieldError('email', false);
            }}
            mt={5}
        />

        <Box mt={5}>
        <Text variant="text" size="sm" weight="500">Phone Number <Text inherit component="span" color='red'>*</Text></Text>
        <PhoneInput
            country={'au'}
            value={form.values.phone}
            onChange={(value) => {console.log(value); setPhone(value)}}
            inputStyle={{
                backgroundColor: '#2C2E33',
                borderWidth: 0,
                color: '#A6A7AB'
            }}
            buttonStyle={{
                backgroundColor: '#2C2E33',
                borderColor: '#5c5f66',
            }}
            dropdownStyle={{
                color: 'black'
            }}
            dropdownClass="phoneInputDropdown"
        />
        </Box>


        <PasswordInput
            required
            label="Password"
            placeholder="Put 'password'. I dare you."
            error={form.errors.password && (serverError || 'Password is less than 8 characters long.')}
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            onFocus={() => {
                setServerError(null);
                form.setFieldError('password', false);
            }}
            mt={5}
        />

        <PasswordInput
            required
            label="Confirm Password"
            placeholder="Put 'password' again. I double dare you."
            error={form.errors.confirmPassword && (serverError || 'Make sure confirm password and password match.')}
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
            onFocus={() => {
                setServerError(null);
                form.setFieldError('password', false);
            }}
            mt={5}
        />

        <Button type="submit" mt={20}>Sign up</Button>
    </form>
)}