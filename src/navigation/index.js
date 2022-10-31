import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { BottomTab, ButtonTab } from "./BottomTab.js";

import HomeScreen from "../screens/HomeScreen/HomeScreeen";
import SignInScreen from "../screens/SingInScreen/SignInScreen";
import SignUpScreen from "../screens/SingUpScreen/SignUpScreen";
import SignUpNoEmpleados from "../screens/SignUpNoEmpleados/SignUpNoEmpleado";
import ConfirmEmailScreen from "../screens/ConfirmEmail/ConfirmEmailScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import GuardiaScreen from "../screens/GuardiaScreen";
import AltaEquipo from "../screens/AltaEquipoScreen/AltaEquiposScreen.js";
import CapturaAsistenciaScreen from "../screens/CapturaAsistenciaScreen/CapturaAsistenciaScreen.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigationPracticantes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const TabNavigationGuardias = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="GuardiaScreen"
        component={GuardiaScreen}
        options={{
          tabBarLabel: "ENTRADA",
        }}
      />
      <Tab.Screen
        name="AltaEquipo"
        component={AltaEquipo}
        options={{
          tabBarLabel: "EQUIPOS EXTERNOS",
        }}
      />
      <Tab.Screen
        name="SignUpNoEmpleados"
        component={SignUpNoEmpleados}
        options={{
          tabBarLabel: "ALTAS",
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="TabNavigationPracticantes"
          component={TabNavigationPracticantes}
        />
        <Stack.Screen
          name="TabNavigationGuardias"
          component={TabNavigationGuardias}
        />
        <Tab.Screen
          name="CapturaAsistencia"
          component={CapturaAsistenciaScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
