import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const ButtonTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DatosUsuarios" component={""} />
    </Tab.Navigator>
  );
};
