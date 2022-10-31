import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../axios/Api.js";

var sesion = "";
var estadoUsuario = "";

const SignUpScreen = () => {
  const [noempleado, setNoempleado] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombreMentor, setNombreMentor] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const navigation = useNavigation();

  const alerta_usuario_existente = () =>
    Alert.alert(
      "Registro de usuario",
      "Este numero de empleado ya existe",
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

  const alerta_usuario_inexistente = () =>
    Alert.alert(
      "Registro de usuario",
      "Numero de empleado no encontrado: Solicitar alta de usuario con los guardias",
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
          onPress: () => navigation.navigate("SignIn"),
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

  const onRegistrarseValidacion = (e) => {
    e.preventDefault();
    console.log("presionado");
    if (noempleado == "") {
      alerta_usuario_inexistente();
    } else {
      axios
        .get(API + "get_consultaNoEmpleado/" + noempleado)
        .then((respuesta) => {
          console.log(respuesta.data);
          if (respuesta.data != "303") {
            sesion = respuesta.data[0]["idPracticantes"];
            estadoUsuario = respuesta.data[0]["estadoPracticante"];
            if (estadoUsuario == "1") {
              alerta_usuario_existente();
            } else if (estadoUsuario == "0") {
              onRegistrarse();
            }
          } else if (respuesta.data == "303") {
            alerta_usuario_inexistente();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onRegistrarse = () => {
    console.log("presionado");
    axios
      .post(API + "create_registroPracticante", {
        noempleado: noempleado,
        nombre: nombres + " " + apellidos,
        nombreMentor: nombreMentor,
        correo: correo,
        contrasena: contrasena,
        tipousuario: "TP1",
      })
      .then((respuesta) => {
        console.log(respuesta.data);
        const AR = respuesta.data["affectedRows"];
        console.log(AR);
        if (AR == "1") {
          alerta_usuario_registrado();
          updateStatus();
        } else {
          alerta_error_registro();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStatus = () => {
    axios
      .post(API + "post_estatusPracticantes", {
        id: noempleado,
        estadoPracticante: "1",
      })
      .then((respuesta) => {
        console.log(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSingInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Registra tus datos</Text>

      <CustomInputs
        placeholder="Numero de empleado"
        value={noempleado}
        setValue={setNoempleado}
      />

      <CustomInputs
        placeholder="Nombre(s)"
        value={nombres}
        setValue={setNombres}
      />

      <CustomInputs
        placeholder="Apellido(s)"
        value={apellidos}
        setValue={setApellidos}
      />

      <CustomInputs
        placeholder="Nombre completo de tu mentor"
        value={nombreMentor}
        setValue={setNombreMentor}
      />

      <CustomInputs placeholder="Correo" value={correo} setValue={setCorreo} />

      <CustomInputs
        placeholder="Contraseña"
        value={contrasena}
        setValue={setContrasena}
        secureTextEntry={true}
      />

      <CustomInputs
        placeholder=" Repita la Contraseña"
        value={repetirContrasena}
        setValue={setRepetirContrasena}
        secureTextEntry={true}
      />

      <CustomButton text="Registrarse" onPress={onRegistrarseValidacion} />

      <CustomButton
        text="Volver al inicio de sesion"
        onPress={onSingInPressed}
        type="TERTIARY"
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

export default SignUpScreen;
