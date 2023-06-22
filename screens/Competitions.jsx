import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Competitions = () => {
  return (
    <View>
      <Text style={styles.header}>Upload and enter!:</Text>
    </View>
  );
};

export default Competitions;

const styles = StyleSheet.create({
  header: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
});
