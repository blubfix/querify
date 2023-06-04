import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./loginScreen";
import StartScreen from "./startScreen";

// Erstellen einer Instanz des NativeStackNavigators
const Stack = createNativeStackNavigator();

const Login = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} >
      <Stack.Screen name="startScreen" component={StartScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default Login;