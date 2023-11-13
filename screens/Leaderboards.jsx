import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllCocktailEntries } from "../services/firebaseDB";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import ContestantCard from "../components/ContestantCard";

const LeaderBoards = ({ route }) => {
  const [entries, setEntries] = useState([]);
  const { compId } = route.params;
  const [enteredCocktails, setEnteredCocktails] = useState([]);
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

  useEffect(() => {
    getCurrentCocktailEntries();
  }, []);

  useEffect(() => {
    sortByVote();
  }, [entries]);

  const getCurrentCocktailEntries = async () => {
    const result = await getAllCocktailEntries(compId);

    setEntries(result);
  };

  const sortByVote = () => {
    const voteCounts = [...entries].sort(
      (a, b) => parseInt(b.votes) - parseInt(a.votes)
    );
    setEnteredCocktails(voteCounts);
  };

  return (
    <View style={styles.leaderBoardCon}>
      <View style={styles.topBanner}>
        <Text style={styles.standingTxt}>Leaderboard</Text>
      </View>

      <FlatList
        data={enteredCocktails}
        renderItem={({ item, index }) => (
          <View key={item.id}>
            <ContestantCard
              name={item.name}
              votes={item.votes}
              alcohol={item.alcohol}
              image={{ uri: item.entryImg }}
              value={item.value}
            />
          </View>
        )}
      />
    </View>
  );
};

export default LeaderBoards;

const styles = StyleSheet.create({
  leaderBoardCon: {
    flex: 1,
  },
  topBanner: {
    backgroundColor: "#dd9a9a",
    height: 130,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  standingTxt: {
    fontFamily: "Quicksand-Bold",
    fontSize: 26,
    color: "#fff",
    position: "absolute",
    top: 60,
    left: 40,
  },
  innerCon: {
    height: 900,
    backgroundColor: "red",
  },
});
