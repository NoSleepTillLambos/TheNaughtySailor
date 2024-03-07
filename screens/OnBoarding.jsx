import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnBoarding = () => {
  // loading fonts
  let [fontsLoaded] = useFonts({
    // cursive font
    "Dancing-SemiBold": require("../assets/fonts/DancingScript-SemiBold.ttf"),
    // QUICKSAND FONTS
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  // on done
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Onboarding
        showNext={false}
        onDone={handleDone}
        bottomBarHighlight={false}
        showSkip={false}
        titleStyles={{ fontFamily: "Quicksand-Bold", color: "#fff" }}
        subTitleStyles={{ fontFamily: "Quicksand-Medium", color: "#fff" }}
        containerStyles={{ paddingHorizontal: 20 }}
        pages={[
          {
            backgroundColor: "#E2B5B5",
            image: (
              <AnimatedLottieView
                source={require("../assets/animations/onboarding1.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Create",
            subtitle: "Create competitions & have others compete in them",
          },
          {
            backgroundColor: "#E2B5B5",
            image: (
              <AnimatedLottieView
                source={require("../assets/animations/51632-drink-loader.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Enjoy",
            subtitle:
              "Enjoy the tips & tricks the app has to offer as your grow your skills",
          },
          {
            backgroundColor: "#E2B5B5",
            image: (
              <AnimatedLottieView
                source={require("../assets/animations/onboarding3.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Build",
            subtitle:
              "Build you own reputation & learn from some of the industries best",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "Quicksand-Medium",
  },
  lottie: {
    height: 250,
  },
});

export default OnBoarding;
