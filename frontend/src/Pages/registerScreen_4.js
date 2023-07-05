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
import { Manrope_400Regular } from '@expo-google-fonts/manrope';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen_4 =({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [textInputColor, setTextInputColor] = useState('#E3E5E5')
    const [textInputText, setTextInputText] = useState('')
    const [errorText, setErrorText] = useState('')


    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Poppins_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.35}>
                        <Col>
                            <Row>
                                <Col>
                                    <View style={styles.gradientContainer}>
                                        <LinearGradient colors={['#72479C', '#AF3139']} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                                            <View style={styles.headerContainer}>
                                                <Text style={styles.headerText}>Erfolgreich</Text>
                                                <MaterialCommunityIcons style={styles.thumbIcon} name='thumb-up-outline' color={'white'} size={20} />
                                            </View>
                                            <Text style={styles.subHeaderTextInter}>Du hast dein querify-Konto vollständig angelegt!</Text>
                                        </LinearGradient>
                                    </View>
                                    
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <Text style={styles.subHeaderText}>
                                        Starte sofort mit der Erstellung deiner ersten Umfrage und teile sie mit deinen Freunden, Familienmitgliedern, Arbeitskollegen oder Kommilitonen!
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubmitButton buttonText={'Loslegen'} onPress={() => navigation.navigate('CreateQuestionaire')}/>
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

    gradientContainer: {
        marginTop: 25,
    },

    linearGradient: {
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 15
    },

    headerContainer: {
        flexDirection: 'row'
    },

    thumbIcon: {
        marginLeft: 5
    },

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: "flex-start",
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },

    subHeaderTextInter: {
        fontSize: 14,
        fontWeight: '400',
        color: '#E7E7FF',
        alignSelf: "flex-start",
        fontFamily: 'Inter_400Regular'
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
    }


})

export default RegisterScreen_4;