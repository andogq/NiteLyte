import { firestore } from "../../lib/firebase";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";

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
    emergency_contact_name: '',
    emergency_contact_relationship: '',
    emergency_contact_phone: ''
  }

  await setDoc(doc(usersCollectionRef, user.uid), newUser)
    .then(console.log('user stored!'))
    .catch(error => console.log(error));
}

export const updateUser = async (user, emergency_contact) => {  
  await updateDoc(doc(usersCollectionRef, user.uid), emergency_contact)
      .then(console.log('user details updated!'))
      .catch(error => console.log(error));
}