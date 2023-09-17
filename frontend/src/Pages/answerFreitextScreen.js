import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TouchableOpacity, TextInput} from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Text,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope';
import { Roboto_300Light } from '@expo-google-fonts/roboto'
import BottomNavigation from "../Components/BottomNavigation";
import DescriptionInput from "../Components/DescriptionInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../API/apiConnection";

const AnswerFreitext =({ navigation, route }) => {
    const [answer, setAnswer] = useState('');
    const [chars, setChars] = useState(0);
    const [question, setQuestion] = useState(route.params);
    const [userData, setUserData] = useState({});
    const [userFromQuestion, setUserFromQuestion] = useState({});

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light,
        Roboto_300Light
    });

    useEffect(() => {
        loadUserData();
        getUserFromQuestion();
    }, []);

    const handleAnswer = (newAnswer) => {
        console.log("newAnswer: ", newAnswer)
        setAnswer(newAnswer);
    }

    const loadUserData = async () => {
        try {
            const tempData = await AsyncStorage.getItem("userData");
            if (tempData) {
                const parsedUserData = JSON.parse(tempData);
                setUserData(parsedUserData);
                console.log("userData:", parsedUserData);
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const getUserFromQuestion = () => {
        const user = question.userId;
        console.log("user: ", user);
        API.getUserById(user)
            .then((resp) => {
                console.log("userFromQuestion: ",resp.data);
                setUserFromQuestion(resp.data);
            })
            .catch((e) => {
                console.log(e);
            }
        )
    }

    const answerQuestion = () => {
        if (answer !== null) {
            const userId = userData.id;
            console.log("userId: ", userId);
            const data = {
                answerText: answer,
                questionId: question.questionId,
            }
            console.log("data: ", data);
            API.postAnswerOption(data)
                .then((resp) => {
                    console.log(resp.data);
                    const id = resp.data;
                    const data2 = {
                        userId: userId,
                        answerOptionId: id,
                        questionId: question.questionId
                    }
                    console.log("data2: ", data2);
                    API.postAnswerGiven(data2)
                        .then((resp) => {
                            console.log(resp.data);
                        })
                        .catch((e) => {
                            console.log(e);
                            setTextInputColor('#DC2626');
                            setErrorText('Bitte überprüfe deine Eingabe!');
        
                        });
                })
                .catch((e) => {
                    console.log(e);
                    setTextInputColor('#DC2626');
                    setErrorText('Bitte überprüfe deine Eingabe!');
    
                });
                
            
                
        }
        else {
            console.log("Something went wrong!");
        }
    }

    if (!fontsLoaded) {
        return null;
    }

    changeChars = (text) => {
        setChars(text.length);
    }
    

    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} extraScrollHeight={50}> 
                        <Row>
                            <Col>
                                <Text style={styles.headerText}>Treffe deine Auswahl</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col inline>
                                <MaterialCommunityIcons style={styles.thumbIcon} name='account' color={'#222222'} size={20} />
                                <Text style={styles.nameText}>{userFromQuestion.name}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Text style={styles.questionaireTitleText}>{question.title}</Text>
                                <Text style={styles.questionaireTypeText}>Freitext Umfrage</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.deadlineContainer}>
                                    <MaterialCommunityIcons style={styles.thumbIcon} name='timeline-clock' color={'#222222'} size={25} />
                                    <Text style={styles.deadlineText}>Stichtag</Text>
                                    <View style={styles.deadlineSubContainer}>
                                        <Text style={styles.deadlineDateText}>{question.date}</Text>
                                    </View>
                                </View>
                            </Col>
                        </Row>
                        <Row size={0.2}>
                            <Col>
                                <Text style={styles.questionaireTitleText}>Beschreibung</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionText}>{question.description}</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.optionsContainer}>
                                <TextInput 
                                    style={{...styles.textInput, borderColor: '#D0D5DD'}} 
                                    onChangeText={handleAnswer}
                                    value={answer}
                                    placeholder={'Gebe hier deine Antwort ein'}
                                    multiline={true}
                                    numberOfLines={4}
                                    maxLength={400}
                                    placeholderTextColor={'#64748B'}
                                
                                />
                                <Text style={styles.charText}>{chars}/400</Text>
                            </Col>
                        </Row>

                    </KeyboardAwareScrollView>
                <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']}/>
                </Grid>
                <SubmitButton buttonText={'Abstimmen'} position={'absolute'} bottom={120} onPress={() => answerQuestion()}/>
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

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold'
    },

    nameText: {
        fontFamily: 'Roboto_300Light',
        color: '#222222',
        fontSize: 15,
        marginLeft: 5,
    },

    questionaireTitleText: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 15,
        color: '#191D23'
    },

    questionaireTypeText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#64748B',
        marginTop: 5
    },

    deadlineContainer: {
        width: '100%',
        height: 50,
        flexDirection: "row",
        backgroundColor: '#DADADA',
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5
    },

    deadlineSubContainer: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },

    deadlineText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#222222',
        marginLeft: 10,
        flex:1
    },

    deadlineDateText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#64748B'
    },

    descriptionContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#D0D5DD',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 5
    },

    descriptionText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#64748B'
    },

    optionText: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 15,
        color: '#575454',
        alignSelf: 'center',
        marginTop: 5
    },

    optionsContainer: {
    },

    textInput: {
        minWidth: '100%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 14,
        paddingLeft: 10,
        fontFamily: 'Manrope_400Regular',
        color: '#191D23',
        marginTop: 15
    },

    charText: {
        alignSelf: 'flex-end',
        fontFamily: 'Manrope_300Light',
        fontSize: 14,
        color: '#64748B',
        marginTop: 5,
    }
  



})

export default AnswerFreitext;