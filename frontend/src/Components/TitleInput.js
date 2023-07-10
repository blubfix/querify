import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native'
import { React, useState } from 'react'
import { useFonts, Inter_400Regular  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_300Light } from '@expo-google-fonts/manrope';

const { width, height } = Dimensions.get("window");

const TitleInput = (props) => {
  const [chars, setChars] = useState(0);
  const {placeholder = 'Name deiner Umfrage'} = props;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  changeChars = (text) => {
    setChars(text.length);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Titel</Text>
      <TextInput 
        style={{...styles.textInput, borderColor: props.borderColor}} 
        onChangeText={(title) => {props.onChangeText(); changeChars(title);}}
        value={props.value}
        placeholder={placeholder}
        maxLength={30}
      />
      <Text style={styles.charText}>{chars}/30</Text>
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
      alignSelf: 'center'
    },

    charText: {
      alignSelf: 'flex-end',
      fontFamily: 'Manrope_300Light',
      fontSize: 14,
      color: '#64748B',
      marginTop: height*0.005,
    }
});

export default TitleInput