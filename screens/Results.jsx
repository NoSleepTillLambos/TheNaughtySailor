import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
const Results = () => {
  const [cocktails, setCocktails] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // getting data when viewing screen

      return () => {
        // remove when not viewing to save space
      };
    }, [])
  );
  return (
    <View style={styles.resultsCon}>
      <ScrollView>
        {cocktails.map((cocktail, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push("details", { cocktail })}
            activeOpacity={0.8}
          ></TouchableOpacity>
        ))}
        <Text style={styles.heading}>Here are the current competitions</Text>
      </ScrollView>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  resultsCon: {
    backgroundColor: "#E2B5B5",
    height: "100%",
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
});
