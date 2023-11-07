import {
  Timestamp,
  addDoc,
  collection,
  doc,
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

export const getCocktailFeatures = async (cocktailId) => {
  try {
    var features = [];
    const snapshot = await getDocs(
      collection(db, `cocktails/${cocktailId}/features`)
    );
    snapshot.forEach((doc) => {
      features.push(doc.data());
    });

    return features;
  } catch (e) {
    console.log("Something went wrong" + e);
    return [];
  }
};

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

// CREATE COMP ENTRIES
// export const createCocktailEntry = async (
//   user,
//   name,
//   value,
//   imageEntry,
//   alcohol
// ) => {
//   try {
//     const ref = await addDoc(collection(db, "entries"), {
//       user,
//       name: name,
//       entryImg: await uploadToStorage(
//         imageEntry,
//         `cocktailEntries/${Math.floor(Math.random() * 6) + 1}`
//       ),
//       value: value,
//       alcoholOne: alcohol,
//     });
//     console.log("Successfully entered comp");
//   } catch (error) {
//     console.log("Could not add the entry" + error);
//   }
// };

// // RETRIEVING COMP ENTRIES
// export const getAllEntries = async () => {
//   try {
//     var cocktailEntries = [];

//     const snapshot = await getDocs(collection(db, "entries"));
//     snapshot.forEach((doc) => {
//       cocktailEntries.push({ ...doc.data(), id: doc.id });
//     });

//     return cocktailEntries;
//   } catch (error) {
//     console.log("Something went wrong when returning collection: " + error);
//     return [];
//   }
// };
