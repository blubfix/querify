import { useState, useEffect } from "react";
import {
    SectionList,
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider, Text, Snackbar, ActivityIndicator } from "react-native-paper";
import StatButton from "../Components/StatButton";
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
    const [question, setQuestion] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [loadingSurv, setLoadingSurv] = useState(true); // Add loading state
    const [activeQuestion, setActiveQuestion] = useState([]); // Add active question state
    const [expiredQuestion, setExpiredQuestion] = useState([]); // Add expired question state
    const [tookQuestion, setTookQuestion] = useState([]); // Add took question state

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
                //getQuestion(parsedUserData.id); // Call getQuestion with user ID
                getActiveQuestions(parsedUserData.id); // Call getQuestion with user ID
                getExpiredQuestions(parsedUserData.id); // Call getQuestion with user ID
                getSuverysAttended(parsedUserData.id); // Call getQuestion with user ID
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const splitDataQuestion = (questions) => {
        console.log("questions: ", questions);
    };


    const getSuverysAttended = (id) => {
        API.getUserAnswersWithQuestionInfo(id)
            .then((resp) => {
                console.log("teilgenommene Umfragen: ", resp.data);
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

    const getActiveQuestions = (id) => {
        API.getActiveQuestions(id)
            .then((resp) => {
                console.log("ActiveQuestions: ", resp.data);
                setActiveQuestion(resp.data);
                // if (resp.data.length == 0) {
                //     setSnackbarVisible(true); // Show snackbar on error
                // }
            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisible(true); // Show snackbar on error
            })
            .finally(() => {
                setLoading(false); // Set loading to false once data fetching is complete
            });
    };

    const getExpiredQuestions = (id) => {
        API.getExpiredQuestions(id)
            .then((resp) => {
                console.log("ExpiredQuestions: ", resp.data);
                setExpiredQuestion(resp.data);

            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisible(true); // Show snackbar on error
            })
            .finally(() => {
                setLoading(false); // Set loading to false once data fetching is complete
            });
    };

    const getStatisticInfoScreen = (item) => {
        console.log("type: ", item.type);
        if (item.type === 'poll') {
            navigation.navigate("StatisticJaNeinScreen", { item: item });
        } else if (item.type === 'multi') {
            navigation.navigate("StatisticMehrfachScreen", { item: item });
        } else if (item.type === 'free') {
            navigation.navigate("StatisticFreitextScreen", { item: item });
        } else if (item.type === 'feeling') {
            if (item.bewertung === 'stars') {
                navigation.navigate("StatisticStarsScreen", { item: item });
            } else if (item.bewertung === 'likert') {
                navigation.navigate("StatisticLikertScreen", { item: item });
            }
        }
    };

    const onRefresh = () => {
        console.log("hello");
        loadUserData();
    };

    if (!fontsLoaded) {
        return null;
    }

    const data = [{}]; // Placeholder item
    return (
        <PaperProvider>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.headerText}>Statistik</Text>
                        <Text style={styles.subHeaderText}>Meine Umfragen</Text>
                        <Text style={styles.sectionHeader}>Aktive</Text>
                        {loading ? (
                            // Show loading indicator while data is loading
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size="large"
                                color="#734498"
                            />
                        ) : (
                            <SectionList
                                sections={[{ data: activeQuestion }]}
                                style={styles.sectionBox}
                                renderItem={({ item, index }) => (
                                    <StatButton
                                        keyExtractor={index}
                                        buttonHeading={item.title}
                                        buttonText={item.name}
                                        position={"relative"}
                                        question={item}
                                        state={"active"}
                                        onDots={() => navigation.navigate("QuestionaireOptions")}
                                        onPress={() => getStatisticInfoScreen(item)}
                                    />
                                )}
                                keyExtractor={(item, index) => item.questionId + index.toString()}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.textStyle}>{section.title}</Text>
                                )}
                            />
                        )}
                        <Snackbar
                            visible={snackbarVisible}
                            onDismiss={() => setSnackbarVisible(false)}
                            duration={3000} // Duration for which the snackbar will be visible (in milliseconds)
                        >
                            Error loading data. Please try again.
                        </Snackbar>
                        <Text style={styles.sectionHeader}>Abgelaufene</Text>
                        {loading ? (
                            // Show loading indicator while data is loading
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size="large"
                                color="#734498"
                            />
                        ) : (
                            <SectionList
                                sections={[{ data: expiredQuestion }]}
                                style={styles.sectionBox}
                                renderItem={({ item, index }) => (
                                    <StatButton
                                        keyExtractor={index}
                                        buttonHeading={item.title}
                                        buttonText={item.name}
                                        position={"relative"}
                                        question={item}
                                        state={"expired"}
                                        onDots={() => navigation.navigate("QuestionaireOptions")}
                                        onPress={() => getStatisticInfoScreen(item)}
                                    />
                                )}
                                keyExtractor={(item, index) => item.questionId + index.toString()}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.textStyle}>{section.title}</Text>
                                )}
                            />
                        )}
                        <Snackbar
                            visible={snackbarVisible}
                            onDismiss={() => setSnackbarVisible(false)}
                            duration={3000} // Duration for which the snackbar will be visible (in milliseconds)
                        >
                            Error loading data. Please try again.
                        </Snackbar>
                        <Text style={styles.sectionHeader}>Umfragen an denen ich teilgenommen habe</Text>
                        {loadingSurv ? (
                            // Show loading indicator while data is loading
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size="large"
                                color="#734498"
                            />
                        ) : (
                            <SectionList
                                sections={[{ data: surveys }]}
                                style={styles.sectionBox}
                                renderItem={({ item, index }) => (
                                    <StatButton
                                        keyExtractor={index}
                                        buttonHeading={item.question_title}
                                        buttonText={item.question_creator} // Display whatever you want here
                                        position={"relative"}
                                        question={item}
                                        state={"attended"}
                                        onDots={() =>
                                            navigation.navigate("QuestionaireOptions")
                                        }
                                        onPress={() => getStatisticInfoScreen(item)}
                                    />
                                )}
                                keyExtractor={(item, index) => item.questionId + index.toString()}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.textStyle}>{section.title}</Text>
                                )}
                            />
                        )}
                    </View>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} refreshing={console.log("helloRefresh")} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={["#6F6F70", "#6F6F70", "#6F6F70", "#778DE3"]} />
        </PaperProvider >
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
        height: "87%",
        width: "100%",
        backgroundColor: "white",
        flexGrow: 0,
    },
    subContainer: {
        height: "70%",
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
        fontSize: 15,
        fontWeight: "400",
        color: "#64748B",
        alignSelf: "flex-start",
        marginBottom: 15,
        fontFamily: "Manrope_600SemiBold",
        left: 27
    },

    sectionHeader: {
        fontSize: 14,
        fontWeight: "400",
        color: "#64748B",
        alignSelf: "flex-start",
        fontFamily: "Manrope_400Regular",
        left: 27

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

    },
});

export default StatisticsScreen;
