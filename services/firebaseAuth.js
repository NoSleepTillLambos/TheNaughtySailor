import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useRef } from "react";
import { auth } from "../firebase";
import { createUserInDb } from "./firebaseDB";
import AnimatedLottieView from "lottie-react-native";

export const updateUserProfile = (email, imageUrl = "") => {
  updateProfile(auth.currentUser, {
    displayName: email,
    photoURL: imageUrl,
  })
    .then(() => {
      return true;
      console.log("Update correctly");
    })
    .catch((error) => {
      // An error occurred
      console.log("Something went wrong" + error);
      return false;
    });
};
