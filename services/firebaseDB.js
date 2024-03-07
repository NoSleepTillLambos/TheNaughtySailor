import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { uploadToStorage } from "./firebaseStorage";

// creating user in db
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

// fetching all users
export const getAllUsersFromCollection = async () => {
  try {
    var users = [];

    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (error) {
    console.log("Something went wrong when fetching users:" + error);
    return [];
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
          votes: 0,
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
      console.log(doc.id, "=>", doc.data());
      entries.push({ ...doc.data(), id: doc.id });
    });
    return entries;
  } catch (e) {
    console.log("Could not fetch data: " + e);
    return entries;
  }
};

// voting on competition
export const updateEntryInCollection = async (cocktailId, entryId) => {
  try {
    const entryRef = doc(db, `cocktails/${cocktailId}/entries`, entryId);

    // increment votes by 1
    await updateDoc(entryRef, { votes: increment(1) });
    console.log("successfully voted on comp");
  } catch (e) {
    console.log("could not vote on comp " + e);
  }
};

// fetching each users entry
export const fetchUsersEntries = async () => {
  userEntries = [];
  try {
    const docRef = doc(db, "cocktails", compId, user.id);
  } catch {
    console.log(e);
  }
};
