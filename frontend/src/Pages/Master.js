import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubmitButton from '../Components/SubmitButton'

export default function Master() {
  return (
    <View style={styles.container}>
      <SubmitButton buttonText={'Weiter'} onPress={() => console.log('Hello World!')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})