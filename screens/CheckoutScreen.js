import { StyleSheet, Text, View, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {useState, useContext} from 'react'
import Button from '../components/ui/Button'
import Input from '../components/Auth/Input'
//import DatePicker from 'react-native-datepicker';

const CheckoutScreen = ( {navigation,route}) => {

    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [bAddress, setBAddress] = useState('')
    const [sAddress, setSAddress] = useState('')
    const [cardNumber, setCardNum] = useState(0)
    const [cardExpiryDate, setCardExpiryDate] = useState('')
    const [cardCVV, setCardCVV] = useState(0)
    const [birthdate, setBirthDate] = useState();

    const placeOrder = () => {
        console.log("Order Place")
        if (name == ''){            
            alert("Name Cannot be Empty")
            return
        }else if (number == ''){
            alert("Number Cannot be Empty")
            return
        }else if (bAddress == ''){
            alert("Billing Address Cannot be Empty")
            return
        }else if (sAddress == ''){
            alert("Shipping Address Cannot be Empty")
            return
        }else if (cardNumber == '' || cardNumber.length < 16){
            console.log("Card")
            alert("Credit Card Number must be 16 Digits")
            return
        }else if(cardExpiryDate == '') {
            console.log("Card")
        }else if(cardCVV == '' || cardCVV.length < 3){
            alert("CVV Number must be 3 Digits")
            return
        }else{
            alert("Order Placed Successfully")
            navigation.navigate("Welcome")
            return
        }
    }

    return(
        <View>
            <Text>Contact Details</Text>

            <TextInput
                style={styles.inputStyle}
                onChangeText={setName}
                value={name}
                maxLength={15}
                placeholder='Enter Your Name'            
            />

            <TextInput
                style={styles.inputStyle}
                onChangeText={setNumber}
                keyboardType={'numeric'}
                value={number}
                maxLength={10}
                placeholder='Enter Contact Number'            
            />

            <TextInput
                style={styles.inputStyle}
                onChangeText={setBAddress}
                value={bAddress}
                maxLength={20}
                placeholder='Enter Billing Address'            
            />

            <TextInput
                style={styles.inputStyle}
                onChangeText={setSAddress}
                value={sAddress}
                maxLength={20}
                placeholder='Enter Shipping Address'            
            />
            <Text></Text>
            <Text>Card Details</Text>

            <TextInput
                style={styles.inputStyle}
                onChangeText={setCardNum}
                keyboardType={'numeric'}
                value={cardNumber}
                maxLength={16}
                placeholder='Enter Card Number'            
            />

            <TextInput
                style={styles.inputStyle}
                onChangeText={setCardExpiryDate}
                keyboardType={'numeric'}
                value={cardExpiryDate}
                maxLength={4}
                placeholder='MMYY'            
            />

            {/* <DatePicker
                onDateChange = { (dob) => {setBirthDate(dob);}}
                date = {birthdate}
                placeholder = "select date"
                format="DD/MM/YYYY"
                mode="date"
                minDate="01-01-1900"
                maxDate="31-12-2002"
                confirmBtnText="Select"
                cancelBtnText="Leave It"
                customStyles={ {
                    dateIcon: {
                        position: 'absolute',
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                    },
                    placeholderText:{
                        fontSize: 18,
                        color: 'gray',
                    },
                    dateText:{
                        fontSize: 18,
                        color: 'red',
                    },
                    dateInput:{
                        borderColor: 'red',
                        alignItems: 'flex-start'
                    }
                } }
            /> */}

            <TextInput
                style={styles.inputStyle}
                onChangeText={setCardCVV}
                keyboardType={'numeric'}
                value={cardCVV}
                secureTextEntry={true}
                maxLength={3}
                placeholder='CVV'            
            />

            <Button onPress={placeOrder}>Place Order</Button>

        </View>
    )
}

export default CheckoutScreen

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
    btext_style:{
        fontWeight: 'bold'
    },
    emailContainer:{
        // marginBottom:20,
    }
});