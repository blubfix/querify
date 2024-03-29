import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native'
import {React, useState} from 'react'
import { useFonts, Inter_400Regular  } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_300Light } from '@expo-google-fonts/manrope';

const { width, height } = Dimensions.get("window");

const DescriptionInput = (props) => {
  const [chars, setChars] = useState(0);
  const {placeholder = 'Details über diese Umfrage'} = props;

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
  const handleDescriptionChange = (description) => {
    changeChars(description);
    props.onChangeText(description);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Beschreibung</Text>
      <TextInput 
        style={{...styles.textInput, borderColor: props.borderColor}} 
        onChangeText={handleDescriptionChange}
        value={props.value}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={4}
        maxLength={400}
      />
      <Text style={styles.charText}>{chars}/400</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
      minWidth: '100%',
      height: 120,
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

export default DescriptionInput