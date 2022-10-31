import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { sesion as noEmpleado } from "../SingInScreen/SignInScreen.js";
import QRCode from "react-native-qrcode-svg";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <QRCode
        value={noEmpleado}
        size={290}
        color="black"
        backgroundColor="white"
      ></QRCode>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>{noEmpleado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 100,
  },
  logo: {
    width: 200,
    maxWidth: 400,
    maxHeight: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    margin: 10,
    paddingBottom: 40,
  },
});

export default HomeScreen;
