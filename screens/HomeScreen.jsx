import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Friends from "../components/Friends";
import { getAllUsersFromCollection } from "../services/firebaseDB";

const HomeScreen = ({ navigation }) => {
  // loading fonts
  let [fontsLoaded] = useFonts({
    // cursive font
    "Dancing-SemiBold": require("../assets/fonts/DancingScript-SemiBold.ttf"),
    // QUICKSAND FONTS
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  // state
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  // get all from db
  const getAllUsers = async () => {
    setRefreshing(true);
    const allUsers = await getAllUsersFromCollection();
    setUsers(allUsers);
    setRefreshing(false);
  };

  return (
    <View style={styles.HomeCon}>
      <Text style={styles.header}>It's time for a</Text>
      <Text style={styles.drink}>Drink</Text>

      <Text style={styles.desc}>
        Your all in one cocktail app for every occasion
      </Text>
      <TouchableOpacity
        style={styles.enterBtn}
        onPress={() => navigation.navigate("Competitions")}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Quicksand-Medium",
          }}
        >
          Enter now <Ionicons name="enter-outline" size={18}></Ionicons>
        </Text>
      </TouchableOpacity>

      <View>
        <LottieView
          loop
          autoPlay
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: 1,
            marginRight: 60,
          }}
          source={require("../assets/animations/newScene.json")}
        />
      </View>
      <Text style={styles.friendsTitle}>Users</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllUsers} />
        }
        horizontal={true}
      >
        {users.map((cocktail, index) => (
          <Friends key={index} data={cocktail} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  enterBtn: {
    paddingLeft: 30,
    paddingTop: 20,
  },
  HomeCon: {
    backgroundColor: "#fff",
    color: "white",
  },

  friendsTitle: {
    fontSize: 20,
    marginLeft: 30,
    fontWeight: "bold",
    fontFamily: "Quicksand-Medium",
  },
  homeImg: {
    paddingLeft: 30,
    marginLeft: 30,
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    marginTop: 70,
    marginLeft: 30,
    color: "#2b2b2b",
    fontWeight: "bold",
    paddingTop: 20,
    fontFamily: "Quicksand-Medium",
  },
  drink: {
    fontSize: 50,
    marginLeft: 30,
    color: "#2b2b2b",
    fontFamily: "Dancing-SemiBold",
    paddingTop: 20,
  },
  desc: {
    marginLeft: 30,
    marginTop: 20,
    color: "#7799CC",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Quicksand-Bold",
  },
});
