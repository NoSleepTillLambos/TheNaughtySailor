import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { firebaseAuth } from "../firebase";
import {
  changeEmail,
  getCurrentUser,
  updateAuthProfile,
} from "../services/firebaseAuth";
import { updateUserInDb } from "../services/firebaseDB";
import { uploadToStorage } from "../services/firebaseStorage";

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

  const signOut = async () => {
    try {
      firebaseAuth.signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (e) {
      Alert.alert(e + "means you couldn't sign out");
    }
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
        <Text style={styles.noentries}>Your currently have no entries </Text>
        <TouchableOpacity style={styles.button} onPress={signOut}>
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
  noentries: {
    textAlign: "center",
    marginTop: "25%",
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
    borderColor: "#D07474",
    borderWidth: 1,
    height: 40,
    left: 20,
    top: 640,
    position: "absolute",
    width: 150,
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
    borderColor: "#D07474",
    borderWidth: 1,
    height: 40,
    bottom: 0,
    right: 20,
    top: 640,
    position: "absolute",
    width: 150,
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
    color: "#D07474",
    fontFamily: "Quicksand-Medium",
  },
});
