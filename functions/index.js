import functions from "firebase-functions";
import { send } from "./lib/twilio.js";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const send_message = functions.https.onCall(async (data, context) => {
    // Get the user making the request
    
    let uid = context.auth.uid;
    console.log(uid);

    if (uid) {
        let user = await db.collection("users").doc(uid).get().catch(() => null);

        if (user) {
            send(`+${user._fieldsProto.emergency_contact_phone.stringValue}`,
            `Hello ${user._fieldsProto.emergency_contact_name.stringValue}. You are ${user._fieldsProto.name.stringValue}'s emergency contact and they have pressed the panic button and require assistance. View their location here: https://link.stuff`);
        }
    }
});