import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import {
  getAllCocktails,
  getAllCompetitionsFromCollection,
} from "../services/firebaseDB";
import CocktailCard from "../components/CocktailCard";

const Results = (props) => {
  const [cocktails, setCocktails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // useFocusEffect(
  //   useCallback(() => {
  //     // getting data when viewing screen
  //     getAllCocktails();
  //     return () => {
  //       // remove when not viewing to save space
  //       console.log("home screen not in view");
  //     };
  //   }, [])
  // );
  useEffect(() => {
    getAllCocktails();
  }, []);

  // get all from db
  const getAllCocktails = async () => {
    setRefreshing(true);
    const allCocktails = await getAllCompetitionsFromCollection();
    setCocktails(allCocktails);
    setRefreshing(false);
  };

  return (
    <View style={styles.resultsCon}>
      <Text style={styles.heading}>Current competitions:</Text>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllCocktails} />
        }
      >
        {cocktails.map((cocktail, index) => (
          <TouchableOpacity
            key={index}
            // onPress={() => navigation.push("details", { cocktail })}
            activeOpacity={0.8}
          >
            <CocktailCard data={cocktail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  resultsCon: {
    flex: 1,
    backgroundColor: "#E2B5B5",
    height: "100%",
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    margin: 20,
    fontSize: 18,
  },
});
