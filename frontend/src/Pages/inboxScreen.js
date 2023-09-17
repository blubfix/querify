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
    RefreshControl,
    FlatList,
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
    const [question, setQuestion] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingSurv, setLoadingSurv] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarVisibleSurv, setSnackbarVisibleSurv] = useState(false);
    
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
                getThisMonth();
                getThisWeek();
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const getThisWeek = () => {
        API.getQuestionFromThisWeek()
            .then((resp) => {
                console.log(resp.data);
                setSurveys(resp.data);
                if (resp.data.length === 0) {
                    setSnackbarVisibleSurv(true);
                }
            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisibleSurv(true);
            })
            .finally(() => {
                setLoadingSurv(false);
            });
    };

    const getThisMonth = () => {
        API.getQuestionFromThisMonth()
            .then((resp) => {
                console.log(resp.data);
                setQuestion(resp.data);
                if (resp.data.length === 0) {
                    setSnackbarVisible(true);
                }
            })
            .catch((e) => {
                console.log(e);
                setSnackbarVisible(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const whatQuestion = (type, bewertung, item) => {
        if (type === "free") {
            navigation.navigate("AnswerFreitext", item);
        } else if (type === "poll") {
            navigation.navigate("AnswerJaNein", item);
        } else if (type === "feeling") {
            if (bewertung === "stars") {
                navigation.navigate("AnswerStimmungsbildStars", item);
            } else if (bewertung === "likert") {
                navigation.navigate("AnswerStimmungsbildLikert", item);
            }
        } else if (type === "multi") {
            navigation.navigate("AnswerMehrfach", item);
        } else if (type === "reminder") {
            console.log("reminder");
        }
    };

    const onRefresh = () => {
        console.log("hello");
        loadUserData();
    };
    const data = [{}]; // Placeholder item

    return (
        <PaperProvider>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.headerText}>Inbox</Text>
                        <Text style={styles.sectionHeader}>Diese Woche</Text>
                        {loading ? (
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size="large"
                                color="#734498"
                            />
                        ) : (
                            <SectionList
                                sections={[{data: surveys }]}
                                style={styles.subContainer}
                                renderItem={({ item }) => (
                                    <StatButtonOwn
                                        buttonHeading={item.title}
                                        buttonText={item.name}
                                        position={"relative"}
                                        onDots={() => navigation.navigate("QuestionaireOptions")}
                                        onPress={() => navigation.navigate("StatisticSurvey", { item: item })}
                                        />
                                )}
                                keyExtractor={(item) => item.questionId}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.textStyle}>{section.title}</Text>
                                )}
                            />
                        )}
                        <Snackbar
                            visible={snackbarVisible}
                            onDismiss={() => setSnackbarVisible(false)}
                            duration={3000}
                        >
                            Error loading data. Please try again.
                        </Snackbar>
                        <Text style={styles.sectionHeader}>Diesen Monat</Text>
                        {loadingSurv ? (
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size="large"
                                color="#734498"
                            />
                        ) : (
                            <SectionList
                                sections={[{ data: question }]}
                                style={styles.subContainer}
                                renderItem={({ item }) => (
                                    <StatButton
                                        buttonHeading={item.title}
                                        buttonText={item.name}
                                        position={"relative"}
                                        onDots={() => navigation.navigate("QuestionaireOptions")}
                                        onPress={() => whatQuestion(item.type, item.bewertung, item)}
                                    />
                                )}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.textStyle}>{section.title}</Text>
                                )}
                                keyExtractor={(item) => item.questionId}
                            />
                        )}
                        <Snackbar
                            visible={snackbarVisibleSurv}
                            onDismiss={() => setSnackbarVisibleSurv(false)}
                            duration={3000}
                        >
                            Error loading data. Please try again.
                        </Snackbar>
                    </View>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} refreshing={console.log("helloRefresh")} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={["#6F6F70", "#778DE3", "#6F6F70", "#6F6F70"]} />
        </PaperProvider>
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

        width: "100%",
        paddingBottom: 20,
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
        paddingLeft: 20
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
