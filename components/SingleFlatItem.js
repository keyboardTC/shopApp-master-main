import { StyleSheet, Text, View, Image } from 'react-native'
import {useState, useContext, useEffect} from 'react'
import IconButton from './ui/IconButton';
import Button from './ui/Button';
import { CartContext } from '../context/cart-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth-context';

const SingleFlatItem = ({item, calSubTotal, setTotal, deleteItemHandler, setEmptyCart, emptyCart}) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const KEY = 'cart-'+authCtx.uid;
    // const itemInCart = cartCtx.items.find(cartItem => cartItem.Id == item.Id);
    const itemInCartIndex = cartCtx.items.findIndex(cartItem => cartItem.Id == item.Id);
    let [itemQuantity, setItemQuantity] = useState(item.Available);

    function calculatePrice() {
      var total = cartCtx.items.reduce(function (sum, {Price, Available}) {
        return sum + (Price*Available);
      }, 0);
      console.log("**** Total is ===== > "+total);
      setTotal(total);
      calSubTotal(total);
      return total
    }

    useEffect(() => {
      (async () =>{ 
        if (calculatePrice() == 0 || calculatePrice() == 0.00) {
          setEmptyCart(false);
        }else{
          setEmptyCart(true);
        }
      })();
    }, [cartCtx]);

    const addHandler = ()=>{
        setItemQuantity(()=>{
          if (itemQuantity >= item.Available) {
            return item.Available;
          }else{
            ++cartCtx.items[itemInCartIndex].Available 
            cartCtx.toggleChange
            calculatePrice()
            return ++itemQuantity
          }
        });
      }
    const reduceHandler = ()=>{
        setItemQuantity(()=>{
          if (itemQuantity <= 1) {
            return 1;
          }else{
            --cartCtx.items[itemInCartIndex].Available 
            cartCtx.toggleChange
            calculatePrice()
            return --itemQuantity
          }
        });
    }

    function mydeleteItemHandler() {
      // cartCtx.items.splice(itemInCartIndex,1);
      deleteItemHandler(itemInCartIndex)
      // removeProduct(item);
      cartCtx.toggleChange()
      calculatePrice() 
      // setItemQuantity(0)
    }
    
    // ==== Updating product in local storage ===============
    function updatLocalProdAstorage(item) {
      
      if (KEY in AsyncStorage) {
          const productList = JSON.parse(AsyncStorage.getItem(KEY));
          var indexOfObject = productList.findIndex(elem => elem.Id === item.Id);
      
        // if (isExist)
          if (indexOfObject !== -1){
            var objectToUpdate = destinationList[indexOfObject];
            objectToUpdate.Available += 1;
            destinationList[indexOfObject] =  objectToUpdate;
          }else{
            //Add new Product to Existing my_cart in local storage
            console.error(`Product Does not exist`);
          }
          AsyncStorage.setItem(KEY, JSON.stringify(productList));
          cartCtx.items = JSON.parse(AsyncStorage.getItem(KEY));
      }else{
          console.error(`Key ${KEY} Does not exist`);
      }
    }

    // ===== Get Products from AsyncStorage cart ==
    // async function getCartProductsAstorage() {
    //   let cart;
    //   try {
    //     const data = await AsyncStorage.getItem(KEY);
    //     console.log(`data from AsyncStorage ${data}`);
    //     if(data !== null) {
    //       // cartCtx.items = [],
    //       console.log("what is happening here =====");

    //       cart = data
    //       // cartCtx.addItem(JSON.parse(data));
    //     }else{
    //       console.log("NOTHING IN Async =====")
    //     }
    //   } catch(e) {
    //       console.error(e);
    //   }
    //   return cart;
    // }

    function removeProductAstorage(item) {
      const productL = getCartProductsAstorage();
      if (productL) {
        productL.forEach((product, index) => {
          if (product.Id === item.Id) {
              productL.splice(index, 1);
          }
          AsyncStorage.setItem(KEY, JSON.stringify(productL));
          // update your context array or re-render
        })
      }
    }

  return (
    <View style={styles.flatListContainer}>
        <View style={styles.itemdetail}>
            <View style={styles.imgContainer}>
                <Image style={styles.imgContainer} source = { {uri: item.Image} }/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{item.Title}</Text>
                <Text style={styles.titleText}>$ {item.Price}</Text>
            </View>            
        </View>
        <View style={styles.quantityContainer}>
            <Button onPress={reduceHandler}>-</Button>
            <Text>{itemQuantity}</Text>
            <Button onPress={addHandler}>+</Button>
            <IconButton 
              icon="trash"
              color='red'
              size={24}
                onPress={mydeleteItemHandler}
            />
        </View>
    </View>
  )
}

export default SingleFlatItem

const styles = StyleSheet.create({
    flatListContainer:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        borderWidth:5,
        borderColor:'#915f6d',
    },
    quantityContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'#ccc',
        width:140,
    },
    imgContainer:{
        backgroundColor:'blue',
        height:60,
        width:80,
        borderColor:'black',
        
    },
    titleContainer:{
        // backgroundColor:'orange',
        marginHorizontal:10,
        width:120,
        elevation: 50,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0, height: 20},
        shadowRadius:8,

    },
    itemdetail:{
        flexDirection:'row',
    },
    titleText:{
      fontWeight: 'bold',
      fontSize:18,
    }
})