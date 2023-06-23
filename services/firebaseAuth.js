import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useRef } from "react";
import { auth } from "../firebase";
import { createUserInDb } from "./firebaseDB";
import AnimatedLottieView from "lottie-react-native";

export const updateUserProfile = (email) => {
  updateProfile(auth.currentUser, {
    displayName: email,
    photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
