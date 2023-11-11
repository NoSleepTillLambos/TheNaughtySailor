import { StyleSheet, Text, View, Image } from "react-native";
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
import { getCurrentUser } from "../services/firebaseAuth";
import { getAllUsersFromCollection } from "../services/firebaseDB";
import { firebaseAuth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const user = firebaseAuth.currentUser.email.split("@")[0];
  const newUser = user.charAt(0).toUpperCase() + user.slice(1);

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
      <View style={styles.backgroundHeader}>
        <Text style={styles.headerTitle}>Hey, {newUser}!</Text>
        <Text style={styles.headerSub}>Enjoy mixology at it's finest!</Text>
      </View>

      <View style={styles.backgroundCon}>
        <View style={styles.boxCon}>
          <View style={styles.box}>
            <Image
              style={styles.boxImg}
              source={require("../assets/cocktails/home1.png")}
            ></Image>
            <Text style={styles.boxTxt}>Relax</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.boxImg}
              source={require("../assets/cocktails/home2.png")}
            ></Image>
            <Text style={styles.boxTxt}>Learn</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.boxImg}
              source={require("../assets/cocktails/home3.png")}
            ></Image>
            <Text style={styles.boxTxt}>Join the community</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.boxImg}
              source={require("../assets/cocktails/home4.png")}
            ></Image>
            <Text style={styles.boxTxt}>Begin your journey</Text>
          </View>
        </View>
      </View>

      <View style={styles.ScrollView}>
        <Text style={styles.friendsTitle}>Users</Text>
        <ScrollView
          directionalLockEnabled={true}
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  enterBtn: {
    paddingLeft: 30,
    paddingTop: 20,
  },
  boxTxt: {
    marginTop: 10,
    fontFamily: "Quicksand-Medium",
  },
  HomeCon: {
    backgroundColor: "#fff",
    color: "white",
    flex: 1,
  },
  backgroundHeader: {
    backgroundColor: "#dd9a9a",
    zIndex: 1,
    padding: 20,
    height: 200,
  },
  backgroundCon: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
    height: "100%",
    marginTop: -40,
    zIndex: 999,
    width: "100%",
  },
  boxImg: {
    height: 100,
    width: 100,
  },
  boxCon: {
    marginLeft: 20,
    marginTop: -20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  box: {
    backgroundColor: "#fff",
    height: 180,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -4, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 10,
  },

  friendsTitle: {
    fontSize: 22,
    color: "#dd9a9a",
    opacity: 0.9,
    fontFamily: "Quicksand-Bold",
  },
  homeImg: {
    paddingLeft: 30,
    marginLeft: 30,
    marginTop: 30,
  },
  ScrollView: {
    position: "absolute",
    bottom: 40,
    marginLeft: 30,
    width: "90%",
    zIndex: 999,
  },
  headerSub: {
    marginLeft: 30,
    fontSize: 17,
    fontFamily: "Quicksand-Bold",
    marginBottom: 20,
    color: "#fff",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 25,

    marginTop: 40,
    marginLeft: 30,
    color: "#fff",
    fontWeight: "bold",

    fontFamily: "Quicksand-Bold",
  },
  drink: {
    fontSize: 50,
    marginLeft: 30,
    color: "#fff",
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
