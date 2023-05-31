import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubmitButton from '../Components/SubmitButton'
import SingleLineInput from '../Components/SingleLineInput'
import { SafeAreaView } from 'react-native'

export default function Master() {
  return (
    <SafeAreaView style={styles.container}>
        <SubmitButton buttonText={'Weiter'} onPress={() => console.log('Hello World!')}/>
        <SingleLineInput/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

})