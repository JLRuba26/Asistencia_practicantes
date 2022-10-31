import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";
import { sesion, nombre } from "../GuardiaScreen/GuardiaScreen.js";

const CapturaAsistenciaScreen = () => {
  const Navigation = useNavigation();
  var date = new Date().toLocaleString();
  var hora;

  onRegistrarAsistencia = async () => {
    alerta_asistencia_aceptada();
    //hora = date.getTime;
  };

  onRechazarAsistencia = async () => {
    alerta_asistencia_rechazada();
  };

  const alerta_asistencia_rechazada = () =>
    Alert.alert(
      "Asistencia de practicante",
      "Se rechazo la asistencia del practicante",
      [
        {
          text: "Ok",
          onPress: () => Navigation.navigate("GuardiaScreen"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const alerta_asistencia_aceptada = () =>
    Alert.alert(
      "Asistencia de practicante",
      "Se acepto la asistencia del practicante, hora de entrada:",
      [
        {
          text: "Ok",
          onPress: () => Navigation.goBack(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View style={styles.root}>
      <Text style={styles.title}></Text>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>{sesion}</Text>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>{nombre}</Text>

      <CustomButton
        text="Registrar asistencia"
        onPress={onRegistrarAsistencia}
        type="SECONDARY"
      />

      <CustomButton
        text="Rechazar Asistencia"
        onPress={onRechazarAsistencia}
        type="SECONDARY"
      />
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

export default CapturaAsistenciaScreen;
