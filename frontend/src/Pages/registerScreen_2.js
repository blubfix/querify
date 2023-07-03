import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions} from "react-native";
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

const RegisterScreen_2 =({ navigation }) => {
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [textInputText, setTextInputText] = useState('')
    const [errorText, setErrorText] = useState('')

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.5}>
                        <Col>
                            <Row size={0.8}>
                                <Col>
                                    <Text style={styles.headerText}>Wie lautet dein Vorname?</Text>
                                    <Text style={styles.subHeaderText}>Gib deinen Vornamen an, welcher in deinem Profil angezeigt werden soll.</Text>
                                    <SingleLineInput borderColor={textInputColor} value={textInputText} onChangeText={setTextInputText}/>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Wie lautet dein Geburtstag?</Text>
                                    <SingleLineInput borderColor={textInputColor} value={textInputText} onChangeText={setTextInputText}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Weiter'} onPress={() => navigation.navigate("RegisterScreen_3")}/>
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
        alignSelf: "flec-start",
        marginBottom: 15,
        fontFamily: 'Manrope_400Regular'
    },


})

export default RegisterScreen_2;