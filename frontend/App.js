import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

<<<<<<< HEAD
import MasterPage from "./src/Pages/MasterPage";
import StartScreen from "./src/Pages/startScreen";
=======
import Master from "./src/Pages/Master";
>>>>>>> origin/JP_DEV

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();







export default function App() {
    return (
<<<<<<< HEAD
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="StartScreen" component={StartScreen} />

                <Stack.Screen name="MasterPage" component={MasterPage} />


            </Stack.Navigator>
        </NavigationContainer >
=======
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
         
          <Stack.Screen name="Master" component={Master} />
  
  
        </Stack.Navigator>
      </NavigationContainer >
>>>>>>> origin/JP_DEV
    );
}