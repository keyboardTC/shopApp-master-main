import { StyleSheet, Text, View } from 'react-native'
import {useState, useContext} from 'react'

const PriceSummary = () => {
    


  return (
    <View style={styles.mainContainer}>
        <View style={styles.sectionContainer}>
            <Text>Total:</Text>
            <Text>$ 50</Text>
        </View>
        <View style={styles.sectionContainer}>
            <Text>Discount</Text>
            <Text>- $ 10</Text>
        </View>
        <View style={styles.sectionContainer}>
            <Text>Tax</Text>
            <Text>$ 10</Text>
        </View>
        <View style={[styles.sectionContainer, styles.finalPriceContainer]}>
            <Text>Final Total:</Text>
            <Text>$ 30</Text>
        </View>
    </View>
  )
}

export default PriceSummary

const styles = StyleSheet.create({
    mainContainer:{
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
    }
})