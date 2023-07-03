import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import {React, useState} from 'react'
import { useFonts, Inter_400Regular  } from '@expo-google-fonts/inter';

const { width, height } = Dimensions.get("window");

const SingleLineInput = (props) => {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <TextInput style={{...styles.textInput, borderColor: props.borderColor}} onChangeText={props.onChangeText} value={props.text} textContentType={props.type} secureTextEntry={props.secureTextEntry}/>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
        width: width*0.9,
        height: height*0.06,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 16,
        fontFamily: 'Inter_400Regular',
    }
});

export default SingleLineInput