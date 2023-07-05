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
import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AnimatedLottieView from "lottie-react-native";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as Font from "expo-font";

const Login = ({ navigation }) => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "custom-font": require("../assets/fonts/Quicksand-Bold.ttf"),
      });

      Text.defaultProps.style.fontFamily = "custom-font";
    }

    loadFont();
  }, []);

  // text input validation
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

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
            <TouchableHighlight
              underlayColor="#E2B5B5"
              style={styles.button}
              onPress={signIn}
            >
              <Text style={styles.create}>Create account</Text>
            </TouchableHighlight>
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
    marginLeft: 10,
  },
  Button: {
    backgroundColor: "white",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginVertical: 4,
    height: 50,
    fontFamily: "QuickSand-Light",
    width: "90%",
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dd9a9a",
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#dd9a9a",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#dd9a9a",
    width: "30%",
    height: 40,
    width: 180,
    marginLeft: 95,
    marginTop: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  create: {
    fontSize: 15,
    color: "#2b2b2b",
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
