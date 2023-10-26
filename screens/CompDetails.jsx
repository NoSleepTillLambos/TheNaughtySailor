import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createCocktailEntry,
  getAllEntries,
  getCocktailFeatures,
} from "../services/firebaseDB";
import {
  RefreshControl,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";
import CompetitionEntry from "../components/CompetitionEntry";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../services/firebaseAuth";

const CompDetails = ({ route, navigation }) => {
  const user = getCurrentUser().email;
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [value, setValue] = useState(null);
  const [imageEntry, setImageEntry] = useState(null); // set entry image
  const [items, setItems] = useState([
    { label: "Non Alcoholic", value: "non-alcoholic" },
    { label: "Alcoholic", value: "alcoholic" },
  ]);
  const [cocktails, setCocktails] = useState("");
  const [cocktailEntries, setCocktailEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let [fontsLoaded] = useFonts({
    // QUICKSAND FONTS
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
    "Dancing-SemiBold": require("../assets/fonts/DancingScript-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    <AppLoading />;
  }

  const { cocktail } = route.params;

  useEffect(() => {
    getCurrentCocktails();
  }, []);

  const getCurrentCocktails = async () => {
    const result = await getCocktailFeatures(cocktail.id);
    setCocktails(result);
  };

  const pickCocktail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageEntry(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);
  // get all from db
  const getEntries = async () => {
    setRefreshing(true);
    const allEntries = await getAllEntries();
    setCocktailEntries(allEntries);
    setRefreshing(false);
  };
  return (
    <View
      style={[
        styles.container,
        modalVisible ? styles.modalVisCon : styles.container,
      ]}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              style={styles.addDrink}
              onPress={pickCocktail}
            />
            <TextInput
              placeholder="Your cocktails name"
              style={styles.cocktailName}
              onChangeText={(newValue) => setName(newValue)}
            ></TextInput>
            <TextInput
              style={styles.alcoholType}
              placeholder="What alcohol does it have?"
              onChangeText={(newValue) => setAlcohol(newValue)}
            ></TextInput>
            <DropDownPicker
              style={styles.dropdown}
              open={open}
              value={value}
              placeholder="Alcoholic or non-alcoholic"
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              disableBorderRadius={false}
            />
            {imageEntry ? (
              <Image source={{ uri: imageEntry }} style={styles.imageEntry} />
            ) : (
              <Ionicons name="image-outline" size={50} style={styles.image} />
            )}

            <Ionicons
              name="close-circle"
              size={20}
              style={styles.close}
              onPress={() => setModalVisible(false)}
            />

            <Pressable
              style={styles.enter}
              onPress={() =>
                createCocktailEntry(user, name, value, imageEntry, alcohol)
              }
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Enter cocktail
              </Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getEntries} />
        }
      >
        <View style={styles.compView}>
          <Text style={styles.compTitle}>{cocktail.name}</Text>

          <Image
            style={styles.compImg}
            source={{ uri: cocktail.cocktailImg }}
          />
          <Pressable style={styles.enterComp}>
            <Text
              style={styles.enterText}
              onPress={() => setModalVisible(true)}
            >
              Enter this competition
            </Text>
          </Pressable>
          <Text style={styles.entryTitle}>Current Entries: </Text>
        </View>
        {cocktailEntries.map((entry, index) => (
          <TouchableOpacity key={index}>
            <CompetitionEntry entryData={entry} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CompDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7799CC",
  },
  modalVisCon: {
    opacity: 0.05,
    backgroundColor: "#2b2b2b",
  },
  compTitle: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Quicksand-Bold",
  },
  compView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  modalView: {
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "70%",
    height: "50%",
    marginLeft: "15%",
    marginTop: "55%",
    opacity: 0.97,
    borderRadius: 10,
    alignItems: "center",
  },
  compSub: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    justifyContent: "space-between",
    color: "#fff",
  },
  compImg: {
    height: 250,
    marginTop: 30,
    width: 250,
    borderRadius: 10,
    borderColor: "#fff",
    borderRadius: 10,
  },
  enterComp: {
    backgroundColor: "#fff",
    marginTop: 30,
    width: 200,
    height: 40,
    borderRadius: 10,
    borderColor: "#2b2b2b",
    padding: 5,
  },
  enterText: {
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    marginTop: 5,
    color: "#7799CC",
  },
  entryTitle: {
    fontSize: 20,
    color: "#fff",
    marginTop: 30,
    fontFamily: "Quicksand-Medium",
  },
  enter: {
    position: "absolute",
    bottom: 30,
    opacity: 1,
    backgroundColor: "#7799CC",
    width: 200,
    height: 30,
    padding: 7,
    textAlign: "center",
    borderRadius: 10,
    color: "#fff",
  },
  close: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  addDrink: {
    position: "absolute",
    top: 50,
    left: 40,
  },
  image: {
    position: "absolute",
    top: 45,
    left: 120,
  },
  cocktailName: {
    width: 200,
    borderWidth: 0.2,
    position: "absolute",
    top: 120,
    paddingLeft: 10,
    height: 30,
    borderRadius: 5,
  },
  dropdown: {
    width: 200,
    textAlign: "center",
    borderWidth: 0.2,
    position: "absolute",
    top: 60,
    left: 30,
  },
  alcoholType: {
    width: 200,
    borderWidth: 0.2,
    position: "absolute",
    top: 180,
    paddingLeft: 10,
    height: 50,
    borderRadius: 5,
  },
  imageEntry: {
    borderRadius: 100 / 2,
    width: 100,
    position: "absolute",
    height: 100,
    top: 10,
  },
});
