import { firestore } from "../../lib/firebase";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

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
        emergency_contact_name: "",
        emergency_contact_relationship: "",
        emergency_contact_phone: "",
    };

    await setDoc(doc(usersCollectionRef, user.uid), newUser).catch((error) =>
        console.error(error)
    );
};

export const updateUser = async (user, emergency_contact) => {
    await updateDoc(doc(usersCollectionRef, user.uid), emergency_contact)
        .then(console.log("user details updated!"))
        .catch((error) => console.log(error));
};
