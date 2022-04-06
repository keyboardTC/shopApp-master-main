import { StyleSheet, ScrollView, View, Image, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { CartContext } from '../context/cart-context';
import { AuthContext } from '../context/auth-context';
import { addItem } from '../components/Auth/firebase/Crud';
import CartItem from '../components/cartItem';
import Button from '../components/ui/Button'



const CartScreen = ({navigation, route}) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const KEY = 'cart-'+authCtx.uid;
    const cartItems = cartCtx.items

    useEffect ( () => {
      // getCart()
      removeData();
      console.log("CONTEXT FILE = > "+cartCtx.items)
    },[cartCtx.items, navigation])

    const backBtnHandler = () =>{
        //navigation.goBack();
        navigation.navigate("Checkout")
    }
    const saveCartBtnHandler = () =>{
        // let value = cartItems
        // storeCart(cartItems)
        // navigation.goBack();
    }


    const getCart = async () => {
      try {
        const data = await AsyncStorage.getItem(KEY);
        console.log(`data from AsyncStorage ${data}`);
        if(data !== null) {
          // cartCtx.items = [],
          console.log("what is happening here =====");

          cartCtx.items = JSON.parse(data);
          // cartCtx.addItem(JSON.parse(data));
        }else{
          console.log("NOTHING IN Async =====")
        }
      } catch(e) {
          console.error(e);
      }
    }
    const removeData = async () => {
      await AsyncStorage.removeItem(KEY);
    }


  return (
    <ScrollView>
        <View>
            <CartItem/>
        </View>
      {/* <PriceSummary/> */}
      <View style={styles.btnContainer}>
        <Button onPress={saveCartBtnHandler}>save cart</Button>
        <Button onPress={backBtnHandler}>checkout</Button>
      </View>
    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  btnContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    // height:150,
    padding:30,
  },
})