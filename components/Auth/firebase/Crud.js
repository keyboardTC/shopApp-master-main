import { db } from "./firebase_config";
import { doc, updateDoc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import Item from "../../../model/Item";
import User from "../../../model/User";
import { auth } from "./firebase_config";



// Firestore User converter
const userConverter = {
    toFirestore: (user) => {
        return {
            uid : user.uid,
            name: user.name,
            email : user.email,
            phoneNum : user.phoneNum,
            address : user.address
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.uid, data.name, data.email, data.phoneNum, data.address);
    }
};

// Firestore Iterm converter
const itemConverter = {
    toFirestore: (item) => {
        return {
            Id : item.Id,
            Title :  item.Title,
            Description :  item.Description,
            Image :  item.Image,
            Ratings : item.Ratings,
            Price :  item.Price,
            Available :  item.Available,
            Category : item.Category
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Item(data.Id, data.Title, data.Description, data.Image, data.Ratings, data.Price, data.Available, data.Category);
    }
};

// export const addItem = async (uid, item) => {
//     console.log(`${uid}  ====== ${item.Available}`)
//     const docData = {
//         Id : item.Id,
//         Title :  item.Title,
//         Description :  item.Description,
//         Image :  item.Image,
//         Ratings : item.Ratings,
//         Price :  item.Price,
//         Available :  item.Available,
//         Category : item.Category,
//         uid: uid
//     }
//     // const newCityRef = doc(collection(db, "cities"));
//     // // console.log("testing spreed "+item.uid)
//     setDoc(collection(db, "carts"), docData);
//     // setDoc(doc(db, "carts", uid), item);
    
//     // const ref = doc(db, "carts", uid).withConverter(itemConverter);
//     // await setDoc(ref, new Item(item.Id, item.Title, item.Description, item.Image, item.Ratings, item.Price, item.Available, item.Category));

//     console.log(ref)
// }

// export const getItems = async (uid) => {
//     console.log("User test ID ===> "+uid);

//     let allLocation = []
//     const q = query(collection(db, "cart"), where("uid", "==", uid));
//     const querySnapshot = await getDocs(q.withConverter(itemConverter));
//     querySnapshot.forEach((doc) => {
//         allLocation.push(doc.data());
//         console.log(doc.id, " => ", doc.data().itemTitle);
//     });
//     console.log("all =====> "+allLocation)
//     return allLocation
// }

// export const updateLocations = async (id, title, lat, lng, address) => {
//     const washingtonRef = doc(db, "locations", id);
//     const updatedDate = new Date().toUTCString();

//     // Set the "capital" field of the city 'DC'
//     await updateDoc(washingtonRef, {
//         title: title,
//         lat:lat,
//         lng:lng,
//         address:address,
//         updatedDate:updatedDate
//     });
// }

// export const deleteLocations = async (id) => {
    
//     await deleteDoc(doc(db, "locations", id));
// }

export const addUser = async ({uid, name, email, phoneNum, address}) => {
    const ref = doc(db, "users", uid).withConverter(userConverter);
    await setDoc(ref, new User(uid, name, email, phoneNum, address));
}

export const getUser = async (uid) => {
    console.log("get user ==> "+uid)
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return doc.data()
    }
}

export const editUser = async (address, phoneNum, uid) => {
    const docRef = doc(db, 'users', uid);

// Update the timestamp field with the value from the server
    await updateDoc(docRef, {
        address : address,
        phoneNum : phoneNum,
        updated: (new Date()).toISOString(),
    });

}

export const deleteCurrentUser = async (uid) => {
console.log("DELETECURRENT USER")
    const user = auth.currentUser;
    console.log(user);
    deleteUser(user).then(() => {
        console.log("object deleted")
        
    }).catch((error) => {
        console.log("ERROR "+error)
    });
    await deleteDoc(doc(db, "users", uid));
}