import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

const SubmitButton = (probs) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={probs.onPress}>
                <LinearGradient colors={['#4F73E7', '#734498']} start={[0, 0]} end={[1, 0]} style={styles.linearGradient}>
                    <Text style={styles.text}>{probs.buttonText}</Text>
                    <MaterialCommunityIcons style={styles.arrowIcon} name='arrow-right' color={'white'} size={20}/>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({ 
    button: {
        height: height*0.05,
        width: width*0.75,

        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
    },

    arrowIcon: {
        position: 'absolute',
        right: 30,
    }
});

export default SubmitButton;