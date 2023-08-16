import { StatusBar } from "expo-status-bar";
import { Image,Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export default function LogoTitle(probs) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <MaterialCommunityIcons name='chevron-left' color={'black'} size={20} onPress={() => goBack()}/>        
      <Image
          style={{width:30.5, height: 35 }}
          source={require('../Images/Logo.png')}
      />
      </View>
      <View>
        <ProgressBar style={styles.statusBar} progress={probs.progress} indeterminate={false}  color={'#6171A9'}/>
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
