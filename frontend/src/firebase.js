import firebase from "firebase";
import "firebase/storage"
const config = {
    apiKey: "AIzaSyBPCu3DSa-NgIPSRuqF_nxSOcKHUDTp2M0",
    authDomain: "travel-3308b.firebaseapp.com",
    projectId: "travel-3308b",
    storageBucket: "travel-3308b.appspot.com",
    messagingSenderId: "1002839167196",
    appId: "1:1002839167196:web:a74e1e33ade84bf5806419",
    measurementId: "G-NFFGFLZLQ9"
};

firebase.initializeApp(config)

const storage = firebase.storage()
export { storage, firebase as default }