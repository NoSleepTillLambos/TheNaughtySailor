import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CocktailCard = (props) => {
  const { data } = props;
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <Text>{data.value}</Text>
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
  },
});
