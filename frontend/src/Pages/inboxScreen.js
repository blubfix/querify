import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    SectionList,
    Image,
    Button,
    StyleSheet,
    View,
    Alert,
    useWindowDimensions,
    TouchableOpacity,
    ScrollView,
    RefreshControl,

} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    TextInput,
    Snackbar,
    ActivityIndicator,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import StatButton from "../Components/StatButton";
import StatButtonOwn from "../Components/StatButtonOwn";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from "expo-checkbox";
import {
    useFonts,
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_300Light,
} from "@expo-google-fonts/manrope";
import BottomNavigation from "../Components/BottomNavigation";

import API from "../API/apiConnection";

const StatisticsScreen = ({ navigation }) => {
    const [question, setQuestion] = useState();
    const [surveys, setSurveys] = useState();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [loadingSurv, setLoadingSurv] = useState(true); // Add loading state

    //TODO: Show snackbar if no data is available, style snackbar to match design and position it correctly
    const [snackbarVisible, setSnackbarVisible] = useState(false); // Add snackbar visibility state
    const [snackbarVisibleSurv, setSnackbarVisibleSurv] = useState(false); // Add snackbar visibility state

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light,
    });

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const tempData = await AsyncStorage.getItem("userData");
            if (tempData) {
                const parsedUserData = JSON.parse(tempData);
                setUserData(parsedUserData);
                console.log("userData:", parsedUserData);
                getQuestion(parsedUserData.id); // Call getQuestion with user ID
                getSuverysAttended(parsedUserData.id); // Call getQuestion with user ID
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const getSuverysAttended = (id) => {
        API.getUserAnswersWithQuestionInfo(id)
            .then((resp) => {
                console.log(resp.data);
                setSurveys(resp.data);
                if (resp.data.length == 0) {
                    setSnackbarVisibleSurv(true); // Show snackbar on error
                }
            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisibleSurv(true); // Show snackbar on error
            })
            .finally(() => {
                setLoadingSurv(false); // Set loading to false once data fetching is complete
            });
    };


    const getQuestion = (id) => {
        //const id = userData.id;
        //console.log("id: ", id)
        API.getQuestionByUser(id)
            .then((resp) => {
                console.log(resp.data);
                setQuestion(resp.data);
                if (resp.data.length == 0) {
                    setSnackbarVisible(true); // Show snackbar on error
                }
            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisible(true); // Show snackbar on error
            })
            .finally(() => {
                setLoading(false); // Set loading to false once data fetching is complete
            });
    };

    if (!fontsLoaded) {
        return null;
    }


    const onRefresh = () => {
        console.log("hello")
        loadUserData()
    };
    return (
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl tintColor={"#74479A"} refreshing={console.log("helloRefresh")} onRefresh={onRefresh} />
                }>
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.75}>
                        <Col>
                            <Row>
                                <Col>
                                    <Text style={styles.headerText}>Inbox</Text>
                                </Col>
                            </Row>
                            <Grid style={styles.subContainer} container>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Text style={styles.sectionHeader}>Meine Umfragen</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {loading ? (
                                                // Show loading indicator while data is loading
                                                <ActivityIndicator
                                                    style={styles.loadingIndicator}
                                                    size="large"
                                                    color="#734498"
                                                />
                                            ) : (
                                                <SectionList
                                                    sections={[{ title: "Meine Umfragen", data: question }]}
                                                    style={styles.sectionBox}
                                                    renderItem={({ item }) => (
                                                        <StatButtonOwn
                                                            buttonHeading={item.title}
                                                            buttonText={item.name} // Display whatever you want here
                                                            position={"relative"}
                                                            onDots={() =>
                                                                navigation.navigate("QuestionaireOptions")
                                                            }
                                                            onPress={() => navigation.navigate("StatisticSurvey", { item: item })}
                                                        />
                                                    )}
                                                    keyExtractor={(item) => item.questionId} // Use a unique identifier here
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Snackbar
                                                visible={snackbarVisible}
                                                onDismiss={() => setSnackbarVisible(false)}
                                                duration={3000} // Duration for which the snackbar will be visible (in milliseconds)
                                            >
                                                Error loading data. Please reload again.
                                            </Snackbar>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={styles.sectionHeader}>Umfragen, an denen ich teilgenommen habe</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {loadingSurv ? (
                                                // Show loading indicator while data is loading
                                                <ActivityIndicator
                                                    style={styles.loadingIndicator}
                                                    size="large"
                                                    color="#734498"
                                                />
                                            ) : (
                                                <SectionList
                                                    sections={[{ title: "Umfragen, an denen ich teilgenommen habe", data: surveys }]}
                                                    style={styles.sectionBox}
                                                    renderItem={({ item }) => (
                                                        <StatButton
                                                            buttonHeading={item.question_title}
                                                            buttonText={item.question_creator} // Display whatever you want here
                                                            position={"relative"}
                                                            onDots={() =>
                                                                navigation.navigate("QuestionaireOptions")
                                                            }
                                                        />
                                                    )}
                                                    keyExtractor={(item) => item.questionId} // Use a unique identifier here
                                                />
                                            )}
                                        </Col>
                                    </Row>

                                </Col>
                            </Grid>
                        </Col>
                    </Row>
                </Grid>


            <BottomNavigation
                buttonColors={["#6F6F70", "#778DE3", "#6F6F70", "#6F6F70"]}
                />
        </PaperProvider>
                </ScrollView>
    );
};
const styles = StyleSheet.create({
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    progressBar: {
        alignSelf: "center",
        width: "95%",
    },

    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    subContainer: {
        height: "85%",
        width: "100%",
        backgroundColor: "white",
    },


    headerText: {
        fontSize: 18,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 5,
        fontFamily: "Inter_700Bold",


    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#64748B",
        alignSelf: "flex-start",
        marginBottom: 15,
        fontFamily: "Manrope_400Regular",
    },

    sectionHeader: {
        fontSize: 14,
        fontWeight: "400",
        color: "#64748B",
        alignSelf: "flex-start",
        fontFamily: "Manrope_400Regular",
    },

    textInputHeaderText: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 14,
        marginBottom: 5,
        color: "#191D23",
    },

    forgorPasswordText: {
        fontFamily: "Manrope_700Bold",
        fontSize: 12,
        color: "#734498",
    },

    textInputHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    checkboxText: {
        fontSize: 14,
        fontWeight: "400",
        marginLeft: 10,
        fontFamily: "Manrope_400Regular",
    },

    checkbox: {
        alignSelf: "center",
        color: "#734498",
        borderWidth: 1.5,
    },

    errorText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: "Manrope_300Light",
        color: "#DC2626",
    },

    submitText: {
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Manrope_400Regular",
        color: "#191D23",
    },

    submitTextPurple: {
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Manrope_700Bold",
        color: "#734498",
    },

    Snackbar: {
        backgroundColor: "#00FF00",
        width: "100%"
    },
    sectionBox: {

        width: "100%",
        height: "50%",
    },
});

export default StatisticsScreen;
