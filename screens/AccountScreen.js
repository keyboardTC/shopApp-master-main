import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import Button from '../components/ui/Button';
import { getUser } from '../components/Auth/firebase/Crud';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { deleteUser } from '../components/Auth/firebase/Crud';

const AccountScreen = ({navigation, route}) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect ( () => {
    (async () =>{
      const fetchUser = await getUser(authCtx.uid)
      setUser(fetchUser);
    })();
  },[authCtx, navigation]);

  if (!user) {
    console.log("locations are loading");
    return <LoadingOverlay message='Loading...'/>
  }
console.log(`user = > ${user.address}`)
  const editProfileHandler = () =>{
    navigation.navigate('EditeProfile',{user:user});
  }

  const deleteProfileHandler = async () => {
      console.log("Delete Button Clicked")
      console.log(user.uid)
      await deleteUser(user.uid)
      //need to navigate to Login Screen Pending
      //navigation.navigate("Login")  
  }

  return (
    <>
      <View style={styles.mainContainer}>
          <View style={styles.imgContainer}>
            <Image/>
          </View>
          <View>
            <View>
              <Text style={styles.text}>{user.name}</Text>
            </View>
            <View>
              <Text style={styles.text}>{user.address}</Text>
            </View>
            <View>
              <Text style={styles.text}>{user.email}</Text>
            </View>
            <View>
              <Text style={styles.text}>{user.phoneNum}</Text>
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
    padding:50,
    margin:30,
    justifyContent:'flex-start'
  },
  imgContainer:{
    height:80,
    width:100,
    backgroundColor:'yellow',
    marginRight:20,
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
    fontSize:20,
    margin:10
  }
})