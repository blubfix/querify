import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Inter_500Medium  } from '@expo-google-fonts/inter';

const { width, height } = Dimensions.get("window");

const SubmitButton = (props) => {
    const {bottom = 0} = props;
    const {position = 'relative'} = props;

    const [fontsLoaded] = useFonts({
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{...styles.button, bottom: bottom, position: position}} onPress={props.onPress}>
                <LinearGradient colors={['#4F73E7', '#734498']} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                    <Text style={styles.text}>{props.buttonText}</Text>
                    <MaterialCommunityIcons style={styles.arrowIcon} name='arrow-right' color={'white'} size={20}/>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    button: {
        height: height*0.06,
        width: width*0.9,
        alignSelf: 'center',

        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
    },

    linearGradient: {
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    },

    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'Inter_500Medium'
    },

    arrowIcon: {
        position: 'absolute',
        right: 30,
    }
});

export default SubmitButton;