import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { firebaseAuth } from "../firebase";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { createUserInDB } from "../services/firebaseDB";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const fonts = () => {
  let [fontsLoaded] = useFonts({
    Quicksand: require("../assets/fonts/Quicksand-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
};

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckEmail = (text) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    setEmail(text);
    if (regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  // text input validation
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const auth = firebaseAuth;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      Alert.alert("Check your emails for verification");

      console.log(response);
      await createUserInDB(email, user.uid);
      // <AnimatedLottieView
      //   source={require("../assets/104368-thank-you.json")}
      // />;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logo/43341.png")}
        />
        <Text style={styles.register}>Register your account</Text>
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
            placeholder="Username"
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* {checkValidEmail ? (
          <TextInput style={styles.emailMsg}>
            Incorrect Email format, try again
          </TextInput>
        ) : (
          <TextInput style={styles.emailMsg}></TextInput>
        )} */}
        <TextInput
          style={styles.input}
          required
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onChange={(text) => handleCheckEmail(text)}
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

        <Button title="Create account" onPress={signUp} style={styles.create} />
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.noAccount}>Have an account? Login</Text>
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
    width: "42%",
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dd9a9a",
    marginLeft: 20,
    padding: 20,
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
    padding: 20,
    backgroundColor: "#dd9a9a",
  },
  register: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
    textAlign: "center",
    fontFamily: "Quicksand",
  },

  tinyLogo: {
    width: 350,
    height: 350,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E2B5B5",
  },
  create: {
    marginTop: 30,
  },
  noAccount: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    marginTop: 15,
  },
  passwordCon: {
    flex: 1,
    flexDirection: "row",
  },
});
