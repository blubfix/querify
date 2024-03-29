import React, { useState, useEffect } from "react";
import { StyleSheet, View, RefreshControl,LogBox, FlatList } from "react-native";
import { Provider as PaperProvider, Text, List, ProgressBar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";

import API from "../API/apiConnection";

const StatisticJaNeinScreen = ({ navigation, route }) => {
   
    const [question, setQuestion] = useState(route.params.item);
    const [answerYesOptions, setAnswerYesOptions] = useState([]);
    const [answerNoOptions, setAnswerNoOptions] = useState([]);

    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications


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
    const palceholderData = [{ id: '1' }]; // Placeholder item

    

    const onRefresh = () => {
        console.log("Refreshing page")
        getAnswerYesNoUser(question.questionId);
    };

    return (
        <PaperProvider>
            <FlatList
                style={styles.container}
                data={palceholderData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Grid container>
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
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='account-multiple-outline' color={'#090A0A'} size={30} paddingLeft={"2%"} />
                                    <Text style={styles.accountButtonText}>Teilnehmende</Text>
                                    <View
                                        style={styles.numberUsersBox}>
                                        <Text style={styles.numberUsers}> {answerYesOptions.length + answerNoOptions.length} </Text>
                                    </View>
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.statisticContainer}>
                                    <Text style={styles.answerHeader}>{Math.round((answerYesOptions.length / (answerNoOptions.length + answerYesOptions.length)) * 100)}% haben für JA abgestimmt</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons name='check-circle' color={'#95D158'} size={30} />
                                        <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
                                            <ProgressBar
                                                progress={
                                                    answerYesOptions.length > 0
                                                        ? answerYesOptions.length / (answerNoOptions.length + answerYesOptions.length)
                                                        : 0
                                                }
                                                style={{ width: "" }}
                                            />
                                        </View>
                                        <Text style={styles.answerName}>{Math.round((answerYesOptions.length / (answerNoOptions.length + answerYesOptions.length)) * 100)}%</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: "4%" }}>
                                        <MaterialCommunityIcons name='close-circle' color={'#AD323D'} size={30} />
                                        <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
                                            <ProgressBar progress={
                                                answerNoOptions.length > 0
                                                    ? answerNoOptions.length / (answerNoOptions.length + answerYesOptions.length)
                                                    : 0
                                            } style={{ width: "" }} />
                                        </View>
                                        <Text style={styles.answerName}>{Math.round((answerNoOptions.length / (answerNoOptions.length + answerYesOptions.length)) * 100)}%</Text>
                                    </View>
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <List.Accordion
                                    style={{ backgroundColor: "#DADADA" }}
                                    title="Liste der Ja-Abgestimmten"

                                    left={props => <MaterialCommunityIcons name='check-circle' color={'#95D158'} size={30} paddingLeft={"5%"} />
                                    }
                                >
                                    {answerYesOptions.map((item, index) => {
                                        return (
                                            <List.Item
                                                style={{ backgroundColor: "#DADADA" }}
                                                key={index}
                                                title={item.userName} />
                                        )
                                    })}
                                </List.Accordion>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <List.Accordion
                                    style={{ backgroundColor: "#DADADA" }}
                                    title="Liste der Nein-Abgestimmten"
                                    left={props => <MaterialCommunityIcons name='close-circle' color={'#AD323D'} size={30} paddingLeft={"5%"} />}
                                >
                                    {answerNoOptions.map((item, index) => {
                                        return (
                                            <List.Item
                                                style={{ backgroundColor: "#DADADA" }}
                                                key={index}
                                                title={item.userName} />
                                        )
                                    })}
                                </List.Accordion>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='av-timer' color={'#090A0A'} size={30} paddingLeft={"3%"} />
                                    <Text style={styles.accountButtonText}>Verbleibende Zeit in Tagen</Text>
                                    <View
                                        style={styles.numberUsersBox}>
                                        <Text style={styles.numberUsers}>{checkDate()}</Text>
                                    </View>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']} />
        </PaperProvider >
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
    accountButtonText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        color: '#222',
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
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#FFF',
        marginTop: "1%",
    },
    answerText: {
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#FFF',
        left: "25%",
        marginBottom: "5%",
    },
    answerHeader: {
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
    container: {
        height: "87%",
        width: "100%",
        backgroundColor: "white",
        flexGrow: 0,
    }

})

export default StatisticJaNeinScreen;