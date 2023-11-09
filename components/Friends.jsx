import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useCollection } from "../hooks/useCollection";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Friends = (props) => {
  // loading fonts
  let [fontsLoaded] = useFonts({
    // cursive font
    "Dancing-SemiBold": require("../assets/fonts/DancingScript-SemiBold.ttf"),
    // QUICKSAND FONTS
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  const { data } = props;

  return (
    <View style={styles.Friends}>
      <Image
        source={{ uri: data.profileImg }}
        style={styles.cocktailImage}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  Friends: {
    height: 100,
    width: "80%",

    paddingTop: 10,
    marginLeft: 30,
    marginBottom: 100,
    borderRadius: 10,
  },

  cocktailImage: {
    height: 90,
    marginRight: -70,
    width: 90,
    marginTop: 10,
    borderRadius: 90 / 2,
  },
});

export default Friends;
