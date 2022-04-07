import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Auth/firebase/firebase_config';
import { useState, useContext, useEffect  } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../context/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { addUser } from '../components/Auth/firebase/Crud';
 
const getLocation = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission not granted",
      "Allow the app to use location service",
      [{ text: "ok"}],
      { cancelable: false }
    )
  }

  const { coords } = await Location.getCurrentPositionAsync(); // is to get current position coords. - lat long position details
  const response = await Location.reverseGeocodeAsync({
      latitude:coords.latitude,
      longitude:coords.longitude,
    });
  
  const cityName = response[0].city || response[0].region || 'unnamed';
  return cityName;
};


function SignupScreen() {
  const [isloaded, setIsloaded] = useState(false);
  const [cityName, setCityName] = useState('');
  const authCtx = useContext(AuthContext);
  let userID = "";


  const signupHandler = async ({name, email, password, phoneNum, address}) => {

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
    
    console.log("User ID set === >"+userID+", Name "+name+", Email "+email+", phoneNum "+phoneNum+", address "+address);
    const newUser = {
      uid: userID,
      name: name,
      email: email,
      phoneNum: phoneNum,
      address: address
    }
    await addUser({...newUser});

    setIsloaded(false);

    console.log("Validation works")
  }

  useEffect(() => {
    getLocation().then(k => setCityName(k));
  }, []);

  if (isloaded) {
    console.log("Creating Account");
    return <LoadingOverlay message='Loading...'/>
  }
   
  return cityName !== '' && <AuthContent onAuthenticate={signupHandler} cityName={cityName} />;
}

export default SignupScreen;
