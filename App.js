import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CompetitionsScreen from "./screens/Competitions";
import Results from "./screens/Results";
import Profile from "./screens/Profile";
import Login from "./screens/LoginScreen";
import Register from "./screens/Register";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { Icon } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);
  // CHECK IF THE USER IS LOGGED IN
  // const LoggedIn = false;
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#7799CC",
          },
        }}
      >
        {user ? (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="home-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="Competitions"
              component={CompetitionsScreen}
              options={{
                title: "Competitions",
                headerShown: false,
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="trophy-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="Results"
              component={Results}
              options={{
                title: "Results",
                headerShown: false,
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="analytics-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="person-outline" />
                ),
              }}
              r
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="LoginScreen"
              component={Login}
              options={{ tabBarStyle: { display: "none" }, headerShown: false }}
            />
            <Tab.Screen
              name="Register"
              component={Register}
              options={{ tabBarStyle: { display: "none" }, headerShown: false }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    fontFamily: "sans-bold",
  },
  content: {
    padding: 40,
    fontFamily: "sans-bold",
  },
  list: {
    marginTop: 20,
  },
});
