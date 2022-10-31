import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";
import { sesion, nombre } from "../GuardiaScreen/GuardiaScreen.js";
import moment from "moment/moment.js";
import axios from "axios";
import { API } from "../../axios/Api.js";

const CapturaAsistenciaScreen = () => {
  const Navigation = useNavigation();
  var date = moment().format("YYYY-MM-DD");

  const alerta_asistencia_existente = () =>
    Alert.alert(
      "Toma de asistencia",
      "Este usuario ya tiene registrado la entrada del dia de hoy",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const alerta_entrada_asistencia = () =>
    Alert.alert(
      "Toma de asistencia",
      "Este usuario ya tiene registrado la entrada y salida del dia de hoy",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const alerta_error_registro = (error) =>
    Alert.alert(
      "Registro de usuario",
      "El registro no se logro satisfactoriamente, favor de contactarse con sistemas: " +
        error,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const alerta_asistencia_rechazada = () =>
    Alert.alert(
      "Asistencia de practicante",
      "Se rechazo la asistencia del practicante",
      [
        {
          text: "Ok",
          //onPress: () => Navigation.navigate("GuardiaScreen"),
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
      "Se acepto la asistencia del practicante, hora de entrada:" + date,
      [
        {
          text: "Ok",
          //onPress: () => Navigation.goBack(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const onConsultarAsistenciaEntrada = () => {
    try {
      var fechaQuery = "%" + date + "%";
      axios
        .post(API + "post_asistenciaEntradaActual", {
          id: sesion,
          fecha: fechaQuery,
        })
        .then((respuesta) => {
          console.log(respuesta.data);
          if (respuesta.data != "303") {
            var estatus = respuesta.data[0]["estado"];
            console.log(estatus);
            if (estatus == "1") {
              alerta_entrada_asistencia();
            } else if (estatus == "0") {
              alerta_asistencia_existente();
            }
          } else if (respuesta.data == "303") {
            onTomarAsistencia();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onTomarAsistencia = () => {
    try {
      axios
        .post(API + "post_tomarAsistencia", {
          estado: 0,
          id: sesion,
        })
        .then((respuesta) => {
          console.log(sesion);
          console.log(respuesta.data);
          const AR = respuesta.data["affectedRows"];
          console.log(AR);
          if (AR == "1") {
            alerta_asistencia_aceptada();
          } else {
            alerta_error_registro(
              "No se vio reflejada el registro en la base de datos"
            );
          }
        })
        .catch((error) => {
          alerta_error_registro(error);
        });
    } catch (error) {
      alerta_error_registro(error);
    }
  };

  const onRegistrandoAsistencia = async () => {
    onConsultarAsistenciaEntrada();
  };

  const onRechazarAsistencia = async () => {
    alerta_asistencia_rechazada();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}></Text>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>{sesion}</Text>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>{nombre}</Text>

      <CustomButton
        text="ACEPTAR ENTRADA"
        onPress={onRegistrandoAsistencia}
        type="SECONDARY"
      />

      <CustomButton
        text="RECHAZAR ENTRADA"
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
