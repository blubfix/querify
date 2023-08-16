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

function StatButton (props)  {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const { bottom = 0 } = props;
    const { position = 'relative' } = props;

    const [fontsLoaded] = useFonts({
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View >
            <Grid style={{ ...styles.button, bottom: bottom, position: position }} container>
                <View   >
                    <LinearGradient colors={['#AD323D', '#74479A']} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                        <Row>
                            <Col>
                                <Row>
                                    <MaterialCommunityIcons style={styles.redirectIcon} name='arrow-right-top' color={'white'} size={20} onPress={props.onRedirect} />
                                    {/* <MaterialCommunityIcons style={styles.dotsIcon} name='dots-horizontal' color={'white'} size={20} onPress={props.onDots}/> */}
                                    <Menu 
                                        visible= {visible}
                                        onDismiss={closeMenu}
                                        anchor = {
                                            <Appbar.Action
                                                icon='dots-horizontal'
                                                onPress={openMenu}
                                                />
                                        }>
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='Abstimmen'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='Ändern'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='Alle Stimmen löschen'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='Löschen'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='QR-Code anzeigen'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='redo'
                                                title='Umfrage URL kopieren'
                                                />
                                            <Menu.Item
                                                onPress={() => {
                                                    console.log('Option1')
                                                }}
                                                leadingIcon='export'
                                                title='Exportieren'
                                                />
                                        </Menu>
                                </Row>
                                <Row>
                                    <Text style={styles.heading}>{props.buttonHeading}</Text>
                                </Row>
                                <Row>
                                    <MaterialCommunityIcons style={styles.personIcon} name='human-greeting' color={'white'} size={20} />
                                    <Text style={styles.text}>{props.buttonText}</Text>
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
        color: 'white',
        fontFamily: 'Inter_500Medium',
        left: 20,
        bottom: 5,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'Inter_500Medium',
        left: 50,
        bottom: 0,
        alignSelf: 'flex-start'
    },

    chevronIcon: {
        position: 'absolute',
        right: 30,
        top: 15,
    },
    personIcon: {
        position: 'absolute',
        left: 25,
    },
    redirectIcon: {
        position: 'absolute',
        left: 5,
        bottom: 5,
    },
    dotsIcon: {
        position: 'absolute',
        left: 32,
        bottom: 5,
    }
});

export default StatButton;