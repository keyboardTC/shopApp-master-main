import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import Button from '../components/ui/Button';
import { getUser } from '../components/Auth/firebase/Crud';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { deleteCurrentUser } from '../components/Auth/firebase/Crud';

const AccountScreen = ({navigation, route}) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect ( () => {
    (async () =>{
      const fetchUser = await getUser(authCtx.uid)
      setUser(fetchUser);
    })();
  },[authCtx, navigation]);

  // console.log(`user = > ${user.address}`)
  const editProfileHandler = () =>{
    navigation.navigate('EditeProfile',{user:user});
  }

  const deleteProfileHandler = async () => {
      console.log("Delete Button Clicked")
      console.log(user.uid)
      setUser(null);

      await deleteCurrentUser(user.uid)
      .then(
        authCtx.logout
      );
      setUser(fetchUser);
      //need to navigate to Login Screen Pending
      // navigation.navigate("Login")  
  }
  
  if (!user) {
    console.log("locations are loading");
    return <LoadingOverlay message='Loading...'/>
  }

  return (
    <>
      <View style={styles.mainContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.image}
            source={require('../assets/avatar.jpg')}/>
          </View>
          <View>
            <View>
              <Text style={styles.text}>Name: {user.name}</Text>
            </View>
            <View>
              <Text style={styles.text}>Email: {user.email}</Text>
            </View>
            <View>
              <Text style={styles.text}>Address: {user.address}</Text>
            </View>
            <View>
              <Text style={styles.text}>Contact No: {user.phoneNum}</Text>
            </View>
          </View>
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={editProfileHandler}>Edit profile</Button>
        <Button onPress={deleteProfileHandler}>Delete profile</Button>
      </View>
    </>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  mainContainer:{
    flexDirection:'row',
    backgroundColor:'#ccc',
    padding:25,
    margin:20,
    justifyContent:'flex-start'
  },
  imgContainer:{
    height:80,
    width:100,
    backgroundColor:'yellow',
    marginRight:5,
  },
  image:{
    marginRight:5,
    width: 100,
    height: 80,
  },
  btnContainer:{
    flexDirection:'row',
    padding:50,
    justifyContent:'space-between',
    height:138,
    width:'100%',
    // margin:30,
  },
  text:{
    fontSize:16,
    margin:5,
  }
})