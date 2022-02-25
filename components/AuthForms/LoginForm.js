import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { LoadingOverlay, TextInput, PasswordInput , Button} from "@mantine/core";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    initialValues: { 
        email: '' ,
        password: ''
    },
    validationRules: {
        email: (value) => /^\S+@\S+$/.test(value),
        password: (value) => value.trim().length >= 8
    },
  });
  
  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        if (values.email === 'test@mantine.dev') {
            setServerError('Email already taken');
            form.setFieldError('email', true);
        }   
    }, 1500);
  };
  
  
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
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

      <PasswordInput
          required
          label="Password"
          placeholder="Do you remember?"
          error={form.errors.password && (serverError || 'Password is less than 8 characters long.')}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          onFocus={() => {
              setServerError(null);
              form.setFieldError('password', false);
          }}
          mt={5}
      />

      <Button type="submit" mt={20}>Login</Button>
    </form>
)}