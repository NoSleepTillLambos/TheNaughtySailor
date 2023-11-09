import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { uploadToStorage } from "./firebaseStorage";

// code for firestore and adding to db

export const createUserInDB = async (email, uid, role) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      email,
      role: role,
      online: false,
      createdAt: Timestamp.now(),
    });
    console.log("User added to db: " + docRef.id);
  } catch (e) {
    console.log("Something has gone wrong" + e);
  }
};

// cocktails collection
export const updateUserInDb = async (uid, userInfo) => {
  try {
    const docRef = await updateDoc(doc(db, "users", uid), userInfo);
  } catch {
    console.log("Something went wrong with db update");
  }
};

// adding cocktail to collection
export const addCocktailCompetition = async (
  name,
  value,
  image,
  alcoholOne,
  alcoholTwo
) => {
  try {
    const docRef = await addDoc(collection(db, "cocktails"), {
      name: name,
      cocktailImg: await uploadToStorage(
        image,
        `cocktailImages/${Math.floor(Math.random() * 6) + 1}`
      ),
      value: value,
      alcoholOne: alcoholOne,
      alcoholTwo: alcoholTwo,
    });
    console.log("Successfully added project");
  } catch (err) {
    console.log("This is the error: " + err);
  }
};

// adding cocktail to collection
export const getAllCompetitionsFromCollection = async () => {
  try {
    var cocktailComps = [];

    const snapshot = await getDocs(collection(db, "cocktails"));
    snapshot.forEach((doc) => {
      cocktailComps.push({ ...doc.data(), id: doc.id });
    });

    return cocktailComps;
  } catch (error) {
    console.log("Something went wrong when returning collection: " + error);
    return [];
  }
};

// adding cocktail to collection
export const getAllUsers = async () => {
  try {
    var users = [];

    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return cocktailComps;
  } catch (error) {
    console.log("Something went wrong when fetching users: " + error);
    return [];
  }
};

// entering comp
export const enterCompetition = async (
  name,
  compId,
  entryImg,
  alcohol,
  value
) => {
  try {
    const compRef = doc(db, "cocktails", compId);
    const compDocSnapshot = await getDoc(compRef);

    if (compDocSnapshot.exists()) {
      const docRef = await addDoc(
        collection(db, "cocktails", compId, "entries"),
        {
          entryImg: entryImg,
          name: name,
          alcohol: alcohol,
          value: value,
        }
      );
      console.log("Entered into comp: " + docRef.id);
    } else {
      console.log("unlucky");
    }
  } catch (error) {
    console.error("could not enter::: ", error);
  }
};

// get competition entries
export const getAllCocktailEntries = async (compId) => {
  const entries = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, "cocktails", compId, "entries")
    );
    querySnapshot.forEach((doc) => {
      entries.push({ ...doc.data(), id: doc.id });
    });
    return entries;
  } catch (e) {
    console.log("Could not fetch data: " + e);
    return entries;
  }
};
