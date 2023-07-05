import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer styles={styles.container}>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#7799CC",
          },
        }}
      >
        {user ? (
          <>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
                drawerIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="home-outline" />
                ),
              }}
            />
            <Drawer.Screen
              name="Competitions"
              component={CompetitionsScreen}
              options={{
                title: "Competitions",
                drawerIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="trophy-outline" />
                ),
              }}
            />
            <Drawer.Screen
              name="Results"
              component={Results}
              options={{
                title: "Results",
                drawerIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="analytics-outline" />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                header: "#fff",
                title: "Profile",
                drawerIcon: ({ focus, size }) => (
                  <Ionicons size={20} name="person-outline" />
                ),
              }}
              r
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="LoginScreen"
              component={Login}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Drawer.Navigator>
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
