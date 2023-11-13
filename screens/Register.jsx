import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { registerNewUser } from "../services/firebaseAuth";

const Register = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  // text input validation
  const [seePassword, setSeePassword] = useState(true);
  const [emptyErrorMessage, setEmptyErrorMessage] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [checkValidEmail, setCheckValidEmail] = useState(false);

  const signUp = async () => {
    setLoading(true);
    if (!email || !password) {
      setModalVisible(true);
      setEmptyErrorMessage("Please fill in all fields!");
    }
    if (!email.includes("@")) {
      setModalVisible(true);
      setFirebaseError("Please make sure the email you are entering is valid");
    }
    if (password.length < 6) {
      setPasswordError("Password must contain 6 characters");
    }
    try {
      await registerNewUser(email, password, role);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
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
            <Text style={styles.modalText}>
              {emptyErrorMessage} {firebaseError} {passwordError}
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
      <ScrollView>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logo/43341.png")}
        />
        <Text style={styles.register}>Register</Text>

        <View style={styles.nameSurname}>
          <TextInput
            style={styles.shortInput}
            placeholder="Name"
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.shortInput}
            placeholder="Judge or User?"
            autoCapitalize="none"
            value={role}
            onChangeText={(text) => setRole(text)}
          />
        </View>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.input}
            required
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            // onChange={(text) => handleCheckEmail(text)}
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
        </KeyboardAvoidingView>
        {/* sign in with google */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            style={styles.google}
            source={require("../assets/google.png")}
          />
          <Text style={styles.googleTxt}>Use Google</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.button}
          underlayColor="#E2B5B5"
          onPress={signUp}
        >
          <Text style={styles.create}>Create account</Text>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.noAccount}>Already Have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  emailMsg: {
    color: "#800000",
    padding: 7,
    marginLeft: 13,
  },
  nameSurname: {
    flexDirection: "row",
  },
  shortInput: {
    marginVertical: 4,
    height: 50,
    width: "42.4%",
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dd9a9a",
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#dd9a9a",
  },
  input: {
    marginVertical: 8,
    height: 50,
    width: "90%",
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    borderColor: "#dd9a9a",
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#dd9a9a",
  },
  register: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
    textAlign: "center",
    color: "#D07474",
    fontWeight: "bold",
    fontFamily: "Quicksand-Bold",
  },
  tinyLogo: {
    width: 350,
    height: 350,
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D07474",
    width: "45%",
    height: 40,
    width: 150,
    marginLeft: 200,
    marginTop: 20,
  },
  googleBtn: {
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D07474",
    width: "45%",
    padding: 7,
    height: 40,
    bottom: 35,
    left: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E2B5B5",
  },
  googleTxt: {
    fontSize: 15,
    color: "#D07474",
    position: "absolute",
    fontFamily: "Quicksand-Medium",
    left: 47,
    top: 10,
  },
  create: {
    fontSize: 15,
    color: "#D07474",
    fontFamily: "Quicksand-Medium",
  },
  noAccount: {
    color: "#2b2b2b",
    textAlign: "center",

    fontSize: 15,
    marginTop: 15,
    fontFamily: "Quicksand-Medium",
  },
  passwordCon: {
    flex: 1,
    flexDirection: "row",
  },

  // MODAL VIEWS
  google: {
    height: 25,
    width: 25,
  },
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
