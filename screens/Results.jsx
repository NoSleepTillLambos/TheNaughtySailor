import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  getAllCocktails,
  getAllCompetitionsFromCollection,
} from "../services/firebaseDB";
import CocktailCard from "../components/CocktailCard";
import { SearchBar } from "@rneui/themed";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const Results = () => {
  const navigation = useNavigation();

  const [cocktails, setCocktails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // IF YOU HAVE TIME TO REAL TIME DATA BINDING AND FETCHING
  // useFocusEffect(
  //   useCallback(() => {
  //     // getting data in real time
  //     const q = query(collection(db, "cocktails"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const cities = [];
  //       querySnapshot.forEach((doc) => {
  //         cities.push(doc.data().name);
  //       });
  //       console.log("Current cities in CA: ", cities.join(", "));
  //     });

  //     return () => {
  //       // remove when not viewing to save space
  //       console.log("home screen not in view");
  //       unsubscribe();
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
    <View style={styles.container}>
      <Text style={styles.heading}>Current cocktail competitions:</Text>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllCocktails} />
        }
      >
        <View style={{ flexDirection: "row", flex: 1, gap: -240 }}>
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
  heading: {
    margin: 20,
    fontSize: 15,
    marginTop: 70,
  },
  card: {
    width: 400,
    marginLeft: 20,
  },
});
