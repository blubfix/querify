import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TextInput, TouchableOpacity} from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
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
import BottomNavigation from "../Components/BottomNavigation";
import * as Clipboard from 'expo-clipboard';

const ShareQuestionaire =({ navigation }) => {
    const [questionaireURL, setQuestionaireURL] = useState('testURL.de');
    const [questionaireCode, setQuestionaireCode] = useState('1234');

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

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row>
                        <Col>
                            <View style={styles.gradientContainer}>
                                <LinearGradient colors={['#72479C', '#AF3139']} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.headerText}>Erfolgreich</Text>
                                        <MaterialCommunityIcons style={styles.thumbIcon} name='thumb-up-outline' color={'white'} size={20} />
                                    </View>
                                    <Text style={styles.subHeaderTextInter}>Du hast deine querify-Umfrage vollständig erstellt!</Text>
                                </LinearGradient>
                            </View>
                        </Col>
                    </Row>
                    <Row size={0.15}>
                        <Col>
                            <Text style={styles.subHeaderText}>
                                Teile deine Umfrage jetzt mit deinen Freunden, Familienmitgliedern, Arbeitskollegen oder Kommilitonen!
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.shareOptionsHeaderText}>Umfrage URL</Text>
                        </Col>
                    </Row>
                    <Row size={0.15}>
                        <Col inline>
                            <TextInput 
                              style={{...styles.textInput, borderColor: '#3A3E98'}} 
                              onChangeText={setQuestionaireURL}
                              value={questionaireURL}
                              placeholder={'Gib die Mindest-Antwortabgabe ein'}
                              editable={false}
                            />
                            <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(questionaireURL)}>
                                <LinearGradient colors={['#4F73E7', '#734498']} start={[0, 0]} end={[1, 0]} style={styles.copyButtonLinearGradient}>
                                    <MaterialCommunityIcons style={styles.copyIcon} name='content-copy' color={'white'} size={20}/>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.shareOptionsHeaderText}>Umfrage Eingabe-Code</Text>
                        </Col>
                    </Row>
                    <Row size={0.15}>
                        <Col inline>
                            <TextInput 
                              style={{...styles.textInput, borderColor: '#3A3E98'}} 
                              onChangeText={setQuestionaireCode}
                              value={questionaireCode}
                              placeholder={'Gib die Mindest-Antwortabgabe ein'}
                              editable={false}
                            />
                            <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(questionaireCode)}>
                                <LinearGradient colors={['#4F73E7', '#734498']} start={[0, 0]} end={[1, 0]} style={styles.copyButtonLinearGradient}>
                                    <MaterialCommunityIcons style={styles.copyIcon} name='content-copy' color={'white'} size={20}/>
                                </LinearGradient>
                            </TouchableOpacity>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.shareOptionsHeaderText}>Umfrage QR-Code</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                    <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']}/>
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
        backgroundColor: 'white',
        paddingHorizontal: '5%'
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
        fontFamily: 'Manrope_400Regular'
    },

    shareOptionsHeaderText: {
        fontSize: 15,
        fontFamily: 'Manrope_600SemiBold',
        color: '#191D23'
    },

    textInput: {
        flex: 1,
        borderWidth: 1,
        alignSelf: "center",
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#64748B',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14
    },

    copyButton: {
        width: '20%',
        height: 50,
        borderRadius: 25,
        marginLeft: 30
    },

    copyButtonLinearGradient: {
        flex: 1,
        borderRadius: 25,
        justifyContent: "center"
    },

    copyIcon: {
        alignSelf: "center"
    }


})

export default ShareQuestionaire;