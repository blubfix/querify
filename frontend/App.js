import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import MasterPage from './src/Pages/MasterPage'
import startScreen from './src/Pages/startScreen'
import Login from './src/Pages/Login'
import LoginScreen from './src/Pages/loginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogoTitle from "./src/Components/LogoTitle";
import RegisterScreen_2 from './src/Pages/registerScreen_2';
import RegisterScreen_1 from './src/Pages/registerScreen_1';
import RegisterScreen_3 from './src/Pages/registerScreen_3';
import RegisterScreen_4 from './src/Pages/registerScreen_4';

// Erstellen einer Instanz der Bottom-Tab-Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="StartScreen" component={startScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false  }}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.25}/>, headerShadowVisible: false   }}
                />
                <Stack.Screen name="RegisterScreen_1" component={RegisterScreen_1} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.25}/>, headerShadowVisible: false  }}
                />
                <Stack.Screen name="RegisterScreen_2" component={RegisterScreen_2} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.5}/>, headerShadowVisible: false  }}
                />
                <Stack.Screen name="RegisterScreen_3" component={RegisterScreen_3} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.75}/>, headerShadowVisible: false  }}
                />
                <Stack.Screen name="RegisterScreen_4" component={RegisterScreen_4} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false  }}
                />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

function Home() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#0C0F16' } }}>
            <Tab.Screen name="Login" component={Login} options={{
                tabBarLabel: 'Login',
                tabBarStyle: { display: "none" }, // Legt die Textbeschriftung des Tabs auf "Info" fest
                tabBarIcon: ({ color, size }) => ( // Definiert das Symbol für den Tab
                    <Ionicons name="information-outline" color={color} size={size} /> /* Das Symbol ist ein Informations-Icon von Ionicons mit der Farbe und Größe, die der Navigator übergeben hat */
                ),
            }} />
            <Tab.Screen name="MasterPage" component={MasterPage} options={{
                tabBarLabel: 'MasterPage', // Legt den Textbeschriftung des Tabs auf "Home" fest
                tabBarIcon: ({ color, size }) => ( // Definiert das Symbol für den Tab
                    <Ionicons name="home" color={color} size={size} /> /* Das Symbol ist ein Home-Icon von Ionicons mit der Farbe und Größe, die der Navigator übergeben hat */
                ),
            }} />
        </Tab.Navigator>
    )
}