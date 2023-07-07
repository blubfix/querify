import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TouchableOpacity} from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    TextInput,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";

const CreateQuestionaireScreen =({ navigation }) => {

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


    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row>
                        <Col>
                            <Text style={styles.headerText}>Erstelle eine Umfrage</Text>
                            <Text style={styles.subHeaderText}>Entscheide dich vorab, welche Art der Umfrage du formulieren möchtest.</Text>
                        </Col>
                    </Row>

                    <Row size={0.27}>
                        <Col inline style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.questionaireButton} onPress={() => navigation.navigate('CreateJaNein')}>
                                <Image style={styles.questionaireImage} source={require('../Images/Ja-Nein.png')} />
                                <Text style={styles.buttonText}>Ja/Nein Umfrage</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.questionaireButton} onPress={() => navigation.navigate('CreateMehrfach')}>
                                <Image style={styles.questionaireImage} source={require('../Images/Mehrfach-Auswahl.png')} />
                                <Text style={styles.buttonText}>Mehrfach-Auswahl</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    
                    <Row size={0.27}>
                        <Col inline style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.questionaireButton} onPress={() => navigation.navigate('CreateFreitext')}>
                                <Image style={styles.questionaireImage} source={require('../Images/Freitexte.png')} />
                                <Text style={styles.buttonText}>Freitext Antwort</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.questionaireButton} onPress={() => navigation.navigate('CreateStimmungsabfrage')}>
                                <Image style={styles.questionaireImage} source={require('../Images/Stimmungsbild.png')} />
                                <Text style={styles.buttonText}>Stimmungsbild</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    
                    <Row size={0.27}>
                        <Col inline style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.questionaireButton} onPress={() => navigation.navigate('CreateErinnerung')}>
                                <Image style={styles.questionaireImage} source={require('../Images/Erinnerung.png')} />
                                <Text style={styles.buttonText}>Erinnerung</Text>
                            </TouchableOpacity>

                        </Col>
                    </Row>

                    <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']}/>

                </Grid>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
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
        fontFamily: 'Inter_700Bold',
    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#64748B',
        alignSelf: "flex-start",
        marginBottom: 15,
        fontFamily: 'Manrope_400Regular',
        marginLeft: 20
    },

    questionaireButton: {
        minHeight: '100%',
        width: '42%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },

    buttonContainer: {
        justifyContent: 'space-evenly'
    },

    buttonText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        alignSelf: 'center',
    },

    questionaireImage: {
        height: '75%',
        width: '80%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    }

})

export default CreateQuestionaireScreen;