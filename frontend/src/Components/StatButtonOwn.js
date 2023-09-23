import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import Share from 'react-native-share';

import {
    Appbar,
    Menu,
} from "react-native-paper";

import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { Col, Row, Grid } from "react-native-paper-grid";

const { width, height } = Dimensions.get("window");

function StatButton(props) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const { bottom = 0 } = props;
    const { position = 'relative' } = props;
    const [question, setQuestion] = React.useState(props.question);
    const state = props.state;
    var colorButton = ['#B9789D', '#74479A'];

    const [fontsLoaded] = useFonts({
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    if (state === 'active') {
        colorButton = ['#AD323D', '#74479A'];
    } else if (state === 'expired') {
        colorButton = ['#AD323D', '#74479A'];
    } else if (state === 'attended') {
        colorButton = ['#B9789D', '#74479A'];
    }


    return (
        <View >
            <Grid style={{ ...styles.button, bottom: bottom, position: position }} container>
                <View   >
                    <LinearGradient colors={colorButton} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                        <Row>
                            <Col>
                                <Row>
                                    <MaterialCommunityIcons style={styles.redirectIcon} name='arrow-right-top' color={'white'} size={20} onPress={props.onRedirect} />
                                    {/* <MaterialCommunityIcons style={styles.dotsIcon} name='dots-horizontal' color={'white'} size={20} onPress={props.onDots}/> */}
                                    <Menu
                                        visible={visible}
                                        onDismiss={closeMenu}
                                        anchor={
                                            <Appbar.Action
                                                icon='dots-horizontal'
                                                iconColor='white'
                                                style={styles.dotsIcon}
                                                onPress={openMenu}
                                            />
                                        }>
                                        {state !== 'attended' ? (
                                            <Menu.Item
                                            onPress={() => {
                                                console.log('Option1')
                                            }}
                                            leadingIcon='redo'
                                            title='Löschen'
                                        />
                                        ):(null)}
                                        
                                    </Menu>
                                </Row>
                                <Row>
                                    <Text style={styles.heading}>{props.buttonHeading}</Text>
                                </Row>
                                <Row>
                                    <MaterialCommunityIcons style={styles.personIcon} name='human-greeting' color={'white'} size={20} />
                                    <Text style={styles.personText}>{props.buttonText}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <MaterialCommunityIcons style={styles.chevronIcon} name='chevron-right' color={'white'} size={30} onPress={props.onPress} />
                            </Col>
                        </Row>

                    </LinearGradient>
                </View>
            </Grid>
        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        height: height * 0.13,
        width: width * 0.9,
        alignSelf: 'center',

        borderRadius: '0%',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
    },

    linearGradient: {
        width: '100%',
        height: '100%',
        borderRadius: '10%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    heading: {
        fontSize: 18,
        fontWeight: '500',

        width: "130%",
        color: 'white',
        fontFamily: 'Inter_500Medium',
        position: "relative",
        left: 15,
        bottom: 20,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'Inter_500Medium',
        bottom: 20,
        alignSelf: 'flex-start'
    },
    personText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'Inter_500Medium',
        left: "200%",
        bottom: "10%",
        alignSelf: 'flex-start'
    },

    chevronIcon: {
        position: 'absolute',
        right: "15%",
        top: "41%",
    },
    personIcon: {
        position: 'absolute',
        left: "10%",
        bottom: "110%",
    },
    redirectIcon: {
        position: 'absolute',
        left: "5%",
        top: "40%",
    },
    dotsIcon: {
        position: 'relative',
        left: "35%",
    }
});

export default StatButton;