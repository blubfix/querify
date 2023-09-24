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
    TextInput,
    RadioButton,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../API/apiConnection";

const QuestionaireOptions = ({ navigation, route }) => {
    const [checkedAnonymous, setCheckedAnonymous] = useState(false);
    const [checkedAskNameDontShow, setCheckedAskNameDontShow] = useState(false);
    const [checkedAskNameShow, setCheckedAskNameShow] = useState(false);
    const [checkedViewResultsBefore, setCheckedViewResultsBefore] = useState(false);
    const [checkedViewResultsAfter, setCheckedViewResultsAfter] = useState(false);
    const [checkedViewResultsDeadline, setCheckedViewResultsDeadline] = useState(false);
    const [checkedSaveTemplate, setCheckedSaveTemplate] = useState(false);
    const [checkedDeleteAfter60, setCheckedDeleteAfter60] = useState(false);

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

    const loadUserData = async () => {
        try {
            const tempData = await AsyncStorage.getItem("userData");
            if (tempData) {
                const parsedUserData = JSON.parse(tempData);
                return parsedUserData;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const createSurvey = async () => {
        const data = saveUserData();
        const userData = await loadUserData();
        if (userData) {
            
            console.log("userData:", userData)
            data['userId'] = userData.id;

            if(data["minimumNumberOfAnswers"] === undefined) {
                data['minimumNumberOfAnswers'] = 1;
            }
            if(data["answers"] === undefined) {
                data['answers'] = null;
            }
            
            console.log("finalData: ", data);
            API.postQuestion(data)
                .then((resp) => {
                    console.log(resp.data);
                    navigation.navigate('ShareQuestionaire', resp.data)
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            console.log('no user data found');
        }
    }

    const saveUserData = () => {
        try {
            // Load existing user data
            const existingData = route.params;
            // Merge new data with existing data

            const options = surveyOptions();
            const finalData = {
                ...existingData,
                identifikation: options.identifikation,
                ergebniseinsicht: options.ergebniseinsicht,
                wiederverwendung: options.wiederverwendung,
                qrCode: 'qrCodeBase64'
            }
            return finalData;

        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const surveyOptions = () => {
        const options = {};

        if (checkedSaveTemplate) {
            options['wiederverwendung'] = "als Vorlage gespeichert";
        }
        else {
            options['wiederverwendung'] = "undefined";
        }

        if (checkedViewResultsBefore) {
            options['ergebniseinsicht'] = "vor ihrer Abstimmung sehen";
        } else if (checkedViewResultsAfter) {
            options['ergebniseinsicht'] = "nach ihrer Abstimmung sehen";
        } else if (checkedViewResultsDeadline) {
            options['ergebniseinsicht'] = "nach dem Umfragestichtag";
        }
        else {
            options['ergebniseinsicht'] = "undefined";
        }

        if (checkedAnonymous) {
            options['identifikation'] = "anonyme Abstimmung";
        } else {
            if (checkedAskNameDontShow && checkedAskNameShow) {
                options['identifikation'] = "nach Namen fragen, anderen aber nicht anzeigen";
            } else if (checkedAskNameDontShow) {
                options['identifikation'] = "nach Namen fragen, anderen aber nicht anzeigen";
            } else if (checkedAskNameShow) {
                options['identifikation'] = "nach Namen fragen & für alle anzeigen";
            }
            else {
                options['identifikation'] = "undefined";
            }
        }

        console.log('options: ', options);
        return options;
    };





    return (
        <PaperProvider>
            <Grid style={styles.container} container>
                <Row>
                    <Col>
                        <Text style={styles.headerText}>Konfiguriere deine Umfrage</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.checkBoxHeaderText}>Identifikation</Text>
                    </Col>
                </Row>
                <Row>
                    <Col inline>
                        <CheckBox
                            value={checkedAnonymous}
                            onValueChange={setCheckedAnonymous}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>anonyme Abstimmung</Text>
                    </Col>
                </Row>
                <Row>
                    <Col inline>
                        <CheckBox
                            value={checkedAskNameDontShow}
                            onValueChange={setCheckedAskNameDontShow}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>nach Namen fragen, anderen aber nicht anzeigen</Text>
                    </Col>
                </Row>
                <Row size={0.12}>
                    <Col inline>
                        <CheckBox
                            value={checkedAskNameShow}
                            onValueChange={setCheckedAskNameShow}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>nach Namen fragen & für alle anzeigen</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.checkBoxHeaderText}>Ergeniseinsicht</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.checkBoxSubHeaderText}>Die Teilnehmer deiner Umfrage können die Ergebnisse...</Text>
                    </Col>
                </Row>
                <Row>
                    <Col inline>
                        <CheckBox
                            value={checkedViewResultsBefore}
                            onValueChange={setCheckedViewResultsBefore}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>vor ihrer Abstimmung sehen</Text>
                    </Col>
                </Row>
                <Row>
                    <Col inline>
                        <CheckBox
                            value={checkedViewResultsAfter}
                            onValueChange={setCheckedViewResultsAfter}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>nach ihrer Abstimmung sehen</Text>
                    </Col>
                </Row>
                <Row size={0.12}>
                    <Col inline>
                        <CheckBox
                            value={checkedViewResultsDeadline}
                            onValueChange={setCheckedViewResultsDeadline}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>nach dem Umfragestichtag</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.checkBoxHeaderText}>Wiederverwendung</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.checkBoxSubHeaderText}>Deine Umfrage wird...</Text>
                    </Col>
                </Row>
                <Row>
                    <Col inline>
                        <CheckBox
                            value={checkedSaveTemplate}
                            onValueChange={setCheckedSaveTemplate}
                            style={styles.checkbox}
                            color={'#3A3E98'}
                        />
                        <Text style={styles.checkboxText}>als Vorlage gespeichert</Text>
                    </Col>
                </Row>








                <BottomNavigation buttonColors={['#6F6F70', '#778DE3', '#6F6F70', '#6F6F70']} />
            </Grid>
            <SubmitButton buttonText={'Speichern'} position={'absolute'} bottom={120} onPress={() => createSurvey()} />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold'
    },

    checkboxText: {
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'Manrope_400Regular',
        alignSelf: 'center',
        color: '#191D23'
    },

    checkBoxHeaderText: {
        fontSize: 15,
        fontFamily: 'Manrope_600SemiBold',
        color: '#191D23'
    },

    checkBoxSubHeaderText: {
        fontSize: 14,
        fontFamily: 'Manrope_400Regular',
        color: '#64748B'
    },


    checkbox: {
        alignSelf: 'center',
        color: '#734498',
        borderWidth: 1.5
    }






})

export default QuestionaireOptions;