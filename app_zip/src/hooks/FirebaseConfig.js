// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getReactNativePersistence,initializeAuth} from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore, collection } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDrd79zIPB1lrCBE1DYwDTRLxlR_XMLpus",
//   authDomain: "aiinterview-bc1f1.firebaseapp.com",
//   projectId: "aiinterview-bc1f1",
//   storageBucket: "aiinterview-bc1f1.firebasestorage.app",
//   messagingSenderId: "397580975380",
//   appId: "1:397580975380:web:31250b93a1b71b6255d601",
//   measurementId: "G-HLXMNMKBDT"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
// persistence: getReactNativePersistence(AsyncStorage)
// })
// export const db= getFirestore(app);
// export const Users= collection(db,'user');