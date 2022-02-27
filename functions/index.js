import functions from "firebase-functions";
import { send } from "./lib/twilio.js";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const send_message = functions.https.onCall(async (data, context) => {
    let uid = context.auth.uid;

    if (uid) {
        let user_snapshot = await db.collection("users").doc(uid).get();

        if (user_snapshot.exists) {
            let user = user_snapshot.data();

            if (user.emergency_contact_name && user.emergency_contact_phone) {
                send(
                    `+${user.emergency_contact_phone}`,
                    `Hello ${user.emergency_contact_name}. You are ${user.name}'s emergency contact and they have pressed the panic button and require assistance. View their location here: https://link.stuff`
                );

                return {
                    ok: true,
                    name: user.emergency_contact_name,
                    phone: user.emergency_contact_phone
                }
            } return {
                ok: false,
                message: "No emergency contact"
            }
        }
    }

    return {
        ok: false,
        message: "Problem authenticating user"
    }
}); 