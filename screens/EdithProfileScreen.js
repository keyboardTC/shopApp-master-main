import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {useState, useContext} from 'react'
import { AuthContext } from '../context/auth-context';
import Button from '../components/ui/Button'
import { editUser } from '../components/Auth/firebase/Crud';

const EdithProfileScreen = ({navigation, route}) => {
    const {email} = route.params.user;
    const {address} = route.params.user;
    const {phoneNum} = route.params.user;
    const {uid} = route.params.user;
    const [phoneValue, setPhoneValue] = useState(phoneNum); 
    const [addressValue, setAddressValue] = useState(address); 
    const authCtx = useContext(AuthContext);

    function phoneUpdateValue(value) {
        setPhoneValue(value)
    }
    function addressUpdateValue(value) {
        setAddressValue(value)
    }
    // function saveBtnHandler(value) {
    //     console.log("email => "+email)
    //     console.log("phoneNum => "+phoneNum)
    //     //await editUser(email,phoneNum, uid)
    // }
    const saveBtnHandler = async () => {
        console.log("Email => "+addressValue)
        console.log("PhoneNum => "+phoneValue)
        await editUser(addressValue, phoneValue, uid)
        authCtx.toggleChange()
    }
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.heading}>Enter New Info Details</Text>
        <View style={styles.emailContainer}>
            <Text style={styles.btext_style}>
                Phone Number
            </Text> 
            <TextInput style={styles.inputStyle}
                keyboardType={'numeric'}
                onChangeText={phoneUpdateValue}
                value={phoneValue}
                maxLength={10}
                placeholder='Enter New Phone Number'
            />
        </View>
        <View>
            <Text style={styles.btext_style}>
                Address 
            </Text> 
            <TextInput style={styles.inputStyle}
                onChangeText={addressUpdateValue}
                value={addressValue}
                placeholder='Enter New Address' 
            />
        </View>
        <Button onPress={saveBtnHandler}>save</Button>
    </View>
  )
}

export default EdithProfileScreen

const styles = StyleSheet.create({
    inputStyle: {
        height: 40,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#c1016b',
        marginVertical: 6,
        borderRadius: 18,
        paddingHorizontal: 18,
        color:'#72063c',
        fontWeight: 'bold',
        justifyContent:'space-between',
    },
    inputContainer: {
        // paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical:100,
        marginHorizontal:25,
        alignContent:'center',
        justifyContent:'space-around',
        backgroundColor:'#fce8f6',
        elevation: 14,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0, height: 20},
        shadowRadius:8,
        height:400,
      },
    heading:{
        fontSize: 18,
        fontWeight:"bold",
    },  
    btext_style:{
        fontWeight: 'bold'
    },
    emailContainer:{
        // marginBottom:20,
    }
})