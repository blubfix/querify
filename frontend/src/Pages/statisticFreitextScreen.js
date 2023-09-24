import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, Button, StyleSheet, View, Alert, Dimensions, TouchableOpacity, KeyboardAvoidingView } from "react-native";
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

    return (
        <PaperProvider>
            <Grid style={styles.container} container>
                <Text>StatisticMehrfachScreen</Text>
            </Grid>
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
    textIconContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    statisticContainer: {
        padding: 25,
    },

    keyboardContainer: {
        minHeight: '100%',
        width: '100%',

    },

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    }

})

export default StatisticFreitextScreen;