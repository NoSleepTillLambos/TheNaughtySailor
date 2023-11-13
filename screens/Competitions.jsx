import Ionicons from "@expo/vector-icons/Ionicons";
import { Tooltip } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { addCocktailCompetition } from "../services/firebaseDB";

const Competitions = () => {
  const [openTip, setOpenTip] = useState(false);
  const [value, setValue] = useState(null);
  const [alcoholOne, setAlcoholOne] = useState("");
  const [alcoholTwo, setAlcoholTwo] = useState("");
  const [items, setItems] = useState([
    { label: "Non Alcoholic", value: "non-alcoholic" },
    { label: "Alcoholic", value: "alcoholic" },
  ]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const createComp = () => {
    try {
      addCocktailCompetition(name, value, image, alcoholOne, alcoholTwo);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAlcoholOne, setName, "";
      setImage(null);
      setSuccess(false);
    }
  };
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    console.log(image);
  };

  return (
    <View style={styles.container}>
      {success ? (
        <View style={styles.successView}>
          <AnimatedLottieView
            autoPlay
            style={{
              position: "absolute",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: 1,
              left: 30,
              top: 90,
            }}
            source={require("../assets/animations/success.json")}
          />
        </View>
      ) : (
        <View style={styles.EnterDetails}>
          <Text style={styles.heading}>Create competition</Text>

          <Tooltip
            visible={openTip}
            onOpen={() => setOpenTip(true)}
            onClose={() => setOpenTip(false)}
            popover={
              <>
                <Text style={{ color: "#fff" }}>1. Choose a name {"\n"}</Text>
                <Text style={{ color: "#fff" }}>2. Choose a category</Text>
                <Text style={{ color: "#fff" }}>
                  3. Upload a picture of your cocktail
                </Text>
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
            placeholder="Alcoholic or non-alcoholic"
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
          <Text style={styles.cocktailImage}>
            Select the competition image:
          </Text>
          <View style={styles.cocktailImg}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ height: 130, width: 130, borderRadius: 130 / 2 }}
              />
            )}
          </View>
          <View style={styles.inputGroup}>
            {image ? (
              <Pressable onPress={() => setImage(null)}>
                <Ionicons name="trash-outline" size={20} color="red" />
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
          <Text style={{ paddingLeft: 30, fontSize: 10, marginBottom: 5 }}>
            What type of alcohol must it contain?
          </Text>
          <View style={styles.alcoholType}>
            <TextInput
              style={styles.alcohol}
              keyboardType="default"
              defaultValue={alcoholOne}
              onChangeText={(newValue) => setAlcoholOne(newValue)}
            />
            <TextInput
              style={styles.alcohol}
              keyboardType="default"
              defaultValue={alcoholTwo}
              onChangeText={(newValue) => setAlcoholTwo(newValue)}
            />
          </View>

          <TouchableOpacity style={styles.upload} onPress={createComp}>
            <Text style={styles.Enter}>Create Competition</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Competitions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successView: {
    backgroundColor: "green",
    opacity: 0.7,
    height: "100%",
    width: "100%",
  },
  alcohol: {
    height: 50,
    width: 135,
    borderRadius: 10,
    marginLeft: 30,
    paddingLeft: 15,
    marginVertical: 4,
    shadowColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dd9a9a",
    padding: 10,
    backgroundColor: "#fff",
  },
  EnterDetails: {
    alignSelf: "flex-start",
    marginTop: 60,
  },
  heading: {
    marginBottom: 2,
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 15,
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
  alcoholType: {
    flex: 1,
    flexDirection: "row",
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
    borderWidth: 1,
    borderColor: "#dd9a9a",
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
    height: 130,

    width: 130,
    borderRadius: 130 / 2,
    color: "black",
    marginLeft: 30,
    marginBottom: 20,
  },

  upload: {
    width: 300,
    height: 50,
    left: 30,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 130,
    borderRadius: 10,
  },
  uploadImageButton: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    gap: 15,
    alignItems: "left",
    marginLeft: 50,
  },

  Enter: {
    textAlign: "center",
    marginTop: 15,
  },
  dropdown: {
    backgroundColor: "#fff",
    width: 300,
    height: 50,
    border: 1,
    marginLeft: 30,
  },
});
