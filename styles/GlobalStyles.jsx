import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D07474",
    width: "45%",
    height: 40,
    width: 155,
  },
  googleButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D07474",
    width: 155,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Quicksand-Medium",
    color: "#D07474",
  },
  googleLogo: {
    height: 25,
    width: 25,
  },
  shortInput: {
    marginVertical: 4,
    height: 50,
    width: "42.4%",
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginLeft: 20,
    padding: 10,
  },
  input: {
    marginVertical: 8,
    height: 50,
    width: "90%",
    borderBottomWidth: 1,
    flex: 1,
    borderColor: colors.primary,
    marginLeft: 20,
    padding: 10,
  },
});
