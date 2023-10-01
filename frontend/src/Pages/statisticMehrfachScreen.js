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
    { id: '1', text: 'Rosen sind Rot', percent: '20%' },
    { id: '2', text: 'Veilchen Blau', percent: '20%' },
    { id: '3', text: 'Ich klau zwei Döner', percent: '20%' },
    { id: '4', text: 'und geh in den Bau', percent: '20%' },
    { id: '5', text: 'Achmed Göthe', percent: '20%' },
    // Add more items as nee, percent: '20%'ded
];
const colorAnswerCirle = ['#00DAF8', '#4072EE', '#B558F6', '#7628B4', '#48A7FF'

]


const StatisticFreitextScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [question, setQuestion] = useState(route.params.item);
    const [expanded, setExpanded] = React.useState(true);
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
        getAnswerYesNoUser(question.questionId);
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

    const getAnswerYesNoUser = (id) => {
        console.log("question.questionId: ", id);

        // Define two separate promises for the API calls
        const yesOptionsPromise = API.getAnswerOptionYesByQuestionId(id);
        const noOptionsPromise = API.getAnswerOptionNoByQuestionId(id);

        // Use Promise.all to wait for both promises to resolve
        Promise.all([yesOptionsPromise, noOptionsPromise])
            .then(([yesOptionsResponse, noOptionsResponse]) => {
                console.log("Yes Options: ", yesOptionsResponse.data);
                console.log("No Options: ", noOptionsResponse.data);

                // Set the state variables with the data from the responses
                setAnswerYesOptions(yesOptionsResponse.data);
                setAnswerNoOptions(noOptionsResponse.data);

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
                                <Text style={styles.subHeader}>Frage hier rein</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Surface elevation={1}>
                                    <View style={styles.textIconContainer}>
                                        <MaterialCommunityIcons name='account-multiple-outline' color={'#090A0A'} size={30} paddingLeft={"2%"} />
                                        <Text style={styles.accountButtonText}>Teilnehmende</Text>
                                        <View
                                            style={styles.numberUsersBox}>
                                            <Text style={styles.numberUsers}> {answerYesOptions.length + answerNoOptions.length} </Text>
                                        </View>
                                    </View>
                                </Surface>
                            </Col>
                        </Row>
                        <View style={styles.answerContainer}>
                            <Text style={styles.answerHeader}>
                                Mehrfachauswahl Antworten
                            </Text>
                            {data.map((item, index) => {
                                const calculatedValue = (index % 4) + 1;
                                const colorItem = colorAnswerCirle
                                return (
                                    <View style={styles.textAnswerBox}>
                                        <Row key={index}>
                                            <Col size={1}>
                                                <MaterialCommunityIcons name='checkbox-blank-circle-outline' color={colorAnswerCirle[calculatedValue]} size={30} />
                                            </Col>
                                            <Col size={6}>
                                                <Text style={styles.answerName}>{item.text}</Text>
                                            </Col>
                                            <Col size={2}>
                                                <Text style={styles.answerName}>{item.percent}</Text>
                                            </Col>
                                        </Row>
                                    </View>
                                )
                            })}
                        </View>
                        <Row>
                            <Col>
                                <Surface elevation={1}>
                                    <View style={styles.textIconContainer}>
                                        <MaterialCommunityIcons name='av-timer' color={'#090A0A'} size={30} paddingLeft={"3%"} />
                                        <Text style={styles.accountButtonText}>Verbleibende Zeit in Tagen</Text>
                                        <View
                                            style={styles.numberUsersBox}>
                                            <Text style={styles.numberUsers}>{checkDate()}</Text>
                                        </View>
                                    </View>
                                </Surface>
                            </Col>
                        </Row>
                    </Grid>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#778DE3']} />


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


    keyboardContainer: {
        minHeight: '100%',
        width: '100%',

    },
    answerContainer: {
        backgroundColor: "#39424A",
        alignSelf: "center",
        paddingTop: "5%",
        borderRadius: 5,
        width: "97%",

    },

    textAnswerBox: {
        alignSelf: "center",

        width: '95%',
        backgroundColor: '#39424A',
        borderRadius: 5,
        marginBottom: "5%",


    },
    accountButtonText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#222',
        // marginRight: "30%",
        marginLeft: "2%",
        marginTop: "1%"
    },
    numberUsers: {

        textAlign: 'center',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#222',

    },

    numberUsersBox: {
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 4,
        width: "20%",
        alignContent: "center",
        justifyContent: "center",


        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "1%",
        paddingBottom: "1%",

    },
    answerName: {
        // alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#FFF',
        marginTop: "1%",

    },
    answerText: {
        // alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#FFF',
        left: "25%",
        marginBottom: "5%",

    },

    answerHeader: {
        // alignSelf: 'flex-start',
        textAlign: 'center',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: '5%'
    },
    keyboardContainer: {
        minHeight: '100%',
        width: '100%',

    },
    answerHeader: {
        // alignSelf: 'flex-start',
        textAlign: 'center',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: '5%'
    },

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    textIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "100%",
        padding: "2%",
        backgroundColor: "#DADADA",
    },
    statisticContainer: {
        padding: "8%",
        borderRadius: 5,
        backgroundColor: "#39424A",
    },

})

export default StatisticFreitextScreen;