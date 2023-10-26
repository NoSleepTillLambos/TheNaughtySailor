import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { changeEmail, updateAuthProfile } from "../services/firebaseAuth";
import { getCurrentUser } from "../services/firebaseAuth";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { updateUserInDb } from "../services/firebaseDB";
import * as ImagePicker from "expo-image-picker";
import { uploadToStorage } from "../services/firebaseStorage";
import { updateEmail } from "firebase/auth";

const Profile = (navigation) => {
  const user = getCurrentUser();
  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

    // cursive font
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const [email, setEmail] = useState(user.email);
  const [profileImg, setProfileImg] = useState(user.photoURL);

  const updateProfile = async () => {
    var uploadedImageUrl = null;
    if (profileImg != user.photoURL) {
      const uploadedImageUrl = await uploadToStorage(
        profileImg,
        `users/${user.uid}`
      );
    }
    const authSuccess = await updateAuthProfile(
      email,
      uploadedImageUrl ? uploadedImageUrl : profileImg
    );

    await updateUserInDb(user.uid, {
      email,
      profileImg: uploadedImageUrl ? uploadedImageUrl : profileImg,
    });

    const updateEmail = await changeEmail(email);
  };

  const chooseProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
    }
  };

  // TO DO: GET ALL USERS ENTRIES AND THERE AWARDS
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerCon}>
          {profileImg ? (
            <Image
              source={{ uri: profileImg }}
              style={{ width: 150, height: 150, borderRadius: 200 / 2 }}
            />
          ) : (
            <Ionicons name="person-circle" size={160} />
          )}

          <Ionicons
            onPress={() => chooseProfileImg()}
            style={styles.add}
            name="add-circle-outline"
            size={30}
          ></Ionicons>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={styles.emailInput}
          ></TextInput>
        </View>

        <Text style={styles.text}>Your Entries:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => firebaseAuth.signOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateBtn} onPress={updateProfile}>
          <Text style={styles.buttonText}>Update profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  add: {
    position: "absolute",
    top: 120,
    right: 100,
  },
  heading: {
    flex: 1,
    backgroundColor: "#E2B5B5",
    height: "100%",
  },
  innerCon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emailInput: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Quicksand-Bold",
  },
  updateBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7799CC",
    height: 40,
    left: 20,
    top: 640,
    position: "absolute",
    width: 150,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Quicksand-Medium",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#7799CC",
    height: 40,
    bottom: 0,
    right: 20,
    top: 640,
    position: "absolute",
    width: 150,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  profileBlock: {
    textAlign: "center",
    alignItems: "center",
  },
  profile: {
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Quicksand-Medium",
  },
});
