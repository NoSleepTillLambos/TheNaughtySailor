import { getAuth, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

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
