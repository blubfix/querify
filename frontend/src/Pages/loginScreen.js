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
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'

const LoginScreen =({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    const checkCredentials = async (mail, password) => {
        if (!mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setTextInputColor('#DC2626');
            setErrorText('Bitte gib eine gültige E-Mail Adresse ein.');
        } else if (password == ''){
            setTextInputColor('#DC2626');
            setErrorText('Bitte gib ein gültiges Passwort ein.');
        } else {
            setTextInputColor('#E3E5E5');
            setErrorText('');
            navigation.navigate("CreateQuestionaire")
        }
    }


    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.55}>
                        <Col>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Login</Text>
                                    <Text style={styles.subHeaderText}>Willkommen zurück. Gib deine Anmelde-informationen ein, um auf dein Konto zuzugreifen:</Text>
                                    <Text style={styles.textInputHeaderText}>E-Mail Adresse</Text>
                                    <SingleLineInput borderColor={textInputColor} value={mail} onChangeText={setMail} type={'username'}/>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <View style={styles.textInputHeaderContainer}>
                                        <Text style={styles.textInputHeaderText}>Passwort</Text>
                                        <Text style={styles.forgorPasswordText}>Passwort vergessen</Text>
                                    </View>
                                    <SingleLineInput borderColor={textInputColor} value={password} onChangeText={setPassword} type={'password'} secureTextEntry={true}/>
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
                    <Row size={0.1}>
                        <Col>
                            <SubmitButton buttonText={'Weiter'} onPress={() => checkCredentials(mail, password)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.submitText}>Hast du noch keinen Account? <Text style={styles.submitTextPurple} onPress={() => navigation.navigate('RegisterScreen_1')}>Registriere dich hier</Text></Text>
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

    textInputHeaderText: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 14,
        marginBottom: 5,
        color: '#191D23'
    },

    forgorPasswordText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 12,
        color: '#734498'
    },

    textInputHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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

    errorText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'Manrope_300Light',
        color: '#DC2626',
    },

    submitText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Manrope_400Regular',
        color: '#191D23'
    },

    submitTextPurple: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Manrope_700Bold',
        color: '#734498'
    }




})

export default LoginScreen;