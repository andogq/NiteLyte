import { firestore } from "../../lib/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const usersCollectionRef = collection(firestore, "users");

export const retrieveUserDetails = async (userUid) => {
  const docRef = doc(firestore, "users", userUid)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export const saveNewUser = async (user) => {
  const newUser = {
    email: user.email,
    name: user.name,
    phone: user.phone, 
    onboarded: false,
  }

  await setDoc(doc(usersCollectionRef, user.uid), newUser)
    .then(console.log('user stored!'))
    .catch(error => console.log(error));
}