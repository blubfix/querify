import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native'
import {React, useState} from 'react'
import { useFonts, Inter_400Regular  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_300Light } from '@expo-google-fonts/manrope';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

const DateInput = (props) => {
  const [chars, setChars] = useState(0);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  const changeChars = (text) => {
    setChars(text.length);
  }
  const handleDateChange = (date) => {
    changeChars(date);
    props.onChangeText(date);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Datum</Text>
      <View style={styles.subContainer}>
        <TextInput 
          style={{...styles.textInput, borderColor: props.borderColor}} 
          onChangeText={handleDateChange}
          value={props.value}
          placeholder='Gib den Stichtag ein'
          keyboardType='numbers-and-punctuation'
          maxLength={10}
        />
        <MaterialCommunityIcons name='clock-outline' color={'#64748B'} size={20} style={styles.icon}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
      minWidth: '100%',
      height: 50,
      alignSelf: 'center',
      borderRadius: 5,
      borderWidth: 1,
      fontSize: 16,
      paddingLeft: 16,
      fontFamily: 'Manrope_400Regular',

    },

    headerText: {
      fontFamily: 'Manrope_600SemiBold',
      fontSize: 15,
      marginBottom: height*0.005,
    },

    container: {
      maxWidth: width*0.9,
      alignSelf: 'center',
    },

    subContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    charText: {
      alignSelf: 'flex-end',
      fontFamily: 'Manrope_300Light',
      fontSize: 14,
      color: '#64748B',
      marginTop: height*0.005,
    },

    icon: {
      position: 'absolute',
      right: 10
    }
});

export default DateInput