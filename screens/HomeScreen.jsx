import { StyleSheet, Text, View, Button, Image, Modal } from "react-native";
import React from "react";
import { firebaseAuth } from "../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const HomeScreen = ({ navigation }) => {
  // loading fonts
  let [fontsLoaded] = useFonts({
    // QUICKSAND FONTS
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
    "Dancing-SemiBold": require("../assets/fonts/DancingScript-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return (
    <View style={styles.HomeCon}>
      <Text style={styles.header}>It's time for a</Text>
      <Text style={styles.drink}>Drink</Text>

      <Text style={styles.desc}>
        Your all in one cocktail app for every occasion
      </Text>
      <TouchableOpacity
        style={styles.enterBtn}
        onPress={() => navigation.navigate("Competitions")}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Quicksand-Medium",
          }}
        >
          Enter now <Ionicons name="enter-outline" size={18}></Ionicons>
        </Text>
      </TouchableOpacity>

      <View>
        <LottieView
          loop
          autoPlay
          style={{
            height: 500,
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: 1,
            marginRight: 60,
          }}
          source={require("../assets/newScene.json")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  enterBtn: {
    paddingLeft: 30,
    paddingTop: 20,
  },
  HomeCon: {
    backgroundColor: "#fff",
    color: "white",
  },
  homeImg: {
    paddingLeft: 30,
    marginLeft: 30,
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    marginTop: 70,
    marginLeft: 30,
    color: "#2b2b2b",
    fontWeight: "bold",
    paddingTop: 20,
    fontFamily: "Quicksand-Medium",
  },
  drink: {
    fontSize: 50,
    marginLeft: 30,
    color: "#2b2b2b",
    fontFamily: "Dancing-SemiBold",
    paddingTop: 20,
  },
  desc: {
    marginLeft: 30,
    marginTop: 20,
    color: "#7799CC",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Quicksand-Bold",
  },
});
