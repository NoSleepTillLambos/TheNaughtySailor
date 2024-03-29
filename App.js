import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { firebaseAuth } from "./firebase";
import CompDetails from "./screens/CompDetails";
import CompetitionsScreen from "./screens/Competitions";
import HomeScreen from "./screens/HomeScreen";
import LeaderBoards from "./screens/Leaderboards";
import Login from "./screens/LoginScreen";
import OnBoarding from "./screens/OnBoarding";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Results from "./screens/Results";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// TODO: HIDE ENTERING COMPETITIONS FROM ANYONE BUT ME
// TODO: TAB BAR BADGE WHEN CLICKING NEW COMP IS ADDED
// TODO: CREATE A WAY FOR USERS TO LEVEL UP BASED ON VOTES AND TOTAL WINS
// TODO: SPECIFIC COCKTAILS SHOWING IN THE USERS ENTERED PROFILE SECTIONS

// protecting against users and non judges
export default function App({ cocktail }) {
  let [fontsLoaded] = useFonts({
    // QUICKSAND FONTS
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Light.ttf"),

    // cursive font
    "Dancing-SemiBold": require("./assets/fonts/DancingScript-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    <AppLoading />;
  }
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer styles={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                name="Leaderboards"
                component={LeaderBoards}
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
                options={{
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Register"
                component={Register}
                options={{
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
            </>
          )}
        </Tab.Navigator>
      </GestureHandlerRootView>
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
