import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Dimensions, RefreshControl } from "react-native";
import { Provider as PaperProvider, Text, Surface } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";

import API from "../API/apiConnection";

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


const StatistikMehrfachScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [question, setQuestion] = useState(route.params.item);
    const [expanded, setExpanded] = React.useState(true);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [calcAnswers, setCalcAnswers] = useState([]);


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
        getAnswersMore(question);
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


    const getAnswersMore = (question) => {
        const id = question.questionId;
        console.log("question.questionId: ", id);
        const options = question.multi;
        console.log("question.multi: ", options);

        // Parse the string into an array
        const dataArray = options.split(',');

        // Create an array of JSON objects
        const jsonArray = dataArray.map(item => ({
        data: item,
        number: 0
        }));

        console.log("jsonArray: ", jsonArray);

        // Output the array of JSON objects
        console.log(jsonArray);

        // Define two separate promises for the API calls
        const answers = API.getAnswerOptionByQuestionID(id);

        // Use Promise.all to wait for both promises to resolve
        Promise.all([answers])
            .then((response) => {
                console.log("Yes Options: ", response[0].data);
                // Set the state variables with the data from the responses
                setAnswerOptions(response[0].data);
                
                const data = response[0].data;
                data.forEach((item) => {
                    const answersSelected = item.answerText.split(',');
                    answersSelected.forEach((answer) => {
                        const trimmedAnswer = answer.trim(); // Remove leading and trailing spaces
                        const jsonItem = jsonArray.find((item) => item.data === trimmedAnswer);
                        if (jsonItem) {
                            jsonItem.number++;
                        }
                    });
                });
                
                // Calculate the total sum of numbers
                const totalSum = jsonArray.reduce((sum, item) => sum + item.number, 0);
                
                // Calculate the percentage and add it to each object in jsonArray
                jsonArray.forEach((item) => {
                    item.percent = ((item.number / totalSum) * 100).toFixed(2) + "%";
                });
                
                // Now jsonArray contains the updated numbers
                console.log("jsonArray: ", jsonArray);
                setCalcAnswers(jsonArray);
                console.log("calcAnswers: ", calcAnswers);
                // You can now proceed with any additional logic that depends on this data
            })
            .catch((err) => {
                console.log("err: ", err);
            });

    };




    if (!fontsLoaded) {
        return null;
    }

    const palceholderData = [{}]; // Placeholder item
    const onRefresh = () => {
        console.log("Refreshing page")
        getAnswersMore(question);
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
                                        <MaterialCommunityIcons name='account-multiple-outline' color={'#090A0A'} size={30} paddingLeft={"2%"} />
                                        <Text style={styles.accountButtonText}>Teilnehmende</Text>
                                        <View
                                            style={styles.numberUsersBox}>
                                            <Text style={styles.numberUsers}> {answerOptions.length} </Text>
                                        </View>
                                    </View>
                                </Surface>
                            </Col>
                        </Row>
                        <View style={styles.answerContainer}>
                            <Text style={styles.answerHeader}>
                                Mehrfachauswahl Antworten
                            </Text>
                            {calcAnswers.map((item, index) => {
                                // const calculatedValue = (index % 4) + 1;
                                return (
                                    <View style={styles.textAnswerBox} key={index}>
                                        <Row key={index}>
                                            <Col size={1}>
                                                <MaterialCommunityIcons name='checkbox-blank-circle-outline' color={colorAnswerCirle[0]} size={30} />
                                            </Col>
                                            <Col size={6}>
                                                <Text style={styles.answerName}>{item.data}</Text>
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
        height: "87%",
        width: "100%",
        backgroundColor: "white",
        flexGrow: 0,
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

export default StatistikMehrfachScreen;