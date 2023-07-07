import { StyleSheet, TextInput, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'
import { useFonts, Manrope_400Regular } from '@expo-google-fonts/manrope';

const { width, height } = Dimensions.get("window");

const ColorPalette = (props) => {
  const [borderWidth, setBorderWidth] = useState([0, 0, 0, 0, 0, 0]);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  selectColor = (colorIndex) => {
    let borderWidthCopy = [];

    for (let index = 0; index < borderWidth.length; index++) {
      if (colorIndex == index) {
        borderWidthCopy.push('2');
      } else {
        borderWidthCopy.push('0');
      }
    }

    setBorderWidth(borderWidthCopy);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Farbe</Text>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[0], backgroundColor: '#F7CE46'}} onPress={() => selectColor(0)}/>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[1], backgroundColor: '#EF4444'}} onPress={() => selectColor(1)}/>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[2], backgroundColor: '#FF8328'}} onPress={() => selectColor(2)}/>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[3], backgroundColor: '#10B981'}} onPress={() => selectColor(3)}/>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[4], backgroundColor: '#48A7FF'}} onPress={() => selectColor(4)}/>
      <TouchableOpacity style={{...styles.colorButton, borderWidth: borderWidth[5], backgroundColor: '#6F00FD'}} onPress={() => selectColor(5)}/>
    </View>
  )
}

const styles = StyleSheet.create({

    headerText: {
      fontFamily: 'Manrope_400Regular',
      color: '#64748B',
      fontSize: 15,
      marginBottom: height*0.005,
      alignSelf: 'center'
    },

    container: {
      minWidth: width*0.9,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },

    colorButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      marginLeft: 10,
      borderColor: 'black'
    }

});

export default ColorPalette