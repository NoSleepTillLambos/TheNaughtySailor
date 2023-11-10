import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CompetitionsScreen from "./screens/Competitions";
import Results from "./screens/Results";
import Profile from "./screens/Profile";
import Login from "./screens/LoginScreen";
import Register from "./screens/Register";
import CompDetails from "./screens/CompDetails";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { Icon } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import OnBoarding from "./screens/OnBoarding";

// TODO: HIDE ENTERING COMPETITIONS FROM ANYONE BUT ME
// TODO: TAB BAR BADGE WHEN CLICKING NEW COMP IS ADDED

export default function App({ cocktail }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 20,
            height: 80,
            padding: 25,
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
                tabBarActiveTintColor: "#dd9a9a",

                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={25} name="home-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="Competitions"
              component={CompetitionsScreen}
              options={{
                title: "Competitions",
                headerShown: false,
                tabBarActiveTintColor: "#dd9a9a",
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={25} name="analytics-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="Results"
              component={Results}
              options={{
                title: "Results",
                headerShown: false,
                tabBarActiveTintColor: "#dd9a9a",

                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={25} name="trophy-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="CompDetails"
              component={CompDetails}
              options={({ route }) => ({
                // hides this tab bar from the stack, that way the component is still part of the stack
                // --> but is just not visible on the frontend
                tabBarButton: () => null,
                headerShown: false,
              })}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                headerShown: false,
                tabBarActiveTintColor: "#dd9a9a",
                tabBarIcon: ({ focus, size }) => (
                  <Ionicons size={23} name="person-outline" />
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
            <Tab.Screen
              name="OnBoarding"
              component={OnBoarding}
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
    backgroundColor: "transparent",
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
