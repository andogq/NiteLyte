import functions from "firebase-functions";
import { send } from "./lib/twilio.js";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const sos = functions.https.onCall(async (data, context) => {
    // Get the user making the request
    let uid = context.auth.uid;

    if (uid) {
        let user = await db.collection("users").doc(uid).get().catch(() => null);

        if (user) {
            await send(
                user.emergency_contact.mobile,
                `Hello ${user.emergency_contact.full_name}. You are ${user.full_name}'s emergency contact and they have pressed the panic button and require assistance. View their location here: https://link.stuff`
            );
        }
    }
});