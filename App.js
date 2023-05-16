import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import CompetitionsScreen from "./screens/Competitions";
import Results from "./screens/Results";
import Voting from "./screens/Voting";

export default function App() {
  // CHECK IF THE USER IS LOGGED IN
  // const LoggedIn = false;
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Competitions" component={CompetitionsScreen} />
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="Voting" component={Voting} />
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
