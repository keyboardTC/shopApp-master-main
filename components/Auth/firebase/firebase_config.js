import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDzm09rEeeu49d6jwgxaZN20IUdyNkJoE",
  authDomain: "rn-shopapp-b72ba.firebaseapp.com",
  projectId: "rn-shopapp-b72ba",
  storageBucket: "rn-shopapp-b72ba.appspot.com",
  messagingSenderId: "584992139071",
  appId: "1:584992139071:web:5ca15b4daf39f84218158a"   
};
  
//   Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);