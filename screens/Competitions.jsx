import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Tooltip, useTheme } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../services/firebaseAuth";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import { firebaseAuth } from "../firebase";
import { addCocktailToCollection } from "../services/firebaseDB";
import { uploadToStorage } from "../services/firebaseStorage";

const Competitions = () => {
  const [openTip, setOpenTip] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Non Alcoholic", value: "non" },
    { label: "Alcoholic", value: "alc" },
  ]);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const createCocktailEntry = async () => {
    // do all inputs have value

    if (name && value) {
      var creatorInfo = firebaseAuth.currentUser;

      var cocktail = {
        value,
        name,
      };

      var features = [];
      image && features.push({ imageUrl: image, title: image });

      const success = await addCocktailToCollection(cocktail, features);

      if (success) {
        console.log("added cocktail successfully");
        NavigationPreloadManager.goBack();
      } else {
        console.log("not added");
      }
    } else {
      Alert.alert("Please fill in all the fields");
    }
  };

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const [cocktailOne, setCocktailOne] = useState("");
  const [cocktailTwo, setCocktailTwo] = useState("");

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 0.7,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.EnterDetails}>
          <Text style={styles.heading}>
            Take your shot at the best cocktail!
          </Text>
          {/* // tooltip for entering comp */}
          <Tooltip
            visible={openTip}
            onOpen={() => setOpenTip(true)}
            onClose={() => setOpenTip(false)}
            popover={
              <>
                <Text style={{ color: "#fff" }}>
                  1. Choose a name {"\n"} 2.Enter the category
                </Text>
                <Text style={{ color: "#fff" }}>2. Choose a category</Text>
                <Text style={{ color: "#fff" }}>2. Select an image</Text>
              </>
            }
          >
            <Text style={{ fontSize: 15, paddingLeft: 30 }}>
              Rules<Ionicons name="help-outline"></Ionicons>
            </Text>
          </Tooltip>
          <Text style={styles.cocktailType}>Cocktail type:</Text>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            placeholder="Alcoholic or non"
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
          />
          <Text style={styles.cocktailName}>Cocktail name:</Text>
          <TextInput
            style={styles.cocktailPick}
            keyboardType="default"
            defaultValue={name}
            onChangeText={(newValue) => setName(newValue)}
          />
          <Text style={styles.cocktailImage}>Select your cocktail image:</Text>
          <View style={styles.cocktailImg}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  alignSelf: "center",
                  width: 290,
                  height: 200,
                  marginTop: 5,
                  borderRadius: 20,
                }}
              />
            )}
          </View>
          <View style={styles.inputGroup}>
            {image ? (
              <Pressable onPress={() => setImage(null)}>
                <Ionicons name="trash-outline" size={32} color="red" />
              </Pressable>
            ) : (
              <>
                <Pressable
                  style={styles.uploadImageButton}
                  onPress={() => pickImageFromLibrary(1)}
                >
                  <Ionicons name="images-outline" size={32} color="white" />
                </Pressable>
                <Pressable onPress={() => {}}>
                  <Ionicons name="camera-outline" size={34} color="white" />
                </Pressable>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.upload} onPress={createCocktailEntry}>
            <Text style={styles.Enter}>Enter Cocktail competition!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Competitions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2B5B5",
    height: "100%",
    flex: 1,
  },
  EnterDetails: {
    alignSelf: "flex-start",
    marginTop: 60,
  },
  heading: {
    color: "white",
    marginBottom: 10,
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    textAlign: "center",
  },
  steps: {
    color: "white",
    marginBottom: 20,
  },
  steps: {
    textAlign: "left",
  },
  cocktailType: {
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 30,
    marginBottom: 5,
  },
  cocktailName: {
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 30,
    marginBottom: 5,
  },
  cocktailPick: {
    backgroundColor: "#fff",
    height: 50,
    width: 300,
    borderRadius: 10,
    marginLeft: 30,
    paddingLeft: 15,
  },
  cocktailImage: {
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 30,
    marginBottom: 15,
  },
  cocktailImg: {
    backgroundColor: "#fff",
    height: 210,
    width: 300,
    borderRadius: 10,
    color: "black",
    marginLeft: 30,
    marginBottom: 20,
  },
  upload: {
    width: 300,
    height: 50,
    backgroundColor: "#fff",

    marginLeft: 30,
    marginTop: 20,
    borderRadius: 10,
  },
  uploadImageButton: {
    marginBottom: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 15,
    alignItems: "left",
    marginLeft: 50,
  },
  Ionicons: {
    size: "32px",
  },
  Enter: {
    textAlign: "center",
    marginTop: 15,
  },
  dropdown: {
    backgroundColor: "#fff",
    width: 300,
    height: 50,
    marginLeft: 30,
  },
});
