import { StyleSheet, Text, View, Image } from 'react-native'
import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { ItemsContext } from '../context/items-context';
import Button from '../components/ui/Button';
import { CartContext } from '../context/cart-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth-context';

const ItemDetailsScreen = ({navigation, route}) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const KEY = 'cart-'+authCtx.uid;
  const id = route.params.itemId;
  console.log("ID SENT TO DETAILS : "+id);
  const ITEMS = useContext(ItemsContext);
  const allItems = ITEMS.items
  const itemSelected = allItems.find(item => item.Id == id);
  const itemInCart = cartCtx.items.find(item => item.Id == itemSelected.Id);
  const itemInCartIndex = cartCtx.items.findIndex(item => item.Id == itemSelected.Id);
  let [itemQuantity, setItemQuantity] = useState(Number(itemSelected.Available));
  let cartPrutoductList = new Array();

  useLayoutEffect(() => {
    navigation.setOptions({
        title: `${itemSelected.Title}`,
    });
  }, [navigation])


  // Add to cart handler and checking if item quantity is less than 1
  const addHandler = ()=>{
    console.log("=== ITEM IN CART =? "+itemInCart)
    setItemQuantity(()=>{
      if (itemQuantity < 1) {
        return 0;
      }else{
        if (itemInCart) {
          console.log("in cart index "+itemInCartIndex)
          ++cartCtx.items[itemInCartIndex].Available 
        }else{
          console.log("ADDED TO CART");
          cartCtx.items.push(itemSelected)
        }
        storeCart(itemInCart)
        console.log("Cart Items : "+cartCtx.items)
        return --itemQuantity
      }
    });
  }

  const storeCart = async (product) => {
    try {
      if (KEY in AsyncStorage) {
        const destinationList = JSON.parse(AsyncStorage.getItem(KEY));
        var indexOfObject = destinationList.findIndex(elem => elem.Id === product.Id);
    
      // if (isExist)
        if (indexOfObject !== -1){
    
          var objectToUpdate = destinationList[indexOfObject];
          objectToUpdate.Available += 1;
          destinationList[indexOfObject] =  objectToUpdate;
        }else{
          //Add new Product to Existing my_cart in local storage
          destinationList.push(product);
        }
        AsyncStorage.setItem(KEY, JSON.stringify(destinationList));
        
      }else{
        cartPrutoductList.push(product);
        AsyncStorage.setItem(KEY, JSON.stringify(cartPrutoductList));
      }
    } catch (e) {
      console.log('Eroor saving cart '+e);
    }
  }

  const continueHandler = ()=>{
    navigation.navigate("Welcome");
  }

  return (
    <View style={styles.itemContainer}>
        <Image style={styles.imgMenu} source = { {uri: itemSelected.Image} }/>
      <View style={styles.detailsContianer}>        
        {/* <Text style={styles.titleText}>Title: {itemSelected.Title}</Text> */}
        <Text style={styles.titleText}>Description</Text>
        <Text >{itemSelected.Description}</Text>
        <Text style={styles.titleText}>Category: {itemSelected.Category}</Text>
        <Text style={styles.titleText}>Available {itemSelected.Available}</Text>
        <Text style={styles.titleText}>Available {itemQuantity}</Text>
        <Text style={styles.titleText}>Ratings: {itemSelected.Ratings}</Text>
        <Text style={styles.titleText}>Price: $ {itemSelected.Price}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={continueHandler}>Continue</Button>
        <Button onPress={addHandler}>Add To Cart</Button>
      </View>
    </View>
  )
}

export default ItemDetailsScreen

const styles = StyleSheet.create({
  titleText: {
    fontSize:20,
    fontWeight:'bold',
  },
  itemContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  imgMenu: {
    width: '100%',
    height: 200,
    padding: 10,
    borderRadius: 1,
  },
  btnContainer: {
    flexDirection:'row',
    justifyContent:'space-around',
    // alignItems: 'center',
    margin:50,
    // backgroundColor: 'blue',
    height:35,
    width:300
  },
  detailsContianer:{
    paddingHorizontal: 20,
    // marginVertical:100,
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
  }
})