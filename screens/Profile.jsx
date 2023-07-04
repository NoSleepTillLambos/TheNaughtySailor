import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { updateUserProfile } from "../services/firebaseAuth";
import { getCurrentUser } from "../services/firebaseAuth";
import { ScrollView } from "react-native-gesture-handler";
import CocktailCard from "../components/CocktailCard";
import { updateUserInDb } from "../services/firebaseDB";
import * as ImagePicker from "expo-image-picker";

const Profile = (navigation) => {
  const user = getCurrentUser();

  const [profileUrl, setProfileUrl] = useState(user.photoUrl);
  const [username, setUsername] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);

  const updateProfileInfo = async () => {
    // update users profile information
    const authSuccess = updateUserProfile(email, profileUrl);

    // update user in db
    await updateUserInDb(user.uid, { email, profileUrl });
  };

  const [individualProjects, setIndividualCocktails] = useState([]);

  useEffect(() => {
    getUserCocktails();
  }, []);

  const getUserCocktails = async () => {
    const cocktails = await getCurrentUserProjects(user.uid);
    setIndividualCocktails(cocktails);
  };

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 0.7,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileUrl(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {profileUrl ? (
        <Image
          source={{ uri: profileUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      ) : (
        <Ionicons name="person-circle" size={100} color="#2b2b2b2" />
      )}

      <Text>Email: {firebaseAuth.currentUser.email}</Text>
      <Text>Your Cocktails</Text>
      <ScrollView>
        {individualProjects.map((cocktail, index) => {
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push("CompDetails", { cocktail })}
            activeOpacity={0.8}
          >
            <CocktailCard data={cocktail} />
          </TouchableOpacity>;
        })}
      </ScrollView>
      <Button onPress={() => firebaseAuth.signOut()} title="Sign out" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    backgroundColor: "#E2B5B5",
    height: "100%",
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 15,
    paddingLeft: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  submitButton: {
    marginTop,
    padding: 20,
    backgroundColor: "#2b2b2b",
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  profileBlock: {
    textAlign: "center",
    alignItems: "center",
  },
  profile: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
