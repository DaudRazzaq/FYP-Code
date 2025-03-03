import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrd79zIPB1lrCBE1DYwDTRLxlR_XMLpus",
  authDomain: "aiinterview-bc1f1.firebaseapp.com",
  projectId: "aiinterview-bc1f1",
  storageBucket: "aiinterview-bc1f1.firebasestorage.app",
  messagingSenderId: "397580975380",
  appId: "1:397580975380:web:31250b93a1b71b6255d601",
  measurementId: "G-HLXMNMKBDT"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app, "gs://aiinterview-bc1f1.firebasestorage.app");

export { app, auth, db, storage };