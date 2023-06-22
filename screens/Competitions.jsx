import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";

const Competitions = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "", value: "AWP" },
    { label: "M4A4", value: "M4A4" },
    { label: "AK-47", value: "AK-47" },
  ]);

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

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.EnterDetails}>
          <Text style={styles.WantEnter}>
            Want to try your luck at beating the best bartenders out there?
          </Text>
          <Text style={styles.Followsteps}>Follow these easy steps:</Text>

          <Text style={styles.steps}>Tell us your cocktails name</Text>
          <Text style={styles.steps}>2. Enter category for given skin.</Text>
          <Text style={styles.steps}>3. Enter a clear image of the skin.</Text>

          <Text style={styles.SkinNameLabel}>Gun type:</Text>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
          />

          <Text style={styles.SkinNameLabel}>Skin name:</Text>
          <TextInput
            style={styles.SkinName}
            keyboardType="default"
            // defaultValue={name}
            onChangeText={(newValue) => setName(newValue)}
          />

          <Text style={styles.SkinUploadLabel}>Select Image:</Text>
          <View style={styles.SkinImage}>
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
                  style={styles.uploadImgaeButton}
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

          <TouchableOpacity style={styles.upload}>
            <Text style={styles.Enter}>Enter Comp</Text>
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
    paddingTop: 50,
  },
  EnterDetails: {
    alignSelf: "flex-start",
    marginTop: 10,

    // backgroundColor: "#A12895",
  },
  WantEnter: {
    color: "white",
    marginBottom: 20,
    marginLeft: 20,
  },
  Followsteps: {
    color: "white",
    marginBottom: 20,
    marginLeft: 20,
  },
  steps: {
    color: "white",
    textAlign: "left",
    marginLeft: 25,
  },

  SkinNameLabel: {
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 30,
    marginBottom: 5,
    color: "white",
  },
  SkinName: {
    backgroundColor: "#393B3F",
    height: 50,
    width: 300,
    borderRadius: 20,
    color: "white",
    marginLeft: 30,
    paddingLeft: 15,
  },
  SkinUploadLabel: {
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 30,
    marginBottom: 15,
    color: "white",
  },
  SkinImage: {
    backgroundColor: "#393B3F",
    height: 210,
    width: 300,
    borderRadius: 20,
    color: "black",
    marginLeft: 30,
    marginBottom: 20,
  },
  upload: {
    width: 150,
    height: 50,
    backgroundColor: "#A12895",
    marginLeft: 30,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  uploadImgaeButton: {
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
  Enter: {
    color: "white",
    textAlign: "center",
    marginTop: 15,
  },
  dropdown: {
    backgroundColor: "#393B3F",
    width: 300,
    height: 50,
    marginLeft: 30,
    color: "white",
  },
});
