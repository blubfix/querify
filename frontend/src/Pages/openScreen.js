import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    BottomNavigation,
    TextInput,
} from "react-native-paper";
import SubmitButton from "../Components/SubmitButton";
import LoginScreen from "./loginScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFonts, Italiana_400Regular } from '@expo-google-fonts/italiana';

import AsyncStorage from '@react-native-async-storage/async-storage';

//TODO: check token if user is already loggedin
//TODO: Navigate to stack rather then to page itself as naviagtion is not working



export default function StartScreen({ navigation }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [fontsLoaded] = useFonts({
        Italiana_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log(token);
            if (token) {
                setIsLoggedIn(true); // User is logged in
            } else {
                setIsLoggedIn(false); // User is not logged in

            }
            console.log(isLoggedIn);
        } catch (error) {
            console.error('Error checking token:', error);
        }
    };


    checkToken(); // Check token when the component mounts

    if (!isLoggedIn) {
        console.log("Login");
        setTimeout(() => {
            navigation.navigate("StartScreen"); // Navigate to the Login screen
        }, 2500); // Delay for 1 second (1000 milliseconds)
    } else {
        console.log("CreateQuestionaire_openScreen");
        setTimeout(() => {
            navigation.navigate("CreateQuestionaire"); // Navigate to the Login screen
        }, 2500); // Delay for 1 second (1000 milliseconds)
    }





    return (
        <PaperProvider>

            <Grid container style={styles.container}>
                <Row nopad>
                    <Col nopad>
                        <Image
                            style={styles.Logo}
                            source={require('../Images/Logo.png')} />
                        <Text style={{ color: "#00B3FF", alignSelf: "center", fontSize: 96, fontFamily: 'Italiana_400Regular' }} onPress={() => navigation.navigate('CreateQuestionaire')}>querify</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ flex: 1, marginTop:"20%",justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00B3FF" />
                        </View>
                    </Col>
                </Row>
            </Grid>
        </PaperProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",


        backgroundColor: "#000000",



    },
    Logo: {
        marginTop: 45,
        height: 500,
        width: "100%",

    },

});

