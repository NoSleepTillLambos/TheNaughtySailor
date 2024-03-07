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
import { colors } from "../Utils/Colors";
import { Input, Icon } from "@rneui/themed";

const Register = ({ navigation }) => {
  const GlobalStyles = require("../styles/GlobalStyles");
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
        <Text style={styles.register}>Sign Up</Text>

        <View style={styles.nameSurname}>
          <TextInput
            style={styles.shortInput}
            placeholder="Name"
            autoCapitalize="none"
            value={name}
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.shortInput}
            placeholder="Judge or User?"
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
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
            placeholderTextColor={colors.primary}
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
              placeholderTextColor={colors.primary}
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
          {/* sign in with google */}
          <TouchableOpacity style={GlobalStyles.googleButton}>
            <Image
              style={GlobalStyles.googleLogo}
              source={require("../assets/google.png")}
            />
            <Text style={GlobalStyles.buttonText}>Use Google</Text>
          </TouchableOpacity>

          <TouchableHighlight
            style={GlobalStyles.button}
            underlayColor="#E2B5B5"
            onPress={signUp}
          >
            <Text style={GlobalStyles.buttonText}>Sign up</Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.noAccount}>Already Have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  emailMsg: {
    color: colors.error,
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
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginLeft: 20,
    padding: 10,
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

  loginBox: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 20,
    gap: 10,
  },
  register: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "bold",
    fontFamily: "Quicksand-Bold",
  },
  tinyLogo: {
    width: 350,
    height: 350,
    marginLeft: 10,
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
    backgroundColor: colors.primary,
  },
});
