import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPWWIbPkDqu8X9QhtxFN395rrodO2i2RU",
    authDomain: "nitelyte-3e7ed.firebaseapp.com",
    projectId: "nitelyte-3e7ed",
    storageBucket: "nitelyte-3e7ed.appspot.com",
    messagingSenderId: "72231139274",
    appId: "1:72231139274:web:cc90238af412eeb9888133",
};

export default app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(firestore, "localhost", 9000);
}