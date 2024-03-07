import { useState } from "react";
import { firebaseAuth } from "../firebase";

// sign up hook functionality
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response.user);

      if (!response) {
        throw new Error("There has been an error");
      }

      await response.user.updateProfile({ displayName });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signUp };
};
