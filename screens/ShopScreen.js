import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ItemsContext } from '../context/items-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

function ShopScreen({navigation, route}) {

  const [isloaded, setIsloaded] = useState(false);
  const ItemsArr = useContext(ItemsContext);

  useEffect(() => {
    // Make Api call
    (async () =>{
      const apiURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json"
      console.log(apiURL)
      setIsloaded(true);
      await fetch(apiURL)
      .then( (response) => response.json().then( (json) => { 
        ItemsArr.items = json;
        console.log("Items context => "+ItemsArr.items.length);
      }) 
      .catch( (error) => {console.error(error); })
      )
      setIsloaded(false);
    })();
  }, [ItemsArr, navigation]);

  if (isloaded) {
    console.log("locations are loading");
    return <LoadingOverlay message='Loading...'/>
  }

  const renderItem = ({ item }) => (
    
    <Pressable onPress={()=>{
      console.log("ID to be sent "+item.Id)
      navigation.navigate('ItemDetails', {itemId: item.Id})
    }}>
      <View style={styles.listItem}>
        {/* <Text style = {styles.title}>Category: {item.Category}</Text>  */}
        <Text>Flat List {item.Id}</Text>
        <Text>{item.Title}</Text>
        <Image style={styles.imgMenu} source = { {uri: item.Image} }/>
      </View>
    </Pressable>

  );


  return (
    <View style={styles.rootContainer} >
  
      <FlatList
        data= {ItemsArr.items}
        keyExtractor = { (item) => {return item.Id}}
        renderItem = { renderItem }
      /> 

    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width:'100%'
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width:'100%',
    borderColor: '#915f6d',
    borderWidth:10,
  },
  imgMenu: {
    width: '100%',
    height: 150,
    padding: 10,
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});


export default ShopScreen;

