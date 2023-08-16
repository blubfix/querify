import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium  } from '@expo-google-fonts/inter';
import { Manrope_400Regular } from '@expo-google-fonts/manrope'

const RegisterScreen_2 =({ navigation, route }) => {
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [textInputText, setTextInputText] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [errorText, setErrorText] = useState('')
    const [userData, setUserData] = useState({})

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    const goNextForm = () => {
        const data = saveUserData()
        navigation.navigate("RegisterScreen_3", data)
    }

    const saveUserData = () => {
        try {
            // Load existing user data
            const existingData = route.params;
            // Merge new data with existing data
            const newData = {
                ...existingData,
                name: name,
                geburtstag: birthday
            };
            console.log("rScreen2_newData: ", newData);
            return newData;

        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Wie lautet dein Vorname?</Text>
                                    <Text style={styles.subHeaderText}>Gib deinen Vornamen an, welcher in deinem Profil angezeigt werden soll.</Text>
                                    <SingleLineInput borderColor={textInputColor} value={name} onChangeText={setName}/>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Wie lautet dein Geburtstag?</Text>
                                    <SingleLineInput borderColor={textInputColor} value={birthday} onChangeText={setBirthday}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row size={0.05}/>
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Weiter'} onPress={() => goNextForm()}/>
                        </Col>
                    </Row>
                </Grid>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    progressBar: {
        alignSelf: 'center',
        width: '95%',
    },

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold'
    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#64748B',
        alignSelf: "flex-start",
        marginBottom: 15,
        fontFamily: 'Manrope_400Regular'
    },


})

export default RegisterScreen_2;