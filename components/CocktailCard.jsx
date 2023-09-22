import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const CocktailCard = (props) => {
  const { data } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.cocktailImg }}
        style={styles.cocktailImage}
      ></Image>
      <View style={styles.desc}>
        <Text style={styles.cocktailName}>{data.name}</Text>
        <Text style={styles.type}>{data.value}</Text>
        <Text style={styles.likeCnt}>5</Text>

        <Text style={styles.alcoholTypes}>Alc: {data.alcoholOne}</Text>

        <Ionicons
          style={styles.likes}
          size={25}
          name="heart-circle-outline"
        ></Ionicons>
      </View>
    </View>
  );
};

export default CocktailCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    width: 150,

    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#dd9a9a",
  },
  desc: {
    backgroundColor: "#fff",
    height: 100,
    position: "absolute",
    bottom: 0,
    opacity: 0.8,
    borderRadius: 10,
    width: "100%",
  },
  cocktailImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  alcoholTypes: {
    color: "#2b2b2b",
    height: 20,
    borderRadius: 10,
    width: 120,

    position: "absolute",
    top: 65,
    borderRadius: 40,
    left: 15,
  },
  likeCnt: {
    position: "absolute",
    bottom: 40,
    right: 15,
    fontSize: 10,
    color: "maroon",
    fontWeight: "bold",
  },
  likes: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  cocktailName: {
    position: "absolute",
    top: 15,
    fontWeight: "bold",
    left: 15,
    opacity: 1,
  },
  type: {
    position: "absolute",
    left: 15,
    top: 40,
  },
});
