import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions} from "react-native";
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
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'

import API from '../API/apiConnection'

const LoginScreen =({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [token, setToken] = useState('');

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

    //TODO: check token is already given in the Storage
    // useEffect(() => {
    //     getTokenFromStorage();
    // }, []);

    // const getTokenFromStorage = async () => {
    //     try {
    //         const storedToken = await AsyncStorage.getItem('authToken');
    //         if (storedToken) {
    //             setToken(storedToken);
    //         }
    //     } catch (error) {
    //         console.error('Error getting token from AsyncStorage:', error);
    //     }
    // };

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
        }
    }

    const loginUser = async () => {
        checkCredentials(mail, password)
        var data = {
            email: mail,
            password: password
        };
        console.log(data)
        API.postUserLogin(data)
            .then((resp) => {
                console.log(resp.data);
                //handleLogin(resp)
                navigation.navigate("CreateQuestionaire")
            })
            .catch((e) => {
                console.log(e);
                setTextInputColor('#DC2626');
                setErrorText('Bitte überprüfe E-Mail oder Passwort!');

            });
    };

    // TODO: Save token to the storage that the user dont need to login after closing the app
    // const handleLogin = async (resp) => {
    //     const data = await resp.json();

    //     if (resp.ok) {
    //         setToken(data.token);
    //         await AsyncStorage.setItem('authToken', data.token);
    //         console.log('Login successful. Token:', data.token);
    //     } else {
    //         console.log('Login failed:', data.message);
    //     }
    // }


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
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Weiter'} onPress={() => loginUser()}/>
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