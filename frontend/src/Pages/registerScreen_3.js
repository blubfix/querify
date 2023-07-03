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
import { Manrope_400Regular, Manrope_300Light } from '@expo-google-fonts/manrope';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';

const RegisterScreen_3 =({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')


    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Poppins_500Medium,
        Manrope_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    const checkPassword = (password) => {
        if (password.length<6) {
            setTextInputColor('#DC2626');
            setErrorText('Bitte gib ein gültiges Passwort ein.');
        } else {
            setTextInputColor('#E3E5E5');
            setErrorText('');
            navigation.navigate("RegisterScreen_4")
        }

    }

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.37}>
                        <Col>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Wähle ein Passwort</Text>
                                    <Text style={styles.subHeaderText}>Es muss mindestens 6 Zeichen enthalten.</Text>
                                    <SingleLineInput borderColor={textInputColor} value={password} onChangeText={setPassword} type={'Password'} secureTextEntry={true}/>
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
                                    <Text style={styles.checkboxText}>Ich möchte angemeldet bleiben</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Konto Anlegen'} onPress={() => checkPassword(password)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={0.14}/>
                        <Col size={0.72}>
                            <Text style={styles.submitText}>
                                Indem du ein Konto erstellst, stimmst du der <Text style={styles.submitTextPurple}>Datenschutzrichtlinie</Text> und den <Text style={styles.submitTextPurple}>Nutzungsbedingungen</Text> von querify zu.
                            </Text>
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
    },

    submitText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: '#7D7D7D'
    },

    submitTextPurple: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: '#734498'
    },

    errorText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'Manrope_300Light',
        color: '#DC2626',
    },



})

export default RegisterScreen_3;