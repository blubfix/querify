import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Button, StyleSheet, View, Alert, useWindowDimensions } from "react-native";
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
import { Col, Row, Grid } from "react-native-paper-grid";
import DatePicker from "react-native-date-picker";

import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from "react-native-web";



const CreateRoute = () => <Text>Test</Text>;

const ListRoute = () => <Text>Albums</Text>;

const SettingsRoute = () => <Text>Recents</Text>;

export default function MasterPage({ navigation }) {
    const createTwoButtonAlert = () =>
        Alert.alert("This is an Alert Call", "Create Fast response", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'create', title: 'Create', focusedIcon: (props) => <MaterialCommunityIcons name='pencil-outline' color={'#F5F1F3'} size={25} />, unfocusedIcon: (props) => <MaterialCommunityIcons name='pencil' color={'#303030'} size={25} /> },
        {
            key: 'list', title: 'List', focusedIcon: (props) => <MaterialCommunityIcons name='format-list-bulleted' color={'#F5F1F3'} size={25} />, unfocusedIcon: (props) => <MaterialCommunityIcons name='format-list-bulleted-square' color={'#303030'} size={25} />
        },
        { key: 'settings', title: 'Settings', focusedIcon: (props) => <MaterialCommunityIcons name='cog' color={'#F5F1F3'} size={25} />, unfocusedIcon: (props) => <MaterialCommunityIcons name='cog-outline' color={'#303030'} size={25} /> },

    ]);

    const renderScene = BottomNavigation.SceneMap({
        create: CreateRoute,
        list: ListRoute,
        settings: SettingsRoute,

    });


    const [text, setText] = React.useState("");


    return (
        <PaperProvider theme={theme} >
            <LinearGradient colors={['#FDFCFB', '#E3D2C4']} style={styles.linearGradient}>

                <View style={styles.NavButton}>
                    <Text style={styles.NavText}>
                        Anmeldung
                    </Text>
                </View>
                <Grid container style={styles.ContainerQuestionaire}>

                    <Row>
                        <Col>
                            <View style={styles.pageWideButton}>
                                <Button


                                    color="#303030"
                                    onPress={() => navigation.navigate("Home")}

                                    title="Account erstellen"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View style={styles.bigBox}>
                                <Grid container style={{ justifyContent: "space-around" }}>

                                    <Row>
                                        <Col>
                                            <View style={styles.bigBoxHeadingBox}>
                                                <Text style={styles.bigBoxHeading}>
                                                    This is a Master Input with lots of Text
                                                </Text>
                                            </View>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <TextInput
                                                style={styles.textInput}
                                                mode="flat"
                                                backgroundColor="#F5F1F3"
                                                borderRadius={10}
                                                activeUnderlineColor="#FDFCFBAA"
                                                underlineStyle={styles.textInputUnderline}
                                                textColor="#303030"
                                                placeholder="Deine Name"
                                                value={text}
                                                onChangeText={text => setText(text)}
                                            />
                                        </Col>
                                    </Row>
                                </Grid>


                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <BottomNavigation
                            style={styles.BottomNavBar}
                            shifting={false}
                            barStyle={{ backgroundColor: "#F5F1F3" }}
                            navigationState={{ index, routes }}
                            onIndexChange={setIndex}
                            renderScene={renderScene}
                            theme={{ colors: { secondaryContainer: '#303030', onSurface: "#303030", onSurfaceVariant: "#303030" } }}

                        />
                    </Row>
                </Grid>
            </LinearGradient>
        </PaperProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    ContainerQuestionaire: {
        justifyContent: "space-evenly",
        maxHeight: "90%",

    },
    linearGradient: {
        flex: 1,

        borderRadius: 5
    },
    pageWideButton: {
        padding: 10,

        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.10,
        shadowRadius: 9.51,

        borderRadius: 10,
        backgroundColor: "#F5F1F3",

        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    bigBoxHeadingBox: {
        padding: 10,

        width: "90%",
        marginBottom: "1%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.10,
        shadowRadius: 9.51,

        borderRadius: 10,
        backgroundColor: "#F5F1F3",

        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    bigBoxHeading: {
        alignSelf: 'center',
        color: "#303030",
        fontSize: 25,
        textAlign: "center",
    },
    round: {
        padding: 10,
        margin: 10,
        width: 100,
        height: 100,



        borderRadius: 50,
        backgroundColor: "#F5F1F3",
        borderWidth: 2,
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center"


    },
    bigBox: {
        width: "90%",
        height: "50%",
        marginTop: "20%",
        backgroundColor: "#F5F1F380",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.10,
        shadowRadius: 9.51,

        elevation: 15,
        alignContent: "center",
        alignSelf: "center",


    },
    smallBox: {
        width: "90%",
        height: "40%",
        marginTop: "3%",
        backgroundColor: "#F5F1F3",
        borderWidth: 1,
        borderColor: "#E0E0E080",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center"

    },
    answerBox: {
        padding: "1%",
        width: "80%",


        backgroundColor: "#F5F1F3",
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: "center",


    },
    textInput: {
        width: "80%",

        backgroundColor: "#FFFFFF00",
        alignContent: "center",
        textAlign: "center",
        alignSelf: "center",
        fontSize: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.10,
        shadowRadius: 9.51,

    },
    textInputUnderline: {
        width: "95%",
        marginStart: "2.5%",
    },
    mainHeadingBox: {
        marginTop: "10%",
        marginBottom: "5%"
    },

    ButtonText: {
        color: "#F5F1F3",
        alignSelf: "center",
        fontSize: 30,


    },
    answerText: {
        color: "#303030",
        alignSelf: "center",
        fontSize: 25
    },

    buttonHeading: {
        alignSelf: 'center',
        color: "#303030",
        fontSize: 30,
    },
    questionnaireHeading: {
        alignSelf: 'center',
        color: "#303030",
        textAlign: "center",
        fontSize: 30,
    },

    textSurface: {
        padding: 10,

        borderRadius: 5,
        alignSelf: "center",
        width: "100%",
        alignSelf: "center",
    },
    NavButton: {

        height: "8%",
        maxHeight: 70,
        width: "80%",
        backgroundColor: "#CD7389CC",
        marginTop: "15%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,

        justifyContent: "center"
    },
    NavText: {
        alignSelf: 'center',
        color: "#F5F1F3",
        fontSize: 30,



    },

    BottomNavBar: {
        width: "100%",

        color: "#FFFFFF",
        borderRadius: 20,

    },
});

const theme = {
    ...DefaultTheme,

    colors: {
        ...DefaultTheme.colors,
        primary: "purple",
        secondary: "yellow",





    },

};

