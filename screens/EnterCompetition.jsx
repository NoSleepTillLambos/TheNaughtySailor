import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const EnterCompetition = () => {
  return (
    <View>
      <Text>
        <Skeleton animation="pulse" width={80} height={40} />
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={80}
          height={40}
        />
        <Skeleton animation="none" width={80} height={40} />
      </Text>
    </View>
  );
};

export default EnterCompetition;

const styles = StyleSheet.create({});
