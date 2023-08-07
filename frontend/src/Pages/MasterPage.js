import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SectionList, Image, Button, StyleSheet, View, Alert, useWindowDimensions } from "react-native";
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
import SubmitButton from "../Components/SubmitButton";
import StatButton from "../Components/StatButton";


const CreateRoute = () => <Text>Test</Text>;

const ListRoute = () => <Text>Albums</Text>;

const SettingsRoute = () => <Text>Recents</Text>;

const numbersMap = [
    { customerNo: "908-1", time: "2:20" },
    { customerNo: "908-2", time: "2:20" },
    { customerNo: "908-3", time: "2:20" },
];

function ItemList(props) {
    return (
        <div>
            {props.sizes.map((s) => (
                <StatButton key={s.customerNo} buttonHeading={'U: Frühlingsfest 2023 '} buttonText={'Celine'} position={'absolute'} bottom={0} onPress={() => navigation.navigate('RegisterScreen_1')} onDots={() => navigation.navigate('InboxScreen')} onRedirect={() => navigation.navigate('CalendarScreen')} />
            ))}
        </div>
    );
}


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
                 <SectionList
        sections={[
          {title: 'This month', data: ['Devin', 'Dan', 'Dominic']},
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
        renderItem={({ item }) => <StatButton buttonHeading={'Umfrage XYZ'} buttonText={item} position={'relative'} onDots={() => navigation.navigate('QuestionaireOptions')} />}
        renderSectionHeader={({section}) => (
          <Text style={styles.textStyle}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
        </PaperProvider >
    );
}

const styles = StyleSheet.create({
    ListStyle: {
        marginTop: 50,
      },

    textStyle:{
        color:'black',
    }
});

const theme = {
    ...DefaultTheme,

    colors: {
        ...DefaultTheme.colors,
        primary: "purple",
        secondary: "yellow",





    },

};

