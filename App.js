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

// TODO: CREATE PROFILE PAGE AND MAKE THE USERNAME AND PROFILE PICTURE UPDATEABLE
// TODO: ENTER COMPETITION AND DISPLAY COMPS BASED ON WHETHER YOU ARE A JUDE OR A CONTESTANT
// TODO: HIDE ENTERING COMPETITIONS FROM ANYONE BUT ME
// TODO: GET GLOBAL STYLES SHEET TO WORK

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
      <Tab.Navigator initialRouteName="Login">
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
                  <Ionicons size={23} name="home-outline" />
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
                  <Ionicons size={23} name="trophy-outline" />
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
                  <Ionicons size={23} name="analytics-outline" />
                ),
              }}
            />
            <Tab.Screen
              name="CompDetails"
              component={CompDetails}
              options={({ route }) => ({
                title: route.params.title,

                // hides this tab bar from the stack, that way the component is still part of the stack
                // --> but is just not visible on the frontend
                tabBarButton: () => null,
                headerShown: false,
              })}
              initialParams={{ title: "testing" }}
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
