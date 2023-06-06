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
    BottomNavigation,
    TextInput,
} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-paper-grid";
import SubmitButton from "../Components/SubmitButton";
import SingleLineInput from "../Components/SingleLineInput";
import CheckBox from 'expo-checkbox';

const RegisterScreen =() => {
    const [checked, setChecked] = React.useState(false);

  return (
    <PaperProvider>
            <Grid style={styles.container} container>
                <Row size={0.4}>
                    <Col>
                        <Row size={0.8}>
                            <Col>
                                <Text style={styles.headerText}>Wie ist deine E-Mail Adresse?</Text>
                                <Text style={styles.subHeaderText}>Bestätige deine E-Mail Adresse, um den Zugriff auf dein Konto nicht zu verlieren.</Text>
                                <SingleLineInput/>

                            </Col>
                        </Row>
                        <Row >
                            <Col inline>
                                <CheckBox
                                    value={checked}
                                    onValueChange={setChecked}
                                    style={styles.checkbox} 
                                    color={'#734498'}
                                />
                                <Text style={styles.checkboxText}>Ich möchte Werbung und Marketingmitteilungen von querify erhalten.</Text>
                            </Col>
                        </Row>


                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SubmitButton buttonText={'Weiter'} onpress={() => console.log('Hello')}/>
                    </Col>
                </Row>
                

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
        marginTop: 25
    },

    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15
    },

    checkboxText: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10
    },
    
    checkbox: {
        alignSelf: 'center',
        color: '#734498',
        borderWidth: 1.5
    }


})

export default RegisterScreen;