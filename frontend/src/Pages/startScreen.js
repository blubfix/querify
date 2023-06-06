import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

import { useFonts } from 'expo-font';






export default function StartScreen({ navigation }) {
    

    const [fontsLoaded] = useFonts({
        'Italiana-Regular': require('../Fonts/Italiana-Regular.ttf'),
      });

    


    return (
        <PaperProvider theme={theme} >

            <Grid container style={styles.container}>
                <Row>
                    <Col>
                        <Image
                            style={styles.Logo}
                            source={require('../Images/Logo.png')} />
                        <Text style={{ color: "#00B3FF", alignSelf:"center", fontSize:96, fontFamily:'Italiana-Regular' }}>querify</Text>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <View style={{ display: "flex", alignItems: "center", }}>
                            <SubmitButton buttonText={"Anmelden"} onPress={() => navigation.navigate("LoginScreen")} />
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ display: "flex", alignItems: "center", }}>
                            <SubmitButton buttonText={"Konto erstellen"} onPress={() => navigation.navigate("RegisterScreen")} />
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
        marginTop:20,
        height: 500,
        width: "100%",

    },

});

const theme = {
    ...DefaultTheme,

    colors: {
        ...DefaultTheme.colors,
        primary: "purple",
        secondary: "yellow",
        background: "black",





    },

};

