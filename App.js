import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Hello from firebase</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    color: "white",
  },
  text: {
    fontFamily: "Quicksand",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  header: {
    height: "15%",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: "0",
  },
});
