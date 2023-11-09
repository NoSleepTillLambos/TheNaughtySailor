import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useCollection } from "../hooks/useCollection";

const Friends = () => {
  const { isPending, error, documents } = useCollection("users");
  return (
    <View>
      <Text>Your friends</Text>
      {isPending && <View>Loading users...</View>}
      {error && <View>{error}</View>}
      {documents &&
        documents.map((user) => (
          <View key={user.id}>
            {user.online && <Text></Text>}
            <Text>{user.email}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Friends;
