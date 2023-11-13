import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { updateEntryInCollection } from "../services/firebaseDB";

const CompetitionEntry = (props) => {
  const { entryData } = props;

  const [voted, setVoted] = useState(false);
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

  // voting on entry
  const voteOnCocktail = async () => {
    if (!voted) {
      setVoted(true);
    }

    await updateEntryInCollection(props.compId, props.entryId);
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: entryData.entryImg }}
        style={styles.entryImg}
      ></Image>
      <Text style={styles.name}>{entryData.name}</Text>
      <Text style={styles.person}>{entryData.value}</Text>

      <View style={styles.voteBlock}>
        <Pressable
          onPress={voteOnCocktail}
          style={styles.voteBtn}
          disabled={voted}
        >
          {voted ? (
            <>
              <Text style={styles.voteTxt}>Voted!</Text>
            </>
          ) : (
            <>
              <Ionicons
                style={styles.votes}
                size={20}
                name="arrow-up-outline"
              ></Ionicons>
            </>
          )}
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
  voteBtn: {
    backgroundColor: "#dd9a9a",
    padding: 10,
    color: "#fff",
    borderRadius: 5,
    position: "absolute",
    right: 10,
    top: 15,
    width: 70,
  },
  votes: {
    position: "absolute",
    right: 5,
    top: 6,
    color: "#fff",
  },
  voted: {
    color: "#fff",
  },
  person: {
    fontFamily: "Quicksand-Medium",
    marginLeft: 90,
    marginTop: 10,
  },
  voteN: {
    textAlign: "center",
  },
  voteTxt: {
    color: "#fff",
    fontWeight: "bold",
    bottom: 1,
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
