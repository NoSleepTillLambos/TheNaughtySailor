import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCocktailFeatures } from "../services/firebaseDB";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import CompetitionEntry from "../components/CompetitionEntry";

const CompDetails = ({ route, navigation }) => {
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

  // entering a competition
  const enterComp = () => {};
  const { cocktail } = route.params;
  const [cocktails, setCocktails] = useState("");

  useEffect(() => {
    getCurrentCocktails();
  }, []);

  const getCurrentCocktails = async () => {
    const result = await getCocktailFeatures(cocktail.id);
    setCocktails(result);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.compView}>
          <Text style={styles.compTitle}>{cocktail.name}</Text>

          <Image
            style={styles.compImg}
            source={{ uri: cocktail.cocktailImg }}
          />
          <Text style={styles.compTime}>Current Entries: </Text>
          <CompetitionEntry />
        </View>
      </ScrollView>
    </View>
  );
};

export default CompDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#7799CC",
  },
  compTitle: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Quicksand-Bold",
  },
  compView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  compSub: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    justifyContent: "space-between",
    color: "#fff",
  },
  compImg: {
    height: 250,
    marginTop: 30,
    width: 250,
    borderRadius: 10,
  },
  compTime: {
    fontSize: 20,
    color: "#fff",
    marginTop: 30,
    fontFamily: "Quicksand-Medium",
  },
});
