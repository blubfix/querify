import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TouchableOpacity, TextInput, Dimensions, ScrollView } from "react-native";
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
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";
import TitleInput from "../Components/TitleInput";
import DescriptionInput from "../Components/DescriptionInput";
import DateInput from "../Components/DateInput";
import ColorPalette from "../Components/ColorPalette";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const CreateMehrfach =({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [numberOfAnswers, setNumberOfAnswers] = useState('');

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

    const addAnswer = () => {
        if (answer != '' && (!answers.includes(answer))) {
            setAnswers([...answers, answer])
            setAnswer('');
        }
    }

    const removeAnswer = (index) => {
        let answersCopy = [...answers];
        answersCopy.splice(index, 1);
        setAnswers(answersCopy);
    }

    return (
        <PaperProvider>
            <Grid style={styles.container} container> 
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer} keyboardShouldPersistTaps='handled' resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} extraScrollHeight={40}> 
                    <ScrollView style={styles.scrollConatainer} keyboardShouldPersistTaps='handled'>

                    <Row>
                        <Col>
                            <Text style={styles.headerText}>Erstelle eine Mehrfach Auswahl</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TitleInput value={title} onChangeText={setTitle} borderColor={'#D0D5DD'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ColorPalette/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DescriptionInput value={description} onChangeText={setDescription} borderColor={'#D0D5DD'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DateInput value={date} onChangeText={setDate} borderColor={'#D0D5DD'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.textInputHeaderText}>Antwortoptionen</Text>
                            <View style={{flexDirection: 'row', minWidth: width*0.9, alignSelf: 'center'}}>
                                <TextInput 
                                  style={{...styles.answerTextInput, borderColor: '#D0D5DD'}} 
                                  onChangeText={setAnswer}
                                  value={answer}
                                  placeholder={'Gib eine mögliche Antwort ein'}
                                  maxLength={85}
                                  onSubmitEditing={addAnswer}
                                />
                                <TouchableOpacity style={styles.addAnswerButton} onPress={addAnswer}>
                                    <MaterialCommunityIcons style={styles.thumbIcon} name='plus' color={'white'} size={40} />
                                </TouchableOpacity>

                            </View>
                            <View>
                                {
                                    answers.map((answer, index) => {
                                        return(
                                            <TouchableOpacity style={styles.anserItem} key={index} onPress={() => removeAnswer(index)}>
                                                <Text style={styles.answerItemText}>{answer}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.textInputHeaderText}>Antwortanzahl</Text>
                            <TextInput 
                              style={{...styles.textInput, borderColor: '#D0D5DD'}} 
                              onChangeText={setNumberOfAnswers}
                              value={numberOfAnswers}
                              placeholder={'Gib die Mindest-Antwortabgabe ein'}
                              maxLength={2}
                              keyboardType="decimal-pad"
                            />
                        </Col>
                    </Row>
                    </ScrollView>
                </KeyboardAwareScrollView>
                <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']}/>
            </Grid>
            <SubmitButton buttonText={'Weiter'} position={'absolute'} bottom={120}/>

        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },

    keyboardContainer: {
        flex: 1,
        marginBottom: 180
    },

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold',
    },

    textInput: {
        minWidth: width*0.9,
        height: 50,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 16,
        fontFamily: 'Manrope_400Regular',
  
    },
  
    answerTextInput: {
        flex: 1,
        height: 50,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 16,
        fontFamily: 'Manrope_400Regular',
  
    },

    textInputHeaderText: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 15,
        marginBottom: height*0.005,
        width: width*0.9,
        alignSelf: 'center'
    },

    addAnswerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 50,
        marginLeft: 10,
        backgroundColor: '#D0D5DD',
        justifyContent: "center",
        borderRadius: 5
    },

    addAnswerButtonText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#64748B',
        marginLeft: 3
    },

    anserItem: {
        width: width*0.9,
        height: 50,
        backgroundColor: '#D0D5DD',
        alignSelf: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center'
    },

    answerItemText: {
        fontFamily: 'Manrope_400Regular',
        color: '#191D23',
        fontSize: 16,
        alignSelf: 'flex-start'
    }
  
})

export default CreateMehrfach;