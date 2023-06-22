// user collection

import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";

export const createUserInDB = async (username, email, uid) => {
  try {
    const docRef = await addDoc(doc(db, "users", uid));
    console.log("user added" + docRef.id);
  } catch (e) {
    console.log("Something has gone wrong" + e);
  }
};
