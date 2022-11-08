import { View, Text, StyleSheet, Button, Alert, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { sesion as noEmpleado } from "../SingInScreen/SignInScreen.js";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Heading } from "native-base";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../axios/Api.js";

var noempleado;
var sesion;
var nombre;

const AsistenciaEntradaScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [textPermission, setTextPermission] = useState(
    "Aun no se ha escaneado el codigo"
  );
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

  const offset = useRef(new Animated.Value(0)).current;
  const animation = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(offset, {
          toValue: 320,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(offset, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    )
  ).current;

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status == "granted")
        setTextPermission("Coloca el código en la cámara");
      else setTextPermission("La aplicación no tiene permisos para la cámara");
      setHasPermission(status === "granted");
    })();
  };

  // Solicitud de permiso a la camara
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Comportamiento al escanear un codigo
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    animation.stop();
    cameraRef.current.pausePreview();
    setTextPermission(data);
    noempleado = data;
    animation.stop();
    onCapturaAsistencia();
    console.log("Type: " + type + "\nData: " + data);
  };

  //Preguntando por permisos
  if (hasPermission === null) {
    return (
      <View style={styles.root}>
        <Text>Requiriendo permisos para la camara</Text>
        <CustomButton
          text="Habilitar camara"
          onPress={() => askForCameraPermission()}
        />
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
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Heading textAlign="center" size="md" color="#50514f" marginBottom={2}>
        REGISTRO DE ENTRADAS DE PRACTICANTES
      </Heading>
      <Heading textAlign="center" size="md" color="#50514f" marginBottom={2}>
        {textPermission}
      </Heading>
      <Box
        overflow="hidden"
        borderRadius={30}
        width={330}
        height={330}
        backgroundColor="#50514f"
      >
        {hasPermission ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            ratio="1:1"
            onBarCodeScanned={handleBarCodeScanned}
            onCameraReady={() => animation.start()}
          />
        ) : null}
        <Animated.View
          top={offset}
          width="100%"
          height={5}
          backgroundColor="#00ff00"
        />
      </Box>
    </SafeAreaView>
  );
};

const border = {
  borderWidth: 2,
  borderColor: "red",
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
export default AsistenciaEntradaScreen;
