import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {useState, useContext, useEffect} from 'react'
import { CartContext } from '../context/cart-context';
import SingleFlatItem from './SingleFlatItem';
import { useNavigation } from '@react-navigation/native';


const CartItem = () => {
    const cartCtx = useContext(CartContext);
    const [total, setTotal] = useState(0.0);
    const [emptyCart, setEmptyCart] = useState(false);
    const [discount, setDiscount] = useState(0.0);
    const [discountp, setDiscountp] = useState('');
    const [tax, setTax] = useState(0.0);
    const [finalTotal, setFinalTotal] = useState(0.0);

// ========= Doing the Prices calculation =========
    function calSubTotal(prods_total) { 
        let priceAfterDiscount = 0.00
        if (prods_total < 80) {
        let discount = 0.05;
        let discount_price_beforeTax = (prods_total*discount).toFixed(2);
            priceAfterDiscount = (prods_total-discount_price_beforeTax).toFixed(2);
            setDiscount(discount_price_beforeTax);
            setDiscountp('5%');
            console.log(`Total after Discount %5: ${discount_price_beforeTax}`) 
        }else if (prods_total >= 80 && prods_total < 100) {
        let discount = 0.2;
        let discount_price_beforeTax = (prods_total*discount).toFixed(2);
            priceAfterDiscount = (prods_total-discount_price_beforeTax).toFixed(2);
            setDiscount(discount_price_beforeTax);
            setDiscountp('20%');
            console.log(`Total after Discount %20: ${discount_price_beforeTax}`) 
        } else if (prods_total >= 100) {
        let discount = 0.3;
        let discount_price_beforeTax = (prods_total*discount).toFixed(2);
            priceAfterDiscount = (prods_total-discount_price_beforeTax).toFixed(2);
            setDiscount(discount_price_beforeTax);
            setDiscountp('30%');
            console.log(`Total after Discount 150: ${discount_price_beforeTax}`) 
        }  

    let taxPrice = (Number(priceAfterDiscount)*0.13).toFixed(2);
    setTax(taxPrice);
    let finalPrice = (Number(priceAfterDiscount)+Number(taxPrice)).toFixed(2);
    setFinalTotal(finalPrice);
    }  
    
    function deleteItemHandler(itemInCartIndex) {
        cartCtx.deleteItem(itemInCartIndex)
    }

    const renderItem = ({ item }) => {
        
          console.log("==== moving to single item component ===== ")
        return (
            <SingleFlatItem item={item} calSubTotal={calSubTotal} setTotal={setTotal} deleteItemHandler={deleteItemHandler} setEmptyCart={setEmptyCart} emptyCart={emptyCart} />
        )
    };

  return (
    <>
        <View style={[styles.mainContainer, !emptyCart && styles.mainEmpty]}>
            <FlatList
                data= {cartCtx.items}
                keyExtractor = { (item) => {return item.Id}}
                renderItem = { renderItem }
                // extraData = {cartCtx.items}
            />
            {!emptyCart && <Text style={styles.emptyCartText}>EMPTY CART</Text>}

        </View>
        <View style={styles.smainContainer}>
            <View style={styles.sectionContainer}>
                <Text>Total:</Text>
                <Text>$ {total}</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text>Discount ({discountp})</Text>
                <Text>- $ {discount}</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text>Tax</Text>
                <Text>$ {tax}</Text>
            </View>
            <View style={[styles.sectionContainer, styles.finalPriceContainer]}>
                <Text>Final Total:</Text>
                <Text>$ {finalTotal}</Text>
            </View>
        </View>            
    </>

  )
}

export default CartItem

const styles = StyleSheet.create({
    mainEmpty:{
        paddingHorizontal:20,
        marginVertical:20,
        backgroundColor:'#ccc',
        height:100,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    mainContainer:{
        flexDirection:'row',
        // borderBottomWidth:10,
        // borderTopWidth:10,
        borderColor:'green',
        paddingHorizontal:20,
        marginVertical:20,
        backgroundColor:'#ccc',
        height:380,
    },
    smainContainer:{
        margin:20,
        padding:20,
        justifyContent:'space-around',
        alignContent: 'space-around',
        backgroundColor:'#ccc',
    },
    sectionContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        marginVertical:3,
    },
    finalPriceContainer:{
        marginTop:15,
        paddingTop:10,
        borderTopColor:'black',
        borderTopWidth:2,
    },
    emptyCartText:{
        fontSize: 30,
        fontWeight:'bold',
    }
});