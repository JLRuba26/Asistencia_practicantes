import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../axios/Api.js";

const SignUpNoEmpleado = () => {
  const [noempleado, setNoempleado] = useState("");
  const navigation = useNavigation();
  var estadoUsuario;

  const alerta_usuario_existente = () =>
    Alert.alert(
      "Alta de usuario",
      "Este numero de empleado ya ha sido dado de alta",
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

  const alerta_usuario_espera = () =>
    Alert.alert(
      "Alta de usuario",
      "Este numero de empleado ya ha sido dado de alta, en espera del registro del practicante.",
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

  const alerta_usuario_registrado = () =>
    Alert.alert(
      "Registro de usuario",
      "Usuario registrado exitosamente",
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

  const alerta_error_registro = () =>
    Alert.alert(
      "Registro de usuario",
      "El registro no se logro satisfactoriamente, favor de contactarse con sistemas",
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

  const onRegistrarNoEmpleados = () => {
    try {
      axios
        .get(API + "get_consultaNoEmpleado/" + noempleado)
        .then((respuesta) => {
          console.log(respuesta.data);
          if (respuesta.data != "303") {
            estadoUsuario = respuesta.data[0]["estadoPracticante"];
            if (estadoUsuario == "1") {
              alerta_usuario_existente();
            } else if (estadoUsuario == "0") {
              alerta_usuario_espera();
            }
          } else if (respuesta.data == "303") {
            onDarDeAlta();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onDarDeAlta = () => {
    axios
      .post(API + "create_altaNoEmpleados", {
        noempleado: noempleado,
        estadoPracticante: 0,
      })
      .then((respuesta) => {
        console.log(respuesta.data);
        const AR = respuesta.data["affectedRows"];
        console.log(AR);
        if (AR == "1") {
          alerta_usuario_registrado();
        } else {
          alerta_error_registro();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Dar de alta a practicante</Text>

      <CustomInputs
        placeholder="Numero de empleado"
        value={noempleado}
        setValue={setNoempleado}
      />

      <CustomButton text="Dar de alta" onPress={onRegistrarNoEmpleados} />
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
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default SignUpNoEmpleado;
