import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SectionList, Image, Button, StyleSheet, View, Alert, useWindowDimensions, TouchableOpacity } from "react-native";
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
import StatButton from "../Components/StatButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";

const InboxScreen = ({ navigation }) => {


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


    return (
        <PaperProvider>
            <Grid style={styles.container} container>
                <Row size={0.75}>
                    <Col>
                        <Row>
                            <Col>
                                <Text style={styles.headerText}>Inbox</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SectionList
                                    sections={[
                                        { title: 'This month', data: ['Devin', 'Dan', 'Dominic'] },
                                        {
                                            title: 'This week',
                                            data: [
                                                'Jackson',
                                                'James',
                                                'Jillian',
                                                'Jimmy',
                                                'Joel',
                                                'John',
                                                'Julie',
                                            ],
                                        },
                                    ]}
                                    // renderItem={({ item }) => < StatButton buttonHeading={'Umfrage XYZ'} buttonText={item} position={'relative'} onDots={() => navigation.navigate('QuestionaireOptions')} />}
                                    renderItem={({ item }) => < StatButton buttonHeading={'Umfrage XYZ'} buttonText={item} position={'relative'} onDots={() => navigation.navigate('QuestionaireOptions')} />}
                                    renderSectionHeader={({ section }) => (
                                        <Text style={styles.textStyle}>{section.title}</Text>
                                    )}
                                    keyExtractor={item => `basicListEntry-${item}`}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                            </Col>
                        </Row>

                    </Col>
                </Row>



                <BottomNavigation buttonColors={['#6F6F70', '#778DE3', '#6F6F70', '#6F6F70']} />
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

    textInputHeaderText: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 14,
        marginBottom: 5,
        color: '#191D23'
    },

    forgorPasswordText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 12,
        color: '#734498'
    },

    textInputHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    checkboxText: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10,
        fontFamily: 'Manrope_400Regular'
    },

    checkbox: {
        alignSelf: 'center',
        color: '#734498',
        borderWidth: 1.5
    },

    errorText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'Manrope_300Light',
        color: '#DC2626',
    },

    submitText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Manrope_400Regular',
        color: '#191D23'
    },

    submitTextPurple: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Manrope_700Bold',
        color: '#734498'
    }




})

export default InboxScreen;