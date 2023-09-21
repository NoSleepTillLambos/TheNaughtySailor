import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { updateUserProfile } from "../services/firebaseAuth";
import { getCurrentUser } from "../services/firebaseAuth";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import CocktailCard from "../components/CocktailCard";
import { updateUserInDb } from "../services/firebaseDB";
import * as ImagePicker from "expo-image-picker";

const Profile = (navigation) => {
  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerCon}>
          <Ionicons name="person-circle" size={160} />
          <Ionicons
            style={styles.add}
            name="add-circle-outline"
            size={30}
          ></Ionicons>
          <Text style={styles.text}>
            Email: {firebaseAuth.currentUser.email}
          </Text>
        </View>

        <Text style={styles.text}>Your Cocktails</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => firebaseAuth.signOut()}
        >
          <Text style={styles.create}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  add: {
    position: "absolute",
    top: 120,
    right: 100,
  },
  heading: {
    flex: 1,
    backgroundColor: "#E2B5B5",
    height: "100%",
  },
  innerCon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },

  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#dd9a9a",
    width: "30%",
    height: 40,
    bottom: 0,
    left: 0,
    top: 600,
    position: "absolute",
    width: 180,
    marginLeft: 95,
    marginTop: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileBlock: {
    textAlign: "center",
    alignItems: "center",
  },
  profile: {
    fontSize: 30,
    fontWeight: "bold",
  },
  create: {
    fontSize: 15,
    color: "#2b2b2b",
    fontFamily: "Quicksand-Medium",
  },
});
