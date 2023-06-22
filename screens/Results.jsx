import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Results = () => {
  return (
    <View style={styles.resultsCon}>
      <Text style={styles.heading}>Here are the results</Text>
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
