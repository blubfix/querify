import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions} from "react-native";
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
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CalendarScreen =({ navigation }) => {

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

    LocaleConfig.locales['de'] ={
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        dayNames: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        dayNamesShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        today: 'heute'
    }
    LocaleConfig.defaultLocale = 'de';


    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row>
                        <Col>
                            <Text style={styles.headerText}>Kalender</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Calendar 
                                style={styles.calendar} 
                                theme={{
                                    backgroundColor: '#ffffff',
                                    dayTextColor: 'black',
                                    textDayFontFamily: 'Manrope_300Light',
                                    textDayFontSize: 15,
                                    textDayStyle: styles.textDayStyle,
                                    textMonthFontFamily: 'Manrope_600SemiBold',
                                    textMonthFontSize: 16,
                                    textDayHeaderFontFamily: 'Manrope_300Light',
                                    textDayHeaderFontSize: 15,
                                    arrowColor: '#64748B',
                                    todayTextColor: '#5172E5',
                                    
                                }}
                                enableSwipeMonths={true}
                                onDayPress={day => {console.log(day)}} 
                                />

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>

                    <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#778DE3', '#6F6F70']}/>
                </Grid>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    progressBar: {
        alignSelf: 'center',
        width: '95%',
    },

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
        fontFamily: 'Inter_700Bold'
    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#64748B',
        alignSelf: "flex-start",
        marginBottom: 15,
        fontFamily: 'Manrope_400Regular'
    },

    calendar: {
        //borderWidth: 1,
        width: '95%',
        alignSelf: 'center',

    },


})

export default CalendarScreen;