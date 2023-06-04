import { Image,Text } from "react-native";
import { View } from "react-native-web";





export default function LogoTitle() {
    return (
    <>
        <Text>
            {"<"}
        </Text>
        <Image
          style={{ width: 35, height: 40, marginLeft:10 }}
          source={require('../Images/Logo.png')}
        />
       
        
    </>
    );
  }