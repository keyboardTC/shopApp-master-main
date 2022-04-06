import { StyleSheet, Text, View, Image } from 'react-native'
import {useState, useContext, useEffect} from 'react'
import IconButton from './ui/IconButton';
import Button from './ui/Button';
import { CartContext } from '../context/cart-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth-context';

const SingleFlatItem = ({item, calSubTotal, setTotal, deleteItemHandler}) => {
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
    }

    useEffect(() => {
      // DidLoad
      (async () =>{  
        calculatePrice()
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
            updatLocalProds(item);
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
            updatLocalProds(item);
            return --itemQuantity
          }
        });
    }

      // ==== Updating product in local storage ===============
    function updatLocalProds(item) {
      
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


    function mydeleteItemHandler() {
      // cartCtx.items.splice(itemInCartIndex,1);
      deleteItemHandler(itemInCartIndex)
      // removeProduct(item);
      cartCtx.toggleChange()
      calculatePrice() 
      // setItemQuantity(0)
    }

    // ===== Get Products from AsyncStorage cart ==
    async function getCartProducts() {
      let cart;
      try {
        const data = await AsyncStorage.getItem(KEY);
        console.log(`data from AsyncStorage ${data}`);
        if(data !== null) {
          // cartCtx.items = [],
          console.log("what is happening here =====");

          cart = data
          // cartCtx.addItem(JSON.parse(data));
        }else{
          console.log("NOTHING IN Async =====")
        }
      } catch(e) {
          console.error(e);
      }
      return cart;
    }
    function removeProduct(item) {
      const productL = getCartProducts();
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
                <Text>{item.Title}</Text>
                <Text>{item.Price}</Text>
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
    },
    quantityContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#ccc',
        width:140,
        // marginHorizontal:10,
    },
    imgContainer:{
        backgroundColor:'blue',
        height:60,
        width:80,
        borderColor:'black',
    },
    titleContainer:{
        backgroundColor:'orange',
        marginHorizontal:10,
        width:120,
    },
    itemdetail:{
        flexDirection:'row',
        
    }
})