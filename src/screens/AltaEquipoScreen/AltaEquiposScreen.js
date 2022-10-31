import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { useNavigation } from "@react-navigation/native";

const AltaEquipo = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigation = useNavigation();

  const onRegistrarNoEmpleados = () => {
    navigation.navigate("SignUp");
  };

  const onSingInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Registra tus datos</Text>

      <CustomInputs
        placeholder="Numero de empleado"
        value={username}
        setValue={setUsername}
      />

      <CustomButton text="Registrar" onPress={onRegistrarNoEmpleados} />
      <CustomButton
        text="¿Ya tienes una cuenta? Iniciar sesion"
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

export default AltaEquipo;
