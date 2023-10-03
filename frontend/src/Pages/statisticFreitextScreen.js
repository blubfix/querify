import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, LogBox, RefreshControl } from "react-native";
import { Provider as PaperProvider, Text, Surface } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";

import API from "../API/apiConnection";

const StatisticFreitextScreen = ({ navigation, route }) => {
    const [question, setQuestion] = useState(route.params.item);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light
    });

    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    
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
    const getAnswerFree = (id) => {
        console.log("question.questionId: ", id);
        const freePromise = API.getAnswerOptionByQuestionID(id);
        Promise.all([freePromise])
            .then((response) => {
                console.log("Free answer: ", response[0].data);
                setAnswerOptions(response[0].data);
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
        getAnswerFree(question.questionId);
        checkDate();
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
                refreshControl={
                    <RefreshControl tintColor={"#74479A"} onRefresh={onRefresh}
                    />}
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
        backgroundColor: '#BC86A5',
        borderRadius: 5,
        marginBottom: "5%",
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
    keyboardContainer: {
        minHeight: '100%',
        width: '100%',
    },
    answerHeader: {
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

export default StatisticFreitextScreen;