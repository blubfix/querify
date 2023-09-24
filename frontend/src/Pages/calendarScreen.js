import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, FlatList } from "react-native";
import {
    Provider as PaperProvider,
    Text,
} from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_300Light } from '@expo-google-fonts/manrope'
import BottomNavigation from "../Components/BottomNavigation";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import API from "../API/apiConnection";
const CalendarScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_300Light
    });
    const [dates, setDates] = useState(null);
    const [orgDates, setOrgDates] = useState(null);

    useEffect(() => {
        getQuestions();
        // console.log("questions: ", questions);
    }, []);

    const getQuestions = async () => {
        try {
            const resp = await API.getAllQuestions();
            // console.log(resp.data);
            await setQuestions(resp.data);
            await filterData(resp.data);
        } catch (e) {
            console.log(e);
        }
        return questions
    };

    const filterData = async (data) => {
        filtered = data.filter(item => item.date !== null && item.date !== undefined);
        const sortByDate = () => {
            const sortedData = [...filtered].sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join('-')); 
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return dateA - dateB; 
            });
            setFilteredData(sortedData);
        };
        sortByDate();


        const dateStrings = filtered.map(item => item.date)


        const formattedDates = [];

        for (const inputDateString of dateStrings) {
            const [day, month, year] = inputDateString.split('.');
            const originalDate = new Date(year, month - 1, day);
            const formattedYear = originalDate.getFullYear();
            const formattedMonth = (originalDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedDay = originalDate.getDate().toString().padStart(2, '0');
            const formattedDateString = `${formattedYear}-${formattedMonth}-${formattedDay}`;
            formattedDates.push(formattedDateString);
        }

        const modifiedEntries = formattedDates.map(dateString => {
            const modifiedObject = {
                [dateString]: {
                    selected: true,
                    marked: false,
                    selectedColor: '#874665E0'
                }
            };
            return modifiedObject;
        });

        const combinedModifiedEntries = Object.assign({}, ...modifiedEntries);

        const dataArray = Object.entries(combinedModifiedEntries);

        dataArray.sort((a, b) => a[0].localeCompare(b[0]));

        const sortedData = Object.fromEntries(dataArray);

        setDates(sortedData);
        setOrgDates(sortedData);
    }

    const pressDay = async (day) => {
        const newKey = day;
        const newValue = { "selected": "true", "selectedColor": "#74479AD5" };
        const updatedObject = {
            ...orgDates,
            [newKey]: newValue
        };
        setDates(updatedObject)
    }
    if (!fontsLoaded) {
        return null;
    }

    LocaleConfig.locales['de'] = {
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        dayNames: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        dayNamesShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        today: 'heute'
    }
    LocaleConfig.defaultLocale = 'de';

    const onRefresh = () => {
        console.log("Refreshing page")
        getQuestions();
    };

    const data = [{}]; // Placeholder item

    return (
        <PaperProvider>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
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
                                        textDayStyle: styles.calendarText,
                                        textMonthFontFamily: 'Manrope_600SemiBold',
                                        textMonthFontSize: 16,
                                        textDayHeaderFontFamily: 'Manrope_300Light',
                                        textDayHeaderFontSize: 15,
                                        arrowColor: '#64748B',
                                        todayTextColor: '#5172E5',
                                        todayBackgroundColor: "#5172E522",
                                    }}
                                    markedDates={dates}
                                    enableSwipeMonths={true}
                                    onDayPress={day => { pressDay(day.dateString) }}
                                />
                            </Col>
                        </Row>
                        {filteredData.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <Text style={styles.firstRowText}>Umfrage endet am: {item.date}</Text>
                                        <Text style={styles.secondRowText}>{item.title}</Text>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Grid>
                )}
                refreshControl={<RefreshControl tintColor={"#74479A"} onRefresh={onRefresh} />}
            />
            <BottomNavigation buttonColors={['#6F6F70', '#6F6F70', '#778DE3', '#6F6F70']} />


        </PaperProvider>
    );
}


const styles = StyleSheet.create({
    progressBar: {
        alignSelf: 'center',
        width: '95%',
    },

    container: {
        height: '87%',
        width: '100%',
        backgroundColor: 'white',
        flexGrow: 0,
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
        width: '95%',
        alignSelf: 'center',

    },

    calendarText: {
        fontSize: 15,
        fontWeight: '300',
        fontFamily: 'Manrope_300Light',
    },

    firstRowText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
        alignSelf: "flex-start",
        marginBottom: "2%",
        fontFamily: 'Inter_500Medium',
        marginLeft: "5%",
    },
    secondRowText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        alignSelf: "flex-start",
        marginBottom: "2%",
        fontFamily: 'Inter_500Medium',
        marginLeft: "5%",
    },


})

export default CalendarScreen;