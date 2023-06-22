import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const registerNewUser = () => {
  createUserWithEmailAndPassword(auth, email, password);
};
