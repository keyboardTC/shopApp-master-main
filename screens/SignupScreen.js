import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Auth/firebase/firebase_config';
import { useState, useContext  } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../context/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { addUser } from '../components/Auth/firebase/Crud';

function SignupScreen() {
  const [isloaded, setIsloaded] = useState(false);
  const authCtx = useContext(AuthContext);
  let userID = "";


  const signupHandler = async ({email, password, phoneNum, address}) => {

    setIsloaded(true);
   await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      authCtx.authenticate(userCredential._tokenResponse.idToken, userCredential.user.uid);
      console.log("=================== uid : "+userCredential.user.uid)
      console.log(userCredential._tokenResponse.idToken);
      console.log(userCredential);
      console.log("User auth context ID === >"+authCtx.uid);
      userID = userCredential.user.uid
    })
    .catch((res)=>{
      Alert.alert('Authentification Failed, Please check your credentials')
      return
    })
    
    console.log("User ID set === >"+userID+",Email "+email+",phoneNum "+phoneNum+",address "+address);
    const newUser = {
      uid: userID,
      email: email,
      phoneNum: phoneNum,
      address: address
    }
    await addUser({...newUser});

    setIsloaded(false);

    console.log("Validation works")
  }

  if (isloaded) {
    console.log("Creating Account");
    return <LoadingOverlay message='Loading...'/>
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
