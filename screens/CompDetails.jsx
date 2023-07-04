import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCocktailFeatures } from "../services/firebaseDB";
import { ScrollView } from "react-native-gesture-handler";

const CompDetails = ({ route, navigation }) => {
  const { cocktail } = route.params;
  const [cocktails, setCocktails] = useState("");

  useEffect(() => {
    getCurrentCocktails();
  }, []);

  const getCurrentCocktails = async () => {
    const result = await getCocktailFeatures(project.id);
    setCocktails(result);
  };
  return (
    <View>
      <Text>The Durban July</Text>
      <Text>Submitted by: </Text>
      {features ? (
        <ScrollView horizontal={true}>
          {cocktails.map((cocktail, index) => {
            <View key={index}>
              <Text>{cocktail.title}</Text>
              <Image
                source={{ uri: cocktail.imageUrl }}
                style={{ height: 150, width: 150 }}
              />
            </View>;
          })}
        </ScrollView>
      ) : (
        <Text>Competition has not been adjusted </Text>
      )}
    </View>
  );
};

export default CompDetails;

const styles = StyleSheet.create({});
