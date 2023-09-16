import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions, TouchableOpacity} from "react-native";
import {
    MD3DarkTheme as DefaultTheme,
    Provider as PaperProvider,
    Switch,
    Text,
    Surface,
    Appbar,
    SegmentedButtons,
    TextInput,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../API/apiConnection";

const CreateErinnerung =({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

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

    const loadUserData = async () => {
        try {
            const tempData = await AsyncStorage.getItem("userData");
            if (tempData) {
                const parsedUserData = JSON.parse(tempData);
                return parsedUserData;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error loading Storage:", error);
        }
    };

    const createReminder = async () => {
        const data = saveUserData();
        const userData = await loadUserData();
        if (userData) {

            console.log("userData:", userData)
            data['userId'] = userData.id;
            data['minimumNumberOfAnswers'] = 1;
            console.log("finalData: ", data);
            API.postQuestion(data)
                .then((resp) => {
                    console.log(resp.data);
                    navigation.navigate('ShareReminder', resp.data)
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            console.log('no user data found');
        }
    }

    const saveUserData = () => {
        try {
            // Load existing user data
            const existingData = route.params;
            console.log("existingData: ", existingData)
            // Merge new data with existing data
            const finalData = {
                ...existingData,
                title: title,
                description: description,
                date: date,
                type: "reminder",
                qrCode: 'qrCodeBase64'
            }
            return finalData;

        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

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


    return (
        <PaperProvider>
            <Grid style={styles.container} container>  
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} extraScrollHeight={40}> 
                    <Row>
                        <Col>
                            <Text style={styles.headerText}>Erstelle eine Erinnerung</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TitleInput value={title} onChangeText={handleTitleChange} borderColor={'#D0D5DD'} placeholder={'Name deiner Erinnerung'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DescriptionInput value={description} onChangeText={handleDescriptionChange} borderColor={'#D0D5DD'} placeholder={'Details über diese Erinnerung'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DateInput value={date} onChangeText={handleDateChange} borderColor={'#D0D5DD'}/>
                        </Col>
                    </Row>
                </KeyboardAwareScrollView>
                <SubmitButton buttonText={'Speichern'} position={'absolute'} bottom={120} onPress={() => createReminder()}/>
                <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']}/>
            </Grid>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },

    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
        fontFamily: 'Inter_700Bold',
    },

    


})

export default CreateErinnerung;