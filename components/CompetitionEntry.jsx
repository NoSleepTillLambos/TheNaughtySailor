import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const CompetitionEntry = () => {
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
    <View style={styles.container}>
      <Image
        source={require("../assets/cocktails/cosmo.png")}
        style={styles.entryImg}
      />
      <Text style={styles.name}>The Mojito Special</Text>
      <Text style={styles.person}>Liam Wedge</Text>
      <Text style={styles.text}></Text>

      <View style={styles.voteBlock}>
        <Pressable>
          <Ionicons name="caret-up-circle-outline" size={25} color="green" />
        </Pressable>
        <Text style={styles.voteN}>10</Text>
        <Pressable>
          <Ionicons name="caret-down-circle-outline" size={25} color="red" />
        </Pressable>
      </View>
    </View>
  );
};

export default CompetitionEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    height: 80,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },
  name: {
    marginLeft: 70,
    marginTop: 10,
    fontFamily: "Quicksand-Bold",
  },
  person: {
    fontFamily: "Quicksand-Medium",
    marginLeft: 70,
    marginTop: 10,
  },
  voteN: {
    textAlign: "center",
  },
  entryImg: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  voteBlock: {
    position: "absolute",
    right: 15,
    top: 5,
  },
});
