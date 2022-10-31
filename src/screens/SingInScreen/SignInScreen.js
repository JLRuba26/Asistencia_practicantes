import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/ContinentalIcon.png";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../axios/Api.js";

var sesion = "";
var tipousuario = "";

const SignInScreen = () => {
  const [noempleado, setNoempleado] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const alerta_contrasena = () =>
    Alert.alert(
      "Inicio de sesion",
      "Contraseña Incorrecta",
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

  const alerta_usuario = () =>
    Alert.alert(
      "Inicio de sesion",
      "Usuario Incorrecto",
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

  const onSingInPressed = async (e) => {
    e.preventDefault();
    console.log("presionado");

    axios
      .post(API + "post_inicioSesion", {
        noempleado: noempleado,
        contrasena: password,
      })
      .then((respuesta) => {
        console.log(respuesta.data);
        if (respuesta.data != "303" && respuesta.data != "304") {
          sesion = respuesta.data[0]["idPracticantes"];
          tipousuario = respuesta.data[0]["tipousuario"];
          if (tipousuario == "TP1") {
            navigation.navigate("TabNavigationPracticantes");
          } else if (tipousuario == "TP0") {
            navigation.navigate("TabNavigationGuardias");
          }
        } else if (respuesta.data == "304") {
          alerta_usuario();
        } else if (respuesta.data == "303") {
          alerta_contrasena();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSingUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInputs
        placeholder="Numero de empleado"
        value={noempleado}
        setValue={setNoempleado}
      />

      <CustomInputs
        placeholder="Contraseña"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Iniciar Sesion" onPress={onSingInPressed} />
      <CustomButton text="Registrarse" onPress={onSingUpPressed} />
      <CustomButton
        text="¿Olvidaste la contraseña?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 100,
    backgroundColor: "#ffa600",
  },
  logo: {
    width: 200,
    maxWidth: 400,
    maxHeight: 400,
  },
});

export { sesion };
export default SignInScreen;
