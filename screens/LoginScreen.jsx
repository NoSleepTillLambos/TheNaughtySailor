import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { firebaseAuth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AnimatedLottieView from "lottie-react-native";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const auth = firebaseAuth;

  const signIn = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("All details must be filled in");
    }
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/logo/43341.png")}
      />
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          required
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} style={styles.signIn} />
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.noAccount}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E2B5B5",
  },
  tinyLogo: {
    width: 350,
    height: 350,
  },
  Button: {
    backgroundColor: "white",
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  signIn: {
    backgroundColor: "white",
  },
  noAccount: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    marginTop: 15,
  },
});
