import React from "react";
import { View, StyleSheet } from "react-native";

import { TextInput } from "react-native-gesture-handler";

const SearchBar = ({ onSearch }) => {
  return (
    <View>
      <TextInput
        onChangeText={onSearch}
        placeholder="Find a restaurant..."
        style={{ height: 20, width: "90%", padding: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchBar;
