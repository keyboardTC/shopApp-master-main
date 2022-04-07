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
      // getCartAstorage()
      console.log("CONTEXT FILE = > "+cartCtx.items)
    },[cartCtx.items, navigation])

    const backBtnHandler = () =>{
        //navigation.goBack();
        navigation.navigate("Checkout")
    }
    const saveCartBtnHandler = async () =>{
        // let value = cartItems
        // storeCart(cartItems)
        console.log("saving context file = > "+cartCtx.items)
        removeDataAstorage();
        for (const item of cartCtx.items) {
          console.log(`${item}`);
          await storeCartAstorage(item);
        }

        // console.log("cart context "+cartCx.items);
        // removeDataAstorage();
        getCartAstorage()
    }

    // Get Products from AsyncStorage cart 
    const getCartAstorage = async () => {
      try {
        const data = await AsyncStorage.getItem(KEY);
        console.log(`data from AsyncStorage ${data}`);
        if(data !== null) {
          cartCtx.items = [],
          console.log("what is happening here =====>");
          // cartCtx.items = [];
          cartCtx.items = JSON.parse(data);
          // cartCtx.addItem(JSON.parse(data));
        }else{
          console.log("NOTHING IN Async =====")
        }
      } catch(e) {
          console.error(e);
      }
    }

    const removeDataAstorage = async () => {
      await AsyncStorage.removeItem(KEY);
    }
    const storeCartAstorage = async (product) => {
      let cartPrutoductList = [];
      try {
        if (KEY in AsyncStorage) {
          // const destinationList = JSON.parse(AsyncStorage.getItem(KEY));
          // var indexOfObject = destinationList.findIndex(elem => elem.Id === product.Id);
  
      
            //Add new Product to Existing my_cart in local storage
            for (const item of cartCtx.items) {
              console.log(`${item}`);
              cartPrutoductList.push(item);
            }


          AsyncStorage.setItem(KEY, JSON.stringify(cartPrutoductList));
          
        }else{
          for (const item of cartCtx.items) {
            console.log(`${item}`);
            cartPrutoductList.push(item);
          }
          AsyncStorage.setItem(KEY, JSON.stringify(cartPrutoductList));
        }
      } catch (e) {
        console.log('Eror saving cart '+e);
      }
    }


  return (
    <View>
        <View>
            <CartItem/>
        </View>
      <View style={styles.btnContainer}>
        <Button onPress={saveCartBtnHandler}>save cart</Button>
        <Button onPress={backBtnHandler}>checkout</Button>
      </View>
    </View>
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