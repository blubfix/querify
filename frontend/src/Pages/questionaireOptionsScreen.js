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

const QuestionaireOptions =({ navigation }) => {
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
                    <Row>
                        <Col inline>
                            <CheckBox
                                value={checkedDeleteAfter60}
                                onValueChange={setCheckedDeleteAfter60}
                                style={styles.checkbox} 
                                color={'#3A3E98'}
                            />
                            <Text style={styles.checkboxText}>60 Tagen nach dem Umfragestichtag gelöscht</Text>
                        </Col>
                    </Row>







                    <BottomNavigation buttonColors={['#6F6F70', '#778DE3', '#6F6F70', '#6F6F70']}/>
                </Grid>
                <SubmitButton buttonText={'Speichern'} position={'absolute'} bottom={120} onPress={() => navigation.navigate('ShareQuestionaire')}/>
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