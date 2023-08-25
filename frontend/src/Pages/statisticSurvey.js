import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");

const StatisticSurvey = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [question, setQuestion] = useState(route.params.item);
    const [expanded, setExpanded] = React.useState(true);

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

    if (!fontsLoaded) {
        return null;
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

    checkDate = (date) => {

    }

    const goNextForm = () => {
        console.log("title: ", title)
        navigation.navigate('QuestionaireOptions', { title: title, description: description, date: date, color: selectedColorIndex, type: 'poll' });
    }

    return (
        <PaperProvider>
            <Grid style={styles.container} container>
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} extraScrollHeight={40}>
                    <Row>
                        <Col>
                            <Text style={styles.headerText}>Statistik deiner Umfrage</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.subHeader}>{question.title}</Text>
                            <Text>{question.type}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Surface elevation={1}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                    <Text style={styles.accountButtonText}>Profil</Text>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "black",
                                            borderRadius: 0,
                                        }}>
                                        <Text> ... </Text>
                                    </View>
                                </View>
                            </Surface>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Surface elevation={5} style={{ backgroundColor: "grey" }}>
                                <View style={styles.statisticContainer}>
                                    <Text style={styles.subHeader}>...% haben für JA abgestimmt</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                        <View style={{ flex: 1 }}>
                                            <ProgressBar progress={0.5} style={{ width: "" }} />
                                        </View>
                                        <Text> ...%</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                        <View style={{ flex: 1 }}>
                                            <ProgressBar progress={0.5} style={{ width: "" }} />
                                        </View>
                                        <Text> ...%</Text>
                                    </View>
                                </View>
                            </Surface>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Surface elevation={1}>
                                <List.Accordion
                                    title="Liste der Ja-Abgestimmten"
                                    left={props => <List.Icon {...props} icon="check" />}
                                    right={() => (
                                        <View style={{ borderRadius: 0, borderWidth: 1, borderColor: "black" }}>
                                            <Text>2</Text>
                                        </View>
                                    )}
                                >
                                    <List.Item title="First item" />
                                    <List.Item title="Second item" />
                                </List.Accordion>
                            </Surface>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Surface elevation={1}>
                                <List.Accordion
                                    title="Liste der Nein-Abgestimmten"
                                    left={props => <List.Icon {...props} icon="check" />}
                                    right={() => (
                                        <View style={{ borderRadius: 0, borderWidth: 1, borderColor: "black" }}>
                                            <Text>2</Text>
                                        </View>
                                    )}
                                >
                                    <List.Item title="First item" />
                                    <List.Item title="Second item" />
                                </List.Accordion>
                            </Surface>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Surface elevation={1}>
                                <View style={styles.textIconContainer}>
                                    <MaterialCommunityIcons name='account-outline' color={'#090A0A'} size={30} />
                                    <Text style={styles.accountButtonText}>Verbleibende Zeit in Tagen</Text>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "black",
                                            borderRadius: 0,
                                        }}>
                                        <Text> ... </Text>
                                    </View>
                                </View>
                            </Surface>
                        </Col>
                    </Row>
                </KeyboardAwareScrollView>
                <SubmitButton buttonText={'Weiter'} position={'absolute'} bottom={120} onPress={() => goNextForm()} />
                <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#6F6F70', '#6F6F70']} />
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

export default StatisticSurvey;