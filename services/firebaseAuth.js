import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { createUserInDB } from "./firebaseDB";
import { firebaseAuth } from "../firebase";

export const registerNewUser = async (email, password, role) => {
  createUserWithEmailAndPassword(firebaseAuth, email, password, role)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("New User: " + user.uid);
      // updateAuthProfile(username);

      await createUserInDB(email, user.uid, role);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in
      online: true;
      const user = userCredential.user;
      console.log("User logged in: " + user.email);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateAuthProfile = async (email, imageUrl = "") => {
  try {
    await updateProfile(firebaseAuth.currentUser, {
      displayName: email,
      photoURL: imageUrl,
    });
    console.log("Profile updated success mf");
    return true;
  } catch (error) {
    console.log("Something went wrong in Update Auth: " + error);
    return false;
  }
};

export const getCurrentUser = () => {
  return firebaseAuth.currentUser;
};

export const changeEmail = async (email) => {
  try {
    await updateEmail(firebaseAuth.currentUser, {
      email: email,
    });
  } catch (e) {
    console.log("Your error is" + e);
  }
};
