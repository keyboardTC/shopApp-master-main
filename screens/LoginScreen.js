import { useState, useContext  } from 'react';
import { Alert } from 'react-native';
import { auth } from '../components/Auth/firebase/firebase_config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../context/auth-context';
import { CartContext } from '../context/cart-context';

function LoginScreen() {
  const [isloaded, setIsloaded] = useState(false);
  const authCtx = useContext(AuthContext);
  // const cartCtx = useContext(CartContext);
  // const cartItems = cartCtx.items

  const signInHandler = async ({email, password}) => {
    setIsloaded(true)
   await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      authCtx.authenticate(userCredential._tokenResponse.idToken, userCredential.user.uid);
      console.log("===================");
      console.log(` =====> ${userCredential.user.uid}`);

      getCartAstorage(userCredential.user.uid)
    })
    .catch((res)=>{
      Alert.alert('Authentification Failed, Please check your credentials')
      return
    })
    setIsloaded(false);
  }

  const getCartAstorage = async (uid) => {
    const KEY = 'cart-'+uid;
    try {
      const data = await AsyncStorage.getItem(KEY);
      console.log(`data from AsyncStorage ${data}`);
      if(data !== null) {
        // cartCtx.items = [],
        console.log("login screen re-rendered =====>");
        // cartCtx.items = [];
        // cartCtx.items = JSON.parse(data);
        // cartCtx.addItem(JSON.parse(data));
      }else{
        console.log("NOTHING IN Async =====")
      }
    } catch(e) {
        console.error(e);
    }
  }

  if (isloaded) {
    console.log("Logging laoctions are loading");
    return <LoadingOverlay message='Loading...'/>
  }
  
  return <AuthContent isLogin signInHandler={signInHandler} />;
}

export default LoginScreen;
