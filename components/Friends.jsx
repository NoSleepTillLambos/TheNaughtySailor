import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

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
    paddingTop: 6,
    marginBottom: 100,
    borderRadius: 10,
  },

  cocktailImage: {
    height: 80,
    marginRight: -60,
    width: 80,
    marginTop: 20,
    borderRadius: 80 / 2,
  },
});

export default Friends;
