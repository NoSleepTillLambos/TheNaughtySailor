import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState } from "react";
import { firebaseAuth } from "../firebase";
import { updateUserProfile } from "../services/firebaseAuth";
import { getCurrentUser } from "../services/firebaseAuth";

const Profile = () => {
  return (
    <View style={styles.heading}>
      <Text style={styles.heading}>hello</Text>

      <Text>Email: {firebaseAuth.currentUser.email}</Text>
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
  profile: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
