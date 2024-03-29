import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyDrtqnMjD_D1CLbA6fL3P9CKac0IE4cKKc",
  authDomain: "andtalk-teste.firebaseapp.com",
  projectId: "handtalk-teste",
  storageBucket: "handtalk-teste.appspot.com",
  messagingSenderId: "51911054461",
  appId: "1:51911054461:web:704e59986db6ec14f44d14",
  measurementId: "G-S5WD5EDVGH",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, firebaseConfig };
