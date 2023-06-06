import { StatusBar } from "expo-status-bar";
import { Image,Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import { StyleSheet, View } from "react-native";


export default function LogoTitle(probs) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>
            {"<"}
        </Text>
        <Image
          style={{ width: 35, height: 40, marginLeft:10 }}
          source={require('../Images/Logo.png')}
        />
      </View>
      <View>
        <ProgressBar style={styles.statusBar} progress={probs.progress} color={'#6171A9'}/>
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  statusBar: {
    width: '90%',
    marginTop: 2,
    backgroundColor: '#E3E5E6',
    borderRadius: '100%'
  }

})
