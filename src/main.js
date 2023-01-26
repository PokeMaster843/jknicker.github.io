import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaun34RZJgOriMOU8-BhQV_IPlYGFjID4",
  authDomain: "fir-site-db.firebaseapp.com",
  projectId: "fir-site-db",
  storageBucket: "fir-site-db.appspot.com",
  messagingSenderId: "1089163076302",
  appId: "1:1089163076302:web:962811bbc470e5deafe69f",
  measurementId: "G-NWBYMLLKDG"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fbApp);


const app = createApp(App).use(router);
app.mount('#app');
