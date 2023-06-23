// user collection
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const createUserInDb = async (email, uid) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      email,
      role: "Judge",
      createdAt: Timestamp.now(),
    });
  } catch (e) {
    console.log("Something has gone wrong" + e);
  }
};

export const addCocktailToCollection = async (cocktail) => {
  try {
    const docRef = await addDoc(collection(db, "cocktails"), cocktail);
    console.log("Successfully added project");
    if (docRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("This went wrong: " + e);
  }
};

export const getAllCompetitionsFromCollection = async () => {
  try {
    var cocktailComps = [];

    const snapshot = await getDocs(collection(db, "cocktails"));
    snapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data())

      cocktailComps.push({ ...doc.data(), id: doc.id });
    });

    return cocktailComps;
  } catch (error) {
    console.log("Something went wrong when returning collection: " + error);
    return [];
  }
};
