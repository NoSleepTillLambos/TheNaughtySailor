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
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
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
  ScrollView,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Lottie from "lottie-react-native";

const Login = ({ navigation }) => {
  // text input validation
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const auth = firebaseAuth;

  const [modalVisible, setModalVisible] = useState(false);

  const signIn = async () => {
    setLoading(true);
    if (!email || !password) {
      setModalVisible(true);
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

  const animationRef = useRef < AnimatedLottieView > null;

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name="alert-circle-outline"
                size={30}
                style={{ paddingBottom: 25 }}
              />
              <Text style={styles.modalText}>
                All fields must be filled in!
              </Text>
              <Pressable
                style={[styles.ModalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Try again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <AnimatedLottieView
          source={require("../assets/104368-thank-you.json")}
          autoPlay
          style={{ width: "80%", aspectRatio: 1 }}
          loop
        /> */}

        <Image
          style={styles.tinyLogo}
          source={require("../assets/logo/43341.png")}
        />
        <Text style={styles.login}>Login</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            required
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.passwordCon}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              value={password}
              secureTextEntry={seePassword}
              onChangeText={(text) => setPassword(text)}
            />
            <Ionicons
              name={seePassword ? "eye-outline" : "eye-off-outline"}
              onPress={() => setSeePassword(!seePassword)}
              size={25}
              style={{ padding: 20 }}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <TouchableHighlight
                underlayColor="#E2B5B5"
                style={styles.button}
                onPress={signIn}
              >
                <Text style={styles.create}>Login</Text>
              </TouchableHighlight>
            </>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.noAccount}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
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
  login: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
    textAlign: "center",
    color: "#2b2b2b",
    fontWeight: "bold",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginVertical: 4,
    height: 50,
    width: "90%",
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dd9a9a",
    marginLeft: 20,
    flex: 1,
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
    textDecorationLine: "underline",
  },
  passwordCon: {
    flex: 1,
    flexDirection: "row",
  },

  // modal views

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
  },
  ModalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#dd9a9a",
  },
});
