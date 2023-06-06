import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import {React} from 'react'

const { width, height } = Dimensions.get("window");

const SingleLineInput = () => {

  return (
    <View>
      <TextInput style={styles.textInput}/>
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
        borderColor: '#E3E5E5',
        fontSize: 16,
        paddingLeft: 16,
    }
});

export default SingleLineInput