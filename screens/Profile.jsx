import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { firebaseAuth } from "../firebase";

const Profile = () => {
  return (
    <View>
      <Text>Voting</Text>
      <Text>Email: {firebaseAuth.currentUser.email}</Text>
      <Button onPress={() => firebaseAuth.signOut()} title="Sign out" />
      <Image></Image>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
