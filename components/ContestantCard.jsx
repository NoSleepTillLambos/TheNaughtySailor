import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const ContestantCard = (props) => {
  return (
    <View style={styles.entryCon}>
      <Text style={{ fontSize: 20 }}>{props.name}</Text>
      <Text style={styles.alcohol}>{props.alcohol}</Text>
      <Text style={styles.votes}>Total: {props.votes}</Text>
      <Image style={styles.img} source={props.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  entryCon: {
    fontSize: 20,
    height: 100,
    width: "80%",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 35,
    padding: 16,
    marginTop: 20,
  },
  alcohol: {
    color: "#dd9a9a",
    marginTop: 5,
  },
  votes: {
    marginTop: 10,
  },
  img: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default ContestantCard;
