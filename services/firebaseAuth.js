import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const registerNewUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("New User: " + user);
      updateAuthProfile(username);

      await createUserInDb(username, email, user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
};

export const signinUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in: " + user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode + ": " + errorMessage);
      Alert.alert("Oops!", [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    });
};
export const updateAuthProfile = async (username, imageUrl = "") => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: imageUrl,
    });
    console.log("Profile updated in Auth Successfully");
    return true;
  } catch (error) {
    console.log("Something went wrong in Update Auth: " + error);
    return false;
  }
};

// TODO(you): prompt the user to re-provide their sign-in credentials
