import { StyleSheet, Text, View, Button, Image, Modal } from "react-native";
import React from "react";
import { firebaseAuth } from "../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.HomeCon}>
      <Text style={styles.header}>It's time for a drink</Text>

      <Text style={styles.desc}>
        Naughty Sailor is your all in one cocktail app
      </Text>
      <TouchableOpacity
        style={styles.enterBtn}
        onPress={() => navigation.navigate("Competitions")}
      >
        <Text style={{ fontSize: 20 }}>
          Enter now <Ionicons name="enter-outline" size={18}></Ionicons>
        </Text>
      </TouchableOpacity>

      <Image
        style={styles.homeImg}
        source={require("../assets/martini.png")}
      ></Image>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  enterBtn: {
    padding: 30,
  },
  HomeCon: {
    height: "100%",
    backgroundColor: "#fff",
    color: "white",
  },
  homeImg: {
    paddingLeft: 30,
    marginLeft: 30,
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 30,
    color: "#2b2b2b",
    fontWeight: "bold",
    paddingTop: 20,
  },
  intro: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "white",
    height: "30%",
    width: "80%",
    marginLeft: 30,
    borderRadius: 10,
  },
  desc: {
    marginLeft: 30,
    marginTop: 20,
    color: "#7799CC",
    fontSize: 17,
    fontWeight: "bold",
  },
});
