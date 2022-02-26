import { firestore } from "../../lib/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const usersCollectionRef = collection(firestore, "users");

export const retrieveUserDetails = async (userUid) => {
    const docRef = doc(firestore, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
};

export const saveNewUser = async (user) => {
    const newUser = {
        email: user.email,
        name: user.name,
        phone: user.phone,
        onboarded: false,
    };

    await setDoc(doc(usersCollectionRef, user.uid), newUser)
        .catch((error) => console.error(error));
};
