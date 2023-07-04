// user collection
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { uploadToStorage } from "./firebaseStorage";

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

// cocktails collection
export const updateUserInDb = async (uid, userInfo) => {
  try {
    const docRef = await updateDoc(doc(db, "users", uid), userInfo);
  } catch {
    console.log("Something went wrong with db update");
  }
};

export const addCocktailToCollection = async (cocktail, features = []) => {
  try {
    console.log(features);
    const docRef = await addDoc(collection(db, "cocktails"), cocktail);
    console.log("Successfully added project");
    if (docRef.id) {
      // project successfully created
      // upload the cocktails
      features.forEach(async (feature) => {
        // upload image
        const imageUrl = await uploadToStorage(
          feature.imageUrl,
          `cocktails/${docRef.id}_${feature.title}`
        );

        // add as a sub collection
        const featureRef = await addDoc(
          collection(db, `cocktails/${docRef.id}/features`),
          {
            title: feature.title,
            imageUrl: imageUrl,
          }
        );

        console.log("Successfully added cocktail" + featureRef.id);
      });

      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("This went wrong: " + e);
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
      // console.log(doc.id, "=>", doc.data())

      cocktailComps.push({ ...doc.data(), id: doc.id });
    });

    return cocktailComps;
  } catch (error) {
    console.log("Something went wrong when returning collection: " + error);
    return [];
  }
};
