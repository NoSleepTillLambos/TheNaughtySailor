import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  getAllCocktails,
  getAllCompetitionsFromCollection,
} from "../services/firebaseDB";
import CocktailCard from "../components/CocktailCard";

const Results = () => {
  const navigation = useNavigation();

  const [cocktails, setCocktails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Current cocktail competitions:</Text>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllCocktails} />
        }
      >
        <View style={styles.comps}>
          {cocktails.map((cocktail, index) => (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() => navigation.navigate("CompDetails", { cocktail })}
              activeOpacity={0.8}
            >
              <CocktailCard data={cocktail} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comps: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginLeft: 20,
  },
  heading: {
    margin: 20,
    marginLeft: 30,
    fontSize: 20,
    marginTop: 70,
  },
});
