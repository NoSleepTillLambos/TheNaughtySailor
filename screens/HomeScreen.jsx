import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { firebaseAuth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.HomeCon}>
      <View>
        <Text style={styles.header}>Welcome to the Naughty Sailor!</Text>
      </View>

      <Text style={styles.desc}>
        A cocktail based rating app for all those cocktail lovers!
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeCon: {
    flex: 1,
    backgroundColor: "#E2B5B5",
    color: "white",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    color: "white",
    fontWeight: "bold",
  },
  intro: {
    textAlign: "center",
    backgroundColor: "white",
    height: "30%",
    width: "80%",
    marginTop: 20,
    marginLeft: 40,
    borderRadius: 10,
  },
  desc: {
    marginTop: 10,
    marginLeft: 10,
    color: "#7799CC",
    fontSize: 30,
    fontWeight: "bold",
  },
});
