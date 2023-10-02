import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions } from "react-native";
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


    // checkToken(); // Check token when the component mounts





    return (
        <PaperProvider>

            <Grid container style={styles.container}>
                <Row nopad>
                    <Col nopad>
                        <Image
                            style={styles.Logo}
                            source={require('../Images/Logo.png')} />
                        <Text style={{ color: "#00B3FF", alignSelf: "center", fontSize: 96, fontFamily: 'Italiana_400Regular' }} >querify</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ display: "flex", alignItems: "center", }}>
                            <SubmitButton buttonText={"Anmelden"} onPress={() => navigation.navigate("LoginScreen")} />
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ display: "flex", alignItems: "center", }}>
                            <SubmitButton buttonText={"Konto erstellen"} onPress={() => navigation.navigate("RegisterScreen_1")} />
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

