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
import { Modal } from "react-native-web";

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
      <View style={{ backgroundColor: "#fff" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
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
                    <Text style={{ color: "#fff" }}>
                      1. Choose a name {"\n"}
                    </Text>
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
        </Modal>
        <Image
          source={require("../assets/cocktails/compImg.png")}
          style={styles.compImg}
        />
        <Pressable
          style={styles.enterComp}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.enterTxt}>Enter your cocktail</Text>
          <Ionicons
            name="add-circle-outline"
            size={20}
            color="#dd9a9a"
            style={styles.addIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Competitions;
