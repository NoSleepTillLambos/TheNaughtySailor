import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { signInUser } from "../services/firebaseAuth";
import { firebaseAuth } from "../firebase";
import { colors } from "../Utils/Colors";

const Login = ({ navigation }) => {
  const GlobalStyles = require("../styles/GlobalStyles");

  // loading fonts
  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  // text input validation
  const [seePassword, setSeePassword] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyErrorMessage, setEmptyErrorMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // const googleSignUp = () => {
  //   signInWithPopup(firebaseAuth, provider)
  //     .then((res) => {
  //       const cred = GoogleAuthProvider.credentialFromResult(res);
  //       const token = cred.accessToken;

  //       const user = res.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //     });
  // };

  const signIn = async () => {
    setLoading(true);
    if (!email || !password) {
      setModalVisible(true);
      setEmptyErrorMessage("Please fill in all fields!");
    }
    try {
      await signInUser(email, password);
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
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
              <Text style={styles.modalText}>{emptyErrorMessage}</Text>
              <Pressable
                style={[styles.ModalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Try again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
            placeholderTextColor={colors.primary}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.passwordCon}>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.primary}
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
              style={{ padding: 20, color: colors.primary }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.loginBox}>
          <TouchableOpacity style={GlobalStyles.googleButton}>
            <Image
              style={GlobalStyles.googleLogo}
              source={require("../assets/google.png")}
            />
            <Text style={GlobalStyles.buttonText}>Use Google</Text>
          </TouchableOpacity>
          <TouchableHighlight
            underlayColor="#E2B5B5"
            style={GlobalStyles.button}
            onPress={signIn}
          >
            <Text style={GlobalStyles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.noAccount}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  tinyLogo: {
    width: 350,
    height: 350,
    marginLeft: 10,
  },
  loginBox: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 20,
    gap: 10,
  },
  login: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
    textAlign: "center",
    color: "#D07474",
    fontWeight: "bold",
    fontFamily: "Quicksand-Bold",
  },

  input: {
    marginVertical: 8,
    height: 50,
    width: "90%",
    borderBottomWidth: 1,
    flex: 1,
    borderColor: colors.primary,
    marginLeft: 20,
    padding: 10,
  },
  noAccount: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    marginTop: 40,
    fontFamily: "Quicksand-Medium",
  },
  passwordCon: {
    flex: 1,
    flexDirection: "row",
  },

  // modal views

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
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
