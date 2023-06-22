import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { firebaseAuth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.HomeCon}>
      <View>
        <Text style={styles.header}>Welcome to the Naughty Sailor!</Text>
      </View>
      <View style={styles.intro}>
        <Text style={styles.desc}>
          Naughty sailor is a cocktail rating app that allows users to vote on
          their favorite drinks at their favorite restaurants
        </Text>
      </View>
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
    textAlign: "center",
    marginTop: 10,
  },
});
