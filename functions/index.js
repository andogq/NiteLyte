import functions from "firebase-functions";
import { send } from "./lib/twilio.js"

export const send_message = functions.https.onCall(async (data, context) => {
    console.log("Sending text message");

    //send("phone_number", "Hello this is a test");
});