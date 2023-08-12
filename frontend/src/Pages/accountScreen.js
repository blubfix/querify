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

const AccountScreen = ({ navigation }) => {

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

    //!
    //TODO: Logout and remove the jwt token so the user is not loggedin anymore


    return (
        <PaperProvider>
                <Grid style={styles.container} container>
                    <Row size={0.25}>
                        <Col>
                            <Text style={styles.headerText}>Konto-Einstellungen</Text>
                        </Col>
                    </Row>
                    <Row size={0.4}>
                        <Col>
                            <TouchableOpacity style={styles.premiumButton}>
                                <View style={styles.premiumTextIconContainer}>
                                    <Text style={styles.headerTextWhite}>Premium Mitgliedschaft</Text>
                                    <MaterialCommunityIcons name='star' color={'white'} size={30}/>
                                </View>
                                <Text style={styles.subHeaderTextWhite}>Upgrade für mehr Funktionalitäten</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={styles.buttonContainer}>
                            <Text style={styles.accountButtonHeaderText}>Account</Text>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Profil</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='lock-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Passwort</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='bell-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Benachrichtigungen</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={styles.buttonContainer}>
                            <Text style={styles.accountButtonHeaderText}>Mehr</Text>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='star-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Bewertung & Feedback</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='help-circle-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Hilfe</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accountButton}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='message-outline' color={'#090A0A'} size={30}/>
                                    <Text style={styles.accountButtonText}>Kontaktiere uns</Text>
                                </View>
                                <MaterialCommunityIcons name='chevron-right' color={'#090A0A'} size={40}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
                                <MaterialCommunityIcons name='logout-variant' color={'#979C9E'} size={30}/>
                                <Text style={styles.logoutText}>Abmelden</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>


                    <BottomNavigation buttonColors={['#778DE3', '#6F6F70', '#6F6F70', '#6F6F70']}/>
                </Grid>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: '8%'
    },


    headerText: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: 'Inter_700Bold'
    },

    headerTextWhite: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'flex-start',
        fontFamily: 'Inter_700Bold',
        color: 'white',
        marginBottom: 5
    },

    subHeaderTextWhite: {
        fontSize: 14,
        color: '#E7E7FF',
        alignSelf: "flex-start",
        fontFamily: 'Inter_400Regular'
    },

    premiumButton: {
        width: '100%',
        minHeight: '90%',
        backgroundColor: '#72479C',
        alignSelf: 'center',
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingVertical: '6%'

    },

    premiumTextIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        alignItems: 'center'
    },

    accountButton: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: '5%',
        justifyContent: 'space-between'
    },

    textIconContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },

    accountButtonText: {
        alignSelf: 'center',
        textAlign: 'left',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#090A0A',
        marginLeft: 10
    },

    accountButtonHeaderText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#090A0A',
        marginBottom: '5%'
    },

    logoutButton: {
        alignSelf: "center",
        flexDirection: 'row',
        marginBottom: '4%'
    },

    logoutText: {
        fontFamily: 'Inter_400Regular',
        color: '#979C9E',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 5
    }

})

export default AccountScreen;