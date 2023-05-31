import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const SubmitButton = (probs) => {

    return (
        <View>
            <LinearGradient colors={['#4F73E7', '#734498']} start={[0, 0]} end={[1, 0]} style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={probs.onPress}>
                    <Text style={styles.text}>{probs.buttonText}</Text>
                    <Image style={styles.arrowIcon} source={require('../../assets/thin-arrow.png')}/>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({ 
    button: {
        width: 300,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        alignSelf: 'center'
    },

    arrowIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        right: 30,
        
    }
});

export default SubmitButton;