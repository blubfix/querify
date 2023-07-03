import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TextInput} from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    BottomNavigation,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_300Light } from '@expo-google-fonts/manrope'

const RegisterScreen_1 =({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [textInputText, setTextInputText] = useState('')
    const [errorText, setErrorText] = useState('')

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    const checkMail = async (mail) => {
        if (!mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setTextInputColor('#DC2626');
            setErrorText('Bitte gib eine gültige E-Mail Adresse ein.');
        } else {
            setTextInputColor('#E3E5E5');
            setErrorText('');
            navigation.navigate("RegisterScreen_2")
        }
    }

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.4}>
                        <Col>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Wie ist deine E-Mail Adresse?</Text>
                                    <Text style={styles.subHeaderText}>Bestätige deine E-Mail Adresse, um den Zugriff auf dein Konto nicht zu verlieren.</Text>
                                    <SingleLineInput borderColor={textInputColor} value={textInputText} onChangeText={setTextInputText} type={'username'}/>
                                    <Text style={styles.errorText}>{errorText}</Text>
                                </Col>
                            </Row>
                            <Row >
                                <Col inline>
                                    <CheckBox
                                        value={checked}
                                        onValueChange={setChecked}
                                        style={styles.checkbox} 
                                        color={'#734498'}
                                    />
                                    <Text style={styles.checkboxText}>Ich möchte Werbung und Marketingmitteilungen von querify erhalten.</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Weiter'} onPress={() => checkMail(textInputText)}/>
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
        fontFamily: 'Inter_700Bold'
    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#64748B',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 15,
        fontFamily: 'Manrope_400Regular'
    },

    errorText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'Manrope_300Light',
        color: '#DC2626',
    },

    checkboxText: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10,
        fontFamily: 'Manrope_400Regular'
    },
    
    checkbox: {
        alignSelf: 'center',
        color: '#734498',
        borderWidth: 1.5
    }


})

export default RegisterScreen_1;