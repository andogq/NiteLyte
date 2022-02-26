import twilio from "twilio";

export function send(number, message) {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages.create({ to: number, from: process.env.TWILIO_NUMBER, body: message });
}