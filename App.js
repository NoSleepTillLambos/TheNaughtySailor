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
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        {user ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Competitions" component={CompetitionsScreen} />
            <Drawer.Screen name="Results" component={Results} />
            <Drawer.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="LoginScreen"
              component={Login}
              options={{ headerShown: false }}
            />
            <Drawer.Screen name="Register" component={Register} />
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
