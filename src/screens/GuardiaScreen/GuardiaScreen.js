import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { sesion as noEmpleado } from "../SingInScreen/SignInScreen.js";
import CustomButton from "../../components/CustomButton/CustomButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../axios/Api.js";

var noempleado;
var sesion;
var nombre;

const GuardiaScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Aun no se ha escaneado el codigo");
  const navigation = useNavigation();

  const alerta_usuario_encontrado = () =>
    Alert.alert(
      "Captura de asistencia",
      "Numero de empleado encontrado en la base de datos",
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

  const alerta_usuario_no_encontrado = () =>
    Alert.alert(
      "Captura de asistencia",
      "Numero de empleado no encontrado",
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

  const onCapturaAsistencia = async () => {
    console.log("codigo capturado");
    axios
      .post(API + "post_asistenciaPracticantes", {
        noempleado: noempleado,
      })
      .then((respuesta) => {
        sesion = respuesta.data[0]["idPracticantes"];
        nombre = respuesta.data[0]["nombre"];
        console.log(respuesta.data);
        if (respuesta.data != "303") {
          navigation.navigate("CapturaAsistencia");
          //alerta_usuario_encontrado();
          //console.log("Numero de empleado encontrado");
        } else if (respuesta.data == "303") {
          alerta_usuario_no_encontrado();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // Solicitud de permiso a la camara
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Comportamiento al escanear un codigo
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    noempleado = data;
    onCapturaAsistencia();
    console.log("Type: " + type + "\nData: " + data);
  };

  //Preguntando por permisos
  if (hasPermission === null) {
    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>{noEmpleado}</Text>
        <Text>Requiriendo permisos para la camara</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>{noEmpleado}</Text>
        <Text>Sin Acceso a la camara</Text>
        <CustomButton
          text="Habilitar camara"
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  // retorna la camara en funcion
  return (
    <View style={styles.root}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text>{text}</Text>
      {scanned && (
        <Button
          title={"Escanear de nuevo?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 100,
  },
  navigateButtons: {
    alignItems: "flex-end",
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
  barcodebox: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 25,
  },
});

export { sesion, nombre };
export default GuardiaScreen;
