import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const CompetitionEntry = (props) => {
  const { entryData } = props;
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
        source={{ uri: entryData.entryImg }}
        style={styles.entryImg}
      ></Image>
      <Text style={styles.name}>{entryData.name}</Text>
      <Text style={styles.person}>{entryData.value}</Text>

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
    width: 300,
    height: 80,
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    borderBottomStartRadius: 30,
  },
  name: {
    marginLeft: 90,
    marginTop: 10,
    fontFamily: "Quicksand-Bold",
  },
  person: {
    fontFamily: "Quicksand-Medium",
    marginLeft: 90,
    marginTop: 10,
  },
  voteN: {
    textAlign: "center",
  },
  entryImg: {
    height: "80%",
    width: "20%",
    top: 10,
    left: 20,
    position: "absolute",
    borderRadius: 6,
  },
  voteBlock: {
    position: "absolute",
    right: 15,
    top: 5,
  },
});
