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


const CreateErinnerung =({ navigation }) => {
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
                            <TitleInput value={title} onChangeText={setTitle} borderColor={'#D0D5DD'} placeholder={'Name deiner Erinnerung'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ColorPalette/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DescriptionInput value={description} onChangeText={setDescription} borderColor={'#D0D5DD'} placeholder={'Details über diese Erinnerung'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DateInput value={date} onChangeText={setDate} borderColor={'#D0D5DD'}/>
                        </Col>
                    </Row>
                </KeyboardAwareScrollView>
                <SubmitButton buttonText={'Speichern'} position={'absolute'} bottom={120}/>
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