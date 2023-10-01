import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, FlatList, Dimensions, RefreshControl, KeyboardAvoidingView } from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    TextInput,
    List,
    ProgressBar,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";
import TitleInput from "../Components/TitleInput";
import DescriptionInput from "../Components/DescriptionInput";
import DateInput from "../Components/DateInput";
import ColorPalette from "../Components/ColorPalette";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import API from "../API/apiConnection";
const { width, height } = Dimensions.get("window");

const data = [
    { id: '1', text: 'Julia', answer: 'Hello World' },
    { id: '2', text: 'Item 2', answer: 'Hello World' },
    { id: '3', text: 'Item 3', answer: 'Hello World' },
    { id: '4', text: 'Item 4', answer: 'Hello World' },
    { id: '5', text: 'Item 4', answer: 'Hello World' },
    { id: '6', text: 'Item 4', answer: 'Hello World' },
    { id: '7', text: 'Item 4', answer: 'Hello World' },
    { id: '8', text: 'Item 4', answer: 'Hello World' },
    { id: '9', text: 'Item 4', answer: 'Hello World' },
    { id: '10', text: 'Item 4', answer: 'Hello World' },
    // Add more items as nee, answer: 'Hello World'ded
];



const StatisticFreitextScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [question, setQuestion] = useState(route.params.item);
    const [expanded, setExpanded] = React.useState(true);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answerYesOptions, setAnswerYesOptions] = useState([]);
    const [answerNoOptions, setAnswerNoOptions] = useState([]);
    const [answerCount, setAnswerCount] = useState();


    const handlePress = () => setExpanded(!expanded);

    console.log("wo bin ich: ", question)



    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light
    });

    useEffect(() => {
        getAnswerFree(question.questionId);
        checkDate();
    }, []);


    const checkDate = () => {
        // Parse the date from the 'question' in the format 'dd.mm.yyyy'
        const questionDateParts = question.date.split('.');
        const questionDay = parseInt(questionDateParts[0], 10);
        const questionMonth = parseInt(questionDateParts[1], 10) - 1; // Month is zero-based
        const questionYear = parseInt(questionDateParts[2], 10);

        // Create a Date object for the 'question' date
        const questionDateObject = new Date(questionYear, questionMonth, questionDay);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = questionDateObject - currentDate;

        // Convert milliseconds to days
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(daysRemaining);
        return daysRemaining;
    }

    const checkQuestionArt = () => {
        if (question.type === 'poll') {
            return 'Ja/Nein Umfrage';
        } else if (question.type === 'multi') {
            return 'Mehrfachauswahl Umfrage';
        } else if (question.type === 'free') {
            return 'Freitext Umfrage';
        } else if (question.type === 'feeling') {
            if (question.bewertung === 'stars') {
                return 'Stimmungsbildumfrage - Sternebewertung';
            } else if (question.bewertung === 'likert') {
                return 'Stimmungsbildumfrage - Likertskala';
            }
        }
    }

    const handleTitleChange = (newTitle) => {
        console.log("newTitle: ", newTitle)
        setTitle(newTitle);
    }
    const handleDescriptionChange = (newDescription) => {
        console.log("newDescription: ", newDescription)
        setDescription(newDescription);
    }
    const handleDateChange = (newDate) => {
        console.log("newDate: ", newDate)
        setDate(newDate);
    }
    const handleColorSelected = (colorIndex) => {
        console.log("colorIndex: ", colorIndex)
        setSelectedColorIndex(colorIndex);
    }

    const getAnswerFree = (id) => {
        console.log("question.questionId: ", id);

        // Define two separate promises for the API calls
        const freePromise = API.getAnswerOptionByQuestionID(id);

        // Use Promise.all to wait for both promises to resolve
        Promise.all([freePromise])
            .then((response) => {
                console.log("Free answer: ", response[0].data);
                setAnswerOptions(response[0].data);
                // You can now proceed with any additional logic that depends on this data
            })
            .catch((err) => {
                console.log("err: ", err);
            });

    };


    if (!fontsLoaded) {
        return null;
    }

    const goNextForm = () => {
        console.log("title: ", title)
        navigation.navigate('QuestionaireOptions', { title: title, description: description, date: date, color: selectedColorIndex, type: 'poll' });
    }


    const palceholderData = [{}]; // Placeholder item
    const onRefresh = () => {
        console.log("Refreshing page")
        // getQuestions();
    };

    return (
        <PaperProvider>
            <FlatList
                style={styles.container}
                data={palceholderData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Grid style={styles.container} container>
                        <Row>
                            <Col>
                                <Text style={styles.headerText}>Statistik deiner Umfrage</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Text style={styles.subHeader}>{question.title}</Text>
                            <Text>{checkQuestionArt()}</Text>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Surface elevation={1}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                    <Text style={styles.accountButtonText}>Profil</Text>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "black",
                                            borderRadius: 0,
                                        }}>
                                        <Text> {answerOptions.length} </Text>
                                    </View>
                                </View>
                            </Surface>
                        </Col>
                    </Row>
                        <View style={styles.answerContainer}>
                            <Text style={styles.answerHeader}>
                                Freitext Antworten
                            </Text>
                    
                            {answerOptions.map((item, index) => {
                                return (
                                    <View style={styles.textAnswerBox}>
                                        <Row key={index}>
                                            <Col size={1}>
                                                <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                            </Col>
                                            <Col size={6}>
                                                <Text style={styles.answerName}>{item.name}</Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Text style={styles.answerText}>{item.answerText}</Text>
                                        </Row>
                                    </View>

                                )
                            })}
                        </View>
                        <Row>
                            <Col>
                                <Surface elevation={1}>
                                    <View style={styles.textIconContainer}>
                                        <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                        <Text style={styles.accountButtonText}>Verbleibende Zeit in Tagen</Text>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderColor: "black",
                                                borderRadius: 0,
                                            }}>
                                            <Text>{checkDate()}</Text>
                                        </View>
                                    </View>
                                </Surface>
                            </Col>
                        </Row>
                    </Grid>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#778DE3', '#6F6F70']} />


        </PaperProvider>
    );
}


const styles = StyleSheet.create({

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold',
    },
    subHeader: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#090A0A',
        // marginBottom: '5%'
    },
    answerHeader: {
        // alignSelf: 'flex-start',
        textAlign: 'center',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: '5%'
    },
    textIconContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    statisticContainer: {
        padding: 10,

    },

    keyboardContainer: {
        minHeight: '100%',
        width: '100%',

    },
    answerContainer: {
        backgroundColor: "#39424A",
        paddingTop: "5%",
        borderRadius: 5,

    },

    textAnswerBox: {
        alignSelf: "center",

        width: '95%',
        backgroundColor: '#BC86A5',
        borderRadius: 5,
        marginBottom: "5%",


    },
    answerName: {
        // alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#222222',
        marginTop: "1%",

    },
    answerText: {
        // alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#222222',
        left: "25%",
        marginBottom: "5%",

    },

    container: {
        height: '87%',
        width: '100%',
        backgroundColor: '+',
        flexGrow: 0,
    },

})

export default StatisticFreitextScreen;