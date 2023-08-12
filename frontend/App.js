import React, { useState, useEffect } from "react";
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
import CreateQuestionaireScreen from './src/Pages/createQuestionaireScreen';
import AccountScreen from './src/Pages/accountScreen';
import InboxScreen from './src/Pages/inboxScreen';
import CalendarScreen from './src/Pages/calendarScreen';
import StatisticsScreen from './src/Pages/statisticScreen';
import CreateJaNein from './src/Pages/createJaNeinScreen';
import CreateMehrfach from './src/Pages/createMehrfachScreen';
import CreateFreitext from './src/Pages/createFreitextScreen';
import CreateStimmungsabfrage from './src/Pages/createStimmungsabfrageScreen';
import CreateErinnerung from './src/Pages/createErinnerungScreen';
import QuestionaireOptions from './src/Pages/questionaireOptionsScreen';
import ShareQuestionaire from './src/Pages/shareQuestionaireScreen';
import ShareReminder from './src/Pages/shareReminderScreen';
import AnswerJaNein from './src/Pages/answerJaNeinScreen';
import AnswerMehrfach from './src/Pages/answerMehrfachScreen';
import AnswerFreitext from './src/Pages/answerFreitextScreen';
import AnswerStimmungsbildStars from './src/Pages/answerStimmungsbildStarsScreen';
import AnswerStimmungsbildLikert from './src/Pages/answerStimmungsbildLikertScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';


// Erstellen einer Instanz der Bottom-Tab-Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
    const [tokenChecked, setTokenChecked] = useState(false); // Add state to track token check

    //TODO: check token if user is already loggedin
    //
    // useEffect(() => {
    //     checkToken(); // Check token when the component mounts
    // }, []);

    // const checkToken = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('authToken');
    //         if (token) {
    //             // Token exists, navigate to CreateQuestionaire
    //             setTokenChecked(true);
    //             navigation.navigate('CreateQuestionaire'); // Add this line
    //         } else {
    //             // Token doesn't exist, navigate to Login
    //             setTokenChecked(true);
    //             navigation.navigate('Login'); // Add this line
    //         }
    //     } catch (error) {
    //         console.error('Error checking token:', error);
    //     }
    // };
    // if (!tokenChecked) {
    //     // You can show a loading screen or something while checking the token
    //     return null;
    // }

    
    return (
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="StartScreen" component={startScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false, gestureEnabled: false  }}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.25}/>, headerShadowVisible: false, gestureEnabled: false   }}
                />
                <Stack.Screen name="RegisterScreen_1" component={RegisterScreen_1} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.25}/>, headerShadowVisible: false, gestureEnabled: false  }}
                />
                <Stack.Screen name="RegisterScreen_2" component={RegisterScreen_2} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.5}/>, headerShadowVisible: false, gestureEnabled: false  }}
                />
                <Stack.Screen name="RegisterScreen_3" component={RegisterScreen_3} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0.75}/>, headerShadowVisible: false, gestureEnabled: false  }}
                />
                <Stack.Screen name="RegisterScreen_4" component={RegisterScreen_4} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateQuestionaire" component={CreateQuestionaireScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AccountScreen" component={AccountScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="InboxScreen" component={InboxScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={0}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateJaNein" component={CreateJaNein} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateMehrfach" component={CreateMehrfach} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateFreitext" component={CreateFreitext} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateStimmungsabfrage" component={CreateStimmungsabfrage} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="CreateErinnerung" component={CreateErinnerung} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="QuestionaireOptions" component={QuestionaireOptions} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="ShareQuestionaire" component={ShareQuestionaire} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="ShareReminder" component={ShareReminder} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AnswerJaNein" component={AnswerJaNein} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AnswerMehrfach" component={AnswerMehrfach} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AnswerFreitext" component={AnswerFreitext} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AnswerStimmungsbildStars" component={AnswerStimmungsbildStars} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />
                <Stack.Screen name="AnswerStimmungsbildLikert" component={AnswerStimmungsbildLikert} options={{headerTitle: "", headerLeft: () => <LogoTitle progress={1}/>, headerShadowVisible: false, animation: 'none', gestureEnabled: false  }}
                />




            </Stack.Navigator>
        </NavigationContainer>
    )
}

function Home() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#0C0F16' } }}>
            <Tab.Screen name="MasterPage" component={MasterPage} options={{
                tabBarLabel: 'MasterPage', // Legt den Textbeschriftung des Tabs auf "Home" fest
                tabBarIcon: ({ color, size }) => ( // Definiert das Symbol für den Tab
                    <Ionicons name="home" color={color} size={size} /> /* Das Symbol ist ein Home-Icon von Ionicons mit der Farbe und Größe, die der Navigator übergeben hat */
                ),
            }} />
            <Tab.Screen name="Login" component={Login} options={{
                tabBarLabel: 'Login',
                //tabBarStyle: { display: "none" }, // Legt die Textbeschriftung des Tabs auf "Info" fest
                tabBarIcon: ({ color, size }) => ( // Definiert das Symbol für den Tab
                    <Ionicons name="information-outline" color={color} size={size} /> /* Das Symbol ist ein Informations-Icon von Ionicons mit der Farbe und Größe, die der Navigator übergeben hat */
                ),
            }} />
        </Tab.Navigator>
        // <Login/>
    )
}