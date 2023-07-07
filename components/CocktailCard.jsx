import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CocktailCard = (props) => {
  const { data } = props;
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/cocktails/mojito.png")}
        style={styles.cocktailImage}
      ></Image>
      <Text style={styles.cocktailName}>Name: {data.name}</Text>
      <Text style={styles.type}>Type: {data.value}</Text>
    </View>
  );
};

export default CocktailCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontWeight: "bold",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cocktailImage: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 20,
  },
  cocktailName: {
    fontWeight: "bold",
    position: "absolute",
    right: 40,
    padding: 30,
  },
  type: {
    position: "absolute",
    right: 30,
    top: 30,
    padding: 30,
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
});
