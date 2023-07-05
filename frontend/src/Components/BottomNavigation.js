import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Manrope_400Regular} from '@expo-google-fonts/manrope';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = (props) => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Manrope_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("AccountScreen")}>
                <MaterialCommunityIcons style={styles.arrowIcon} name='account' color={props.buttonColors[0]} size={40}/>
                <Text style={styles.iconButtonText}>Konto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("InboxScreen")}>
                <MaterialCommunityIcons style={styles.arrowIcon} name='inbox' color={props.buttonColors[1]} size={40}/>
                <Text style={styles.iconButtonText}>Inbox</Text>             
            </TouchableOpacity>

            <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate("CreateQuestionaire")}>
                <LinearGradient colors={['#AF3139', '#72479C']} start={[0, 0]} end={[0, 1]} style={styles.linearGradient}>
                    <MaterialCommunityIcons style={styles.arrowIcon} name='plus' color={'white'} size={70}/>
                </LinearGradient>              
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("CalendarScreen")}>
                <MaterialCommunityIcons style={styles.arrowIcon} name='calendar' color={props.buttonColors[2]} size={40}/>
                <Text style={styles.iconButtonText}>Kalender</Text>                
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("StatisticsScreen")}>
                <MaterialCommunityIcons style={styles.arrowIcon} name='poll' color={props.buttonColors[3]} size={40}/>
                <Text style={styles.iconButtonText}>Statistik</Text>
            </TouchableOpacity>
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width*1,
        height: width*0.25,
        backgroundColor: 'rgba(111, 111, 112, 0.12)',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    iconButton: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15, 
        height: 50,
        width: 75
    },

    plusButton: {
        alignSelf: 'center',
        marginBottom: 20

    },

    linearGradient: {
        height: 70,
        width: 70,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    iconButtonText: {
        fontFamily: 'Manrope_400Regular'
    }
});

export default BottomNavigation;